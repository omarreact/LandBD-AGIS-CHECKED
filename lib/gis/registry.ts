export type ApiVisibility = "public" | "private";
export type ApiKind = "arcgis" | "rest" | "json";

export type ApiRegistryEntry = {
  id: string;
  name: string;
  nameBn: string;
  kind: ApiKind;
  visibility: ApiVisibility;
  baseUrl: string;
  enabled: boolean;
  description: string;
};

/**
 * Safe registry metadata only. Secrets/tokens must never be committed here.
 * Private endpoints are enabled through environment configuration on the server.
 */
export const API_REGISTRY: ApiRegistryEntry[] = [
  {
    id: "rajuk-rs",
    name: "RAJUK RS",
    nameBn: "RAJUK RS সার্ভে",
    kind: "arcgis",
    visibility: "private",
    baseUrl: process.env.RAJUK_RS_URL ?? "",
    enabled: Boolean(process.env.RAJUK_RS_URL),
    description: "RAJUK RS parcel/layer source configured server-side.",
  },
  {
    id: "rajuk-ms",
    name: "RAJUK MS",
    nameBn: "RAJUK MS সার্ভে",
    kind: "arcgis",
    visibility: "private",
    baseUrl: process.env.RAJUK_MS_URL ?? "",
    enabled: Boolean(process.env.RAJUK_MS_URL),
    description: "RAJUK MS parcel/layer source configured server-side.",
  },
  {
    id: "open-meteo-elevation",
    name: "Open-Meteo Elevation",
    nameBn: "উচ্চতা তথ্য",
    kind: "json",
    visibility: "public",
    baseUrl: "https://api.open-meteo.com/v1/forecast",
    enabled: true,
    description: "Public elevation/weather data source.",
  },
];

export function getApi(id: string) {
  return API_REGISTRY.find((entry) => entry.id === id);
}

export function publicApis() {
  return API_REGISTRY.filter((entry) => entry.visibility === "public");
}

export function privateApis() {
  return API_REGISTRY.filter((entry) => entry.visibility === "private");
}
