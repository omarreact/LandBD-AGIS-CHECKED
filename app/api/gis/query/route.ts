import { NextRequest, NextResponse } from "next/server";
import { getApi } from "../../../../lib/gis/registry";

export const dynamic = "force-dynamic";

const ALLOWED_KEYS = new Set(["where", "outFields", "returnGeometry", "geometry", "geometryType", "inSR", "outSR", "resultRecordCount", "resultOffset", "orderByFields", "f", "token"]);

function error(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  if (!id) return error("API id is required", 400);

  const api = getApi(id);
  if (!api || !api.enabled) return error("API is not configured", 404);
  if (api.visibility !== "private") return error("Use the public source directly or its dedicated adapter", 400);
  if (!api.baseUrl) return error("Private GIS source is not configured", 503);

  let endpoint: URL;
  try {
    endpoint = new URL(api.baseUrl.replace(/\/$/, "") + "/query");
  } catch {
    return error("Invalid GIS endpoint configuration", 500);
  }

  for (const [key, value] of searchParams.entries()) {
    if (key !== "id" && ALLOWED_KEYS.has(key)) endpoint.searchParams.set(key, value);
  }

  endpoint.searchParams.set("f", "json");
  const token = process.env.RAJUK_API_TOKEN;
  if (token) endpoint.searchParams.set("token", token);

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const text = await response.text();
    if (!response.ok) return error(`GIS provider returned HTTP ${response.status}`, 502);

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return error("GIS provider returned invalid JSON", 502);
    }

    return NextResponse.json({ ok: true, source: id, data });
  } catch {
    return error("GIS provider request failed", 502);
  }
}
