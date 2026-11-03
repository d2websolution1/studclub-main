'use client';

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  UserCheck,
  Crown,
  Heart,
  MapPin,
  Search,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Star,
  ExternalLink,
  LayoutGrid,
  List,
  Sparkles,
  CheckCircle2,
  XCircle,
  Radio
} from "lucide-react";
import { Profile, StatsData, CITIES, CATEGORIES_FEMALE, CATEGORIES_MALE } from "../types";
import {
  getProfiles,
  getStats,
  createProfile,
  updateProfile,
  deleteProfile,
  toggleProfileVerified,
  resolveImageUrl
} from "../lib/api";
import { ProfileModal } from "../components/ProfileModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"all" | "female" | "male">("all");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedVerified, setSelectedVerified] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState<Profile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [profilesData, statsData] = await Promise.all([
        getProfiles(),
        getStats()
      ]);
      setProfiles(profilesData);
      setStats(statsData);
      setIsBackendOnline(true);
    } catch (error) {
      console.error("Error loading admin data:", error);
      setIsBackendOnline(false);
      showToast("Backend API unavailable. Check if server is running on port 5000", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      // Periodic refresh of stats
      getStats()
        .then((s) => {
          setStats(s);
          setIsBackendOnline(true);
        })
        .catch(() => setIsBackendOnline(false));
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  // Filtered Profiles
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Gender filter
      if (selectedGender !== "all" && p.gender !== selectedGender) return false;

      // City filter
      if (selectedCity !== "All Cities" && p.city?.toLowerCase() !== selectedCity.toLowerCase())
        return false;

      // Category filter
      if (selectedCategory !== "All Categories" && p.category !== selectedCategory)
        return false;

      // Verified filter
      if (selectedVerified === "verified" && !p.verified) return false;
      if (selectedVerified === "unverified" && p.verified) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesLocality = p.locality?.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesProfession = p.profession?.toLowerCase().includes(query);
        const matchesBio = p.bio?.toLowerCase().includes(query);
        if (!matchesName && !matchesLocality && !matchesCategory && !matchesProfession && !matchesBio) {
          return false;
        }
      }

      return true;
    });
  }, [profiles, selectedGender, selectedCity, selectedCategory, selectedVerified, searchQuery]);

  // Handle Add Profile
  const handleOpenAdd = () => {
    setEditingProfile(null);
    setIsProfileModalOpen(true);
  };

  // Handle Edit Profile
  const handleOpenEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setIsProfileModalOpen(true);
  };

  // Handle Save Profile (Add or Edit)
  const handleSaveProfile = async (formData: FormData) => {
    try {
      if (editingProfile) {
        const updated = await updateProfile(editingProfile.id, formData);
        setProfiles((prev) => prev.map((p) => (p.id === editingProfile.id ? updated : p)));
        showToast(`Profile "${updated.name}" updated successfully!`);
      } else {
        const created = await createProfile(formData);
        setProfiles((prev) => [created, ...prev]);
        showToast(`Profile "${created.name}" created and uploaded!`);
      }
      // Refresh stats
      getStats().then(setStats).catch(() => {});
    } catch (err: any) {
      showToast(err.message || "Failed to save profile", "error");
      throw err;
    }
  };

  // Handle Delete Profile
  const handleOpenDelete = (profile: Profile) => {
    setDeletingProfile(profile);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProfile) return;
    setIsDeleting(true);
    try {
      await deleteProfile(deletingProfile.id);
      setProfiles((prev) => prev.filter((p) => p.id !== deletingProfile.id));
      showToast(`Profile "${deletingProfile.name}" deleted successfully.`);
      setIsDeleteModalOpen(false);
      setDeletingProfile(null);
      // Refresh stats
      getStats().then(setStats).catch(() => {});
    } catch (err: any) {
      showToast(err.message || "Failed to delete profile", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Quick Toggle Verified
  const handleToggleVerified = async (profile: Profile) => {
    try {
      const updated = await toggleProfileVerified(profile.id);
      setProfiles((prev) => prev.map((p) => (p.id === profile.id ? updated : p)));
      showToast(
        `Profile "${profile.name}" is now ${updated.verified ? "VERIFIED" : "UNVERIFIED"}`
      );
      getStats().then(setStats).catch(() => {});
    } catch (err: any) {
      showToast(err.message || "Failed to toggle verified status", "error");
    }
  };

  // Combined categories for filter dropdown
  const allCategories = useMemo(() => {
    if (selectedGender === "female") return ["All Categories", ...CATEGORIES_FEMALE];
    if (selectedGender === "male") return ["All Categories", ...CATEGORIES_MALE];
    return ["All Categories", ...CATEGORIES_FEMALE, ...CATEGORIES_MALE];
  }, [selectedGender]);

  return (
    <div className="min-h-screen bg-[#0F0D0C] text-[#F8F5F0] flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-semibold transition-all duration-300 ${
            toast.type === "success"
              ? "bg-[#181311] border-[#E8C88A] text-[#E8C88A]"
              : "bg-[#251010] border-[#8A2E2E] text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-[#B8783D]/25 bg-[#181311] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8A2E2E] border border-[#B8783D] flex items-center justify-center font-bold text-[#E8C88A] text-lg shadow-md shadow-[#8A2E2E]/40">
              SC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                  STUDDCLUB <span className="text-[#E8C88A]">ADMIN</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#E8C88A]/15 text-[#E8C88A] border border-[#E8C88A]/30 px-2 py-0.5 rounded">
                  VIP Controller
                </span>
              </div>
              <p className="text-xs text-white/50">Dynamic Profile Manager &amp; Storage</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live API Health indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#211B18] border border-white/10 text-xs">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isBackendOnline ? "bg-emerald-400 animate-pulse" : "bg-red-500"
                }`}
              />
              <span className="text-white/70">
                {isBackendOnline ? "Backend Live (Port 5000)" : "Backend Offline"}
              </span>
            </div>

            {/* Visit Frontend Link */}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-[#B8783D]/40 text-[#E8C88A] hover:bg-[#B8783D]/15 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={14} /> View Client Site
            </a>

            {/* Refresh Button */}
            <button
              onClick={loadData}
              disabled={isLoading}
              title="Refresh profiles"
              className="p-2 rounded-lg border border-white/10 bg-[#211B18] hover:bg-white/10 text-white/70 transition-colors"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>

            {/* Add New Profile CTA */}
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8A2E2E] to-[#B8783D] hover:brightness-110 text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-[#8A2E2E]/30 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Add New Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-[#181311] border border-white/10 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-white/50 text-xs">
              <span>Total Profiles</span>
              <Users size={16} className="text-[#E8C88A]" />
            </div>
            <div className="text-2xl font-black text-white">{stats?.total ?? profiles.length}</div>
            <p className="text-[11px] text-[#E8C88A]/80">Active in Database</p>
          </div>

          <div className="p-4 rounded-xl bg-[#181311] border border-[#8A2E2E]/40 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-white/50 text-xs">
              <span>Females</span>
              <Heart size={16} className="text-[#B8483F]" />
            </div>
            <div className="text-2xl font-black text-[#F2DDA8]">
              {stats?.femaleCount ?? profiles.filter((p) => p.gender === "female").length}
            </div>
            <p className="text-[11px] text-white/40">Models &amp; Companions</p>
          </div>

          <div className="p-4 rounded-xl bg-[#181311] border border-[#2A4B7C]/40 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-white/50 text-xs">
              <span>Male Studds</span>
              <Crown size={16} className="text-[#3B66A8]" />
            </div>
            <div className="text-2xl font-black text-[#93C5FD]">
              {stats?.maleCount ?? profiles.filter((p) => p.gender === "male").length}
            </div>
            <p className="text-[11px] text-white/40">Corporate &amp; Gentlemen</p>
          </div>

          <div className="p-4 rounded-xl bg-[#181311] border border-[#E8C88A]/40 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-white/50 text-xs">
              <span>Verified Ratio</span>
              <ShieldCheck size={16} className="text-[#E8C88A]" />
            </div>
            <div className="text-2xl font-black text-white">
              {stats?.verifiedCount ?? profiles.filter((p) => p.verified).length}
            </div>
            <p className="text-[11px] text-emerald-400">100% ID Checked</p>
          </div>

          <div className="p-4 rounded-xl bg-[#181311] border border-white/10 shadow-lg space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-white/50 text-xs">
              <span>Covered Metros</span>
              <MapPin size={16} className="text-[#B8783D]" />
            </div>
            <div className="text-2xl font-black text-white">{stats?.citiesCount ?? 10}</div>
            <p className="text-[11px] text-white/40">Pan-India Cities</p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="bg-[#181311] border border-[#B8783D]/30 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search by name, locality, profession, bio or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#211B18] border border-white/10 rounded-lg text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E8C88A]"
              />
            </div>

            {/* Gender Toggle Pills */}
            <div className="flex items-center bg-[#211B18] p-1 rounded-lg border border-white/10 shrink-0">
              <button
                onClick={() => setSelectedGender("all")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedGender === "all"
                    ? "bg-[#B8783D] text-[#191412]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                All ({profiles.length})
              </button>
              <button
                onClick={() => setSelectedGender("female")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedGender === "female"
                    ? "bg-[#8A2E2E] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Heart size={12} /> Women (
                {profiles.filter((p) => p.gender === "female").length})
              </button>
              <button
                onClick={() => setSelectedGender("male")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedGender === "male"
                    ? "bg-[#2A4B7C] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Crown size={12} /> Men (
                {profiles.filter((p) => p.gender === "male").length})
              </button>
            </div>

            {/* Grid / Table View Switcher */}
            <div className="flex items-center bg-[#211B18] p-1 rounded-lg border border-white/10 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white/20 text-[#E8C88A]" : "text-white/50 hover:text-white"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "table" ? "bg-white/20 text-[#E8C88A]" : "text-white/50 hover:text-white"
                }`}
                title="Table view"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
            <div>
              <label className="block text-[11px] text-white/50 mb-1">Filter by City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#E8C88A]"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#211B18]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-white/50 mb-1">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#E8C88A]"
              >
                {allCategories.map((c) => (
                  <option key={c} value={c} className="bg-[#211B18]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-white/50 mb-1">Filter by Verification</label>
              <select
                value={selectedVerified}
                onChange={(e) => setSelectedVerified(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#E8C88A]"
              >
                <option value="all" className="bg-[#211B18]">All Verification Status</option>
                <option value="verified" className="bg-[#211B18]">Verified Only</option>
                <option value="unverified" className="bg-[#211B18]">Unverified Only</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <div>
            Showing <span className="font-bold text-white">{filteredProfiles.length}</span> of{" "}
            <span className="font-bold text-[#E8C88A]">{profiles.length}</span> profiles
          </div>
          {(searchQuery ||
            selectedGender !== "all" ||
            selectedCity !== "All Cities" ||
            selectedCategory !== "All Categories" ||
            selectedVerified !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGender("all");
                setSelectedCity("All Cities");
                setSelectedCategory("All Categories");
                setSelectedVerified("all");
              }}
              className="text-[#E8C88A] hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Profiles Display */}
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <RefreshCw size={36} className="animate-spin mx-auto text-[#E8C88A]" />
            <p className="text-sm text-white/60">Loading VIP profiles from backend...</p>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="py-20 text-center bg-[#181311] border border-white/10 rounded-2xl space-y-4">
            <Users size={48} className="mx-auto text-white/30" />
            <h3 className="text-lg font-bold text-white">No Profiles Found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              No profiles matched your current search filters. You can clear filters or add a new profile.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#B8783D] text-[#191412] font-bold text-xs rounded-lg hover:brightness-110"
            >
              + Add First Profile
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((p) => {
              const photoSrc = resolveImageUrl(p.photo);
              return (
                <div
                  key={p.id}
                  className="bg-[#181311] border border-white/10 hover:border-[#B8783D]/60 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group duration-300"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-72 w-full bg-black overflow-hidden">
                      <img
                        src={photoSrc}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            p.gender === "female" ? "/images/w1.jpg" : "/images/m1.jpg";
                        }}
                      />
                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181311] via-transparent to-transparent opacity-90" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-md ${
                            p.gender === "female"
                              ? "bg-[#8A2E2E] text-white"
                              : "bg-[#2A4B7C] text-white"
                          }`}
                        >
                          {p.gender === "female" ? "Female" : "Male Studd"}
                        </span>
                        <button
                          onClick={() => handleToggleVerified(p)}
                          title="Click to toggle verified status"
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1 shadow-md transition-transform active:scale-95 ${
                            p.verified
                              ? "bg-[#E8C88A] text-[#191412]"
                              : "bg-white/20 text-white/60 hover:text-white"
                          }`}
                        >
                          <ShieldCheck size={12} /> {p.verified ? "Verified" : "Unverified"}
                        </button>
                      </div>

                      {/* Category Badge at bottom of photo */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[11px] font-medium bg-black/70 backdrop-blur-sm text-[#E8C88A] px-2.5 py-1 rounded border border-[#E8C88A]/30 truncate max-w-[70%]">
                          {p.category}
                        </span>
                        {p.consultationRate && (
                          <span className="text-[11px] font-bold text-white bg-[#8A2E2E]/80 backdrop-blur-sm px-2 py-0.5 rounded">
                            {p.consultationRate.split("/")[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-base group-hover:text-[#E8C88A] transition-colors truncate">
                            {p.name}, {p.age}
                          </h3>
                          <span className="flex items-center gap-1 text-[11px] font-bold text-[#E8C88A]">
                            <Star size={12} className="fill-[#E8C88A]" /> {p.rating || 4.9}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 flex items-center gap-1 mt-1 truncate">
                          <MapPin size={12} className="text-[#B8783D] shrink-0" /> {p.locality}, {p.city}
                        </p>
                      </div>

                      {p.tagline && (
                        <p className="text-xs text-white/70 line-clamp-2 italic leading-relaxed">
                          "{p.tagline}"
                        </p>
                      )}

                      {/* Services Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(p.services || []).slice(0, 2).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#211B18] text-white/70 border border-white/10 px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                        {(p.services || []).length > 2 && (
                          <span className="text-[10px] text-[#E8C88A] px-1 py-0.5">
                            +{(p.services || []).length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-3 bg-[#211B18] border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-white/40 font-mono">ID: {p.id}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Edit size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleOpenDelete(p)}
                        className="p-1.5 rounded-lg bg-[#8A2E2E]/30 hover:bg-[#8A2E2E] text-[#B8483F] hover:text-white transition-colors"
                        title="Delete profile"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-[#181311] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#211B18] text-white/60 border-b border-white/10 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Profile</th>
                    <th className="py-3.5 px-4">Gender</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">City / Locality</th>
                    <th className="py-3.5 px-4">Rate</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filteredProfiles.map((p) => {
                    const photoSrc = resolveImageUrl(p.photo);
                    return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={photoSrc}
                              alt={p.name}
                              className="w-10 h-12 object-cover rounded-md border border-white/10 shrink-0 bg-black"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  p.gender === "female" ? "/images/w1.jpg" : "/images/m1.jpg";
                              }}
                            />
                            <div>
                              <div className="font-bold text-white text-sm">{p.name}</div>
                              <div className="text-[11px] text-white/40">
                                Age: {p.age} • ID: {p.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              p.gender === "female"
                                ? "bg-[#8A2E2E]/30 text-[#B8483F] border border-[#8A2E2E]/50"
                                : "bg-[#2A4B7C]/30 text-[#93C5FD] border border-[#2A4B7C]/50"
                            }`}
                          >
                            {p.gender}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white/70">{p.category}</td>
                        <td className="py-3 px-4">
                          <div className="text-white font-medium">{p.city}</div>
                          <div className="text-[11px] text-white/40">{p.locality}</div>
                        </td>
                        <td className="py-3 px-4 text-[#E8C88A] font-semibold">
                          {p.consultationRate || "₹25,000 / Session"}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleVerified(p)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 ${
                              p.verified
                                ? "bg-[#E8C88A] text-[#191412]"
                                : "bg-white/10 text-white/50 hover:text-white"
                            }`}
                          >
                            <ShieldCheck size={12} /> {p.verified ? "Verified" : "Unverified"}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                              title="Edit profile"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(p)}
                              className="p-1.5 rounded-lg bg-[#8A2E2E]/30 hover:bg-[#8A2E2E] text-[#B8483F] hover:text-white transition-colors"
                              title="Delete profile"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleSaveProfile}
        initialData={editingProfile}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        profile={deletingProfile}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProfile(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
