export interface Profile {
  id: string;
  name: string;
  gender: "female" | "male";
  age: number;
  category: string;
  city: string;
  locality: string;
  services: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  photo: string;
  tagline: string;
  bio: string;
  languages: string[];
  profession: string;
  height: string;
  badge?: string;
  membershipTierRequired?: string;
  consultationRate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatsData {
  total: number;
  femaleCount: number;
  maleCount: number;
  verifiedCount: number;
  citiesCount: number;
  cityDistribution: Record<string, number>;
}

export const CITIES = [
  "All Cities",
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Goa",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh"
];

export const CATEGORIES_FEMALE = [
  "High Profile Females",
  "Housewives",
  "Widows & Independent",
  "Single Parent Women",
  "Working Women",
  "Single Working Girls"
];

export const CATEGORIES_MALE = [
  "Elite Gentlemen",
  "Corporate Studds",
  "Fitness Models",
  "High Profile Males",
  "Single Working Guys",
  "Luxury Escorts"
];

export const POPULAR_SERVICES = [
  "Aromatherapy Massage",
  "Complete Companion",
  "Outstation Travel",
  "Relaxation Spa",
  "Doorstep In-Suite",
  "Private Companionship",
  "Executive Gala Escort",
  "VIP Suite Companion",
  "Resort Vacations",
  "Sunset Cruise Partner"
];

export const MEMBERSHIP_TIERS = [
  "Silver Pass",
  "Gold STUDD VIP",
  "Platinum Elite"
];
