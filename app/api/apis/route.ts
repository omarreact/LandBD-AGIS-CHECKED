import { NextResponse } from "next/server";
import { publicApis } from "../../../lib/gis/registry";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: publicApis().map(({ id, name, nameBn, kind, visibility, enabled, description }) => ({
      id,
      name,
      nameBn,
      kind,
      visibility,
      enabled,
      description,
    })),
  });
}
