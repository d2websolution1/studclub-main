import { Profile, ALL_PROFILES } from "@/constants/data";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function resolveImageUrl(photo?: string): string {
  if (!photo) return "/images/w1.jpg";
  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }
  if (photo.startsWith("/uploads/")) {
    return `${BACKEND_URL}${photo}`;
  }
  return photo;
}

export async function fetchDynamicProfiles(): Promise<Profile[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${API_URL}/profiles`, {
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
