import { Profile, ALL_PROFILES } from "@/constants/data";

export function getBackendUrl(): string {
  if (typeof window !== "undefined") {
    const custom = localStorage.getItem("studdclub_backend_url");
    if (custom) return custom.replace(/\/api\/?$/, "");
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      return window.location.origin;
    }
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
}

export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const custom = localStorage.getItem("studdclub_backend_url");
    if (custom) {
      const clean = custom.replace(/\/+$/, "");
      return clean.endsWith("/api") ? clean : `${clean}/api`;
    }
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      return `${window.location.origin}/api`;
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
}

export const BACKEND_URL = getBackendUrl();
export const API_URL = getApiBase();

export function resolveImageUrl(photo?: string): string {
  if (!photo) return "/images/w1.jpg";
  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }
  if (photo.startsWith("/uploads/")) {
    return `${getBackendUrl()}${photo}`;
  }
  return photo;
}

export async function fetchDynamicProfiles(): Promise<Profile[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const apiUrl = getApiBase();
    const res = await fetch(`${apiUrl}/profiles`, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("API responded with error, falling back to static profiles");
      return ALL_PROFILES;
    }

    const data = await res.json();
    if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }

    return ALL_PROFILES;
  } catch (error) {
    console.warn("Could not fetch profiles from backend API, using local profiles:", error);
    return ALL_PROFILES;
  }
}
