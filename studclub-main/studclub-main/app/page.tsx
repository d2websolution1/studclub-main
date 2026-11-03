'use client';

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProfileMarquee } from "@/components/ProfileMarquee";
import { WomenSection } from "@/components/WomenSection";
import { MenSection } from "@/components/MenSection";
import { CategoryProfiles } from "@/components/CategoryProfiles";
import { Services } from "@/components/Services";
import { CityCoverage } from "@/components/CityCoverage";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Journal } from "@/components/Journal";
import { Footer } from "@/components/Footer";
import { ProfileDetailModal } from "@/components/ProfileDetailModal";
import { Profile, ALL_PROFILES } from "@/constants/data";
import { fetchDynamicProfiles } from "@/lib/api";

export default function StuddClubLanding() {
  const [profiles, setProfiles] = useState<Profile[]>(ALL_PROFILES);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Fetch dynamic profiles from backend API on mount
  useEffect(() => {
    fetchDynamicProfiles().then((data) => {
      if (data && data.length > 0) {
        setProfiles(data);
      }
    });
  }, []);

  const handleOpenProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  const femaleProfiles = profiles.filter((p) => p.gender === "female");
  const maleProfiles = profiles.filter((p) => p.gender === "male");

  return (
    <main className="min-h-screen font-body text-(--ink) bg-(--ivory) overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Live Marquee Showcase (Women & Men Scrolling Banner) */}
      <ProfileMarquee onSelectProfile={handleOpenProfile} profiles={profiles} />

      {/* Dedicated Female Showcase Section */}
      <WomenSection onSelectProfile={handleOpenProfile} profiles={femaleProfiles} />

      {/* Dedicated Male Showcase Section */}
      <MenSection onSelectProfile={handleOpenProfile} profiles={maleProfiles} />

      {/* Filterable Complete Directory (Women + Men) */}
      <CategoryProfiles onSelectProfile={handleOpenProfile} profiles={profiles} />

      {/* Specialised Services */}
      <Services />

      {/* Pan-India Cities Coverage */}
      <CityCoverage />

      {/* VIP Membership Pricing */}
      <Pricing />

      {/* Member Testimonials */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Wellness & Lifestyle Journal */}
      <Journal />

      {/* Footer */}
      <Footer />

      {/* Interactive Profile Details Modal */}
      <ProfileDetailModal profile={selectedProfile} onClose={handleCloseModal} />
    </main>
  );
}