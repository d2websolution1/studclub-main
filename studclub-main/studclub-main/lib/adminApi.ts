import { Profile, StatsData } from "../types/admin";

const DEFAULT_BACKEND = "https://api.partyplayboys.com";

export function getBackendUrl(): string {
  if (typeof window !== "undefined") {
    const custom = localStorage.getItem("studdclub_backend_url");
    if (custom) return custom.replace(/\/api\/?$/, "");
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND;
}

export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const custom = localStorage.getItem("studdclub_backend_url");
    if (custom) {
      const clean = custom.replace(/\/+$/, "");
      return clean.endsWith("/api") ? clean : `${clean}/api`;
    }
  }
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND;
  const clean = base.replace(/\/+$/, "");
  return clean.endsWith("/api") ? clean : `${clean}/api`;
}

export const BACKEND_URL = getBackendUrl();
export const API_BASE = getApiBase();

export function resolveImageUrl(photoPath?: string): string {
  if (!photoPath) return "/images/w1.jpg";
  if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
    return photoPath;
  }
  if (photoPath.startsWith("/uploads/")) {
    return `${getBackendUrl()}${photoPath}`;
  }
  return photoPath;
}

export async function getProfiles(filters?: {
  gender?: string;
  city?: string;
  category?: string;
  search?: string;
  verified?: string;
}): Promise<Profile[]> {
  const query = new URLSearchParams();
  if (filters?.gender && filters.gender !== "all") query.append("gender", filters.gender);
  if (filters?.city && filters.city !== "All Cities") query.append("city", filters.city);
  if (filters?.category && !filters.category.startsWith("All")) query.append("category", filters.category);
  if (filters?.search) query.append("search", filters.search);
  if (filters?.verified) query.append("verified", filters.verified);

  const apiBase = getApiBase();
  const url = `${apiBase}/profiles${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch profiles: ${res.statusText}`);
  const data = await res.json();
  return data.data || [];
}

export async function getStats(): Promise<StatsData> {
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch stats: ${res.statusText}`);
  const data = await res.json();
  return data.data;
}

export async function createProfile(formData: FormData): Promise<Profile> {
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/profiles`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create profile");
  }
  const data = await res.json();
  return data.data;
}

export async function updateProfile(id: string, formData: FormData): Promise<Profile> {
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/profiles/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update profile");
  }
  const data = await res.json();
  return data.data;
}

export async function deleteProfile(id: string): Promise<boolean> {
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/profiles/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete profile");
  }
  return true;
}

export async function toggleProfileVerified(id: string): Promise<Profile> {
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/profiles/${id}/toggle-verified`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to toggle verified status");
  }
  const data = await res.json();
  return data.data;
}

