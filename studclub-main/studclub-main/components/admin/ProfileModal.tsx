'use client';

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  ShieldCheck,
  User,
} from "lucide-react";
import { Profile, CITIES, CATEGORIES_FEMALE, CATEGORIES_MALE, POPULAR_SERVICES, MEMBERSHIP_TIERS } from "@/types/admin";
import { resolveImageUrl } from "@/lib/adminApi";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: Profile | null;
}

export function ProfileModal({ isOpen, onClose, onSubmit, initialData }: ProfileModalProps) {
  const isEditing = Boolean(initialData);

  const [gender, setGender] = useState<"female" | "male">("female");
  const [name, setName] = useState("");
  const [age, setAge] = useState("24");
  const [category, setCategory] = useState(CATEGORIES_FEMALE[0]);
  const [city, setCity] = useState("Mumbai");
  const [locality, setLocality] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const [height, setHeight] = useState("5'7\"");
  const [badge, setBadge] = useState("VIP Exclusive");
  const [membershipTier, setMembershipTier] = useState("Gold STUDD VIP");
  const [consultationRate, setConsultationRate] = useState("₹25,000 / Session");
  const [languages, setLanguages] = useState("English, Hindi");
  const [services, setServices] = useState<string[]>([
    "Aromatherapy Massage",
    "Complete Companion",
  ]);
  const [verified, setVerified] = useState(true);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setGender(initialData.gender || "female");
      setName(initialData.name || "");
      setAge(String(initialData.age || 24));
      setCategory(initialData.category || (initialData.gender === "male" ? CATEGORIES_MALE[0] : CATEGORIES_FEMALE[0]));
      setCity(initialData.city || "Mumbai");
      setLocality(initialData.locality || "");
      setPhotoUrl(initialData.photo || "");
      setPreviewUrl(resolveImageUrl(initialData.photo || ""));
      setTagline(initialData.tagline || "");
      setBio(initialData.bio || "");
      setProfession(initialData.profession || "");
      setHeight(initialData.height || "5'7\"");
      setBadge(initialData.badge || "VIP Exclusive");
      setMembershipTier(initialData.membershipTierRequired || "Gold STUDD VIP");
      setConsultationRate(initialData.consultationRate || "₹25,000 / Session");
      setLanguages((initialData.languages || ["English", "Hindi"]).join(", "));
      setServices(initialData.services || ["Aromatherapy Massage"]);
      setVerified(initialData.verified ?? true);
      setSelectedFile(null);
    } else {
      // Reset for new creation
      setGender("female");
      setName("");
      setAge("24");
      setCategory(CATEGORIES_FEMALE[0]);
      setCity("Mumbai");
      setLocality("");
      setPhotoUrl("");
      setPreviewUrl("");
      setTagline("");
      setBio("");
      setProfession("");
      setHeight("5'7\"");
      setBadge("VIP Exclusive");
      setMembershipTier("Gold STUDD VIP");
      setConsultationRate("₹25,000 / Session");
      setLanguages("English, Hindi");
      setServices(["Aromatherapy Massage", "Complete Companion"]);
      setVerified(true);
      setSelectedFile(null);
    }
    setErrorMsg("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleGenderChange = (newGender: "female" | "male") => {
    setGender(newGender);
    if (newGender === "female") {
      setCategory(CATEGORIES_FEMALE[0]);
      if (badge === "Top Rated Studd") setBadge("VIP Exclusive");
    } else {
      setCategory(CATEGORIES_MALE[0]);
      if (badge === "VIP Exclusive") setBadge("Top Rated Studd");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter the profile name.");
      return;
    }
    if (!locality.trim()) {
      setErrorMsg("Please enter the locality/area.");
      return;
    }
    if (!previewUrl && !photoUrl && !selectedFile) {
      setErrorMsg("Please upload a photo or provide an image URL.");
      return;
    }

    try {
      setIsSubmitting(true);
      const fd = new FormData();
      fd.append("name", name.trim());
      fd.append("gender", gender);
      fd.append("age", age);
      fd.append("category", category);
      fd.append("city", city);
      fd.append("locality", locality.trim());
      fd.append("tagline", tagline.trim());
      fd.append("bio", bio.trim());
      fd.append("profession", profession.trim() || (gender === "female" ? "Fashion Model" : "Fitness Model"));
      fd.append("height", height.trim());
      fd.append("badge", badge.trim());
      fd.append("membershipTierRequired", membershipTier);
      fd.append("consultationRate", consultationRate.trim());
      fd.append("verified", String(verified));

      // Services & Languages
      const langArray = languages.split(",").map((l) => l.trim()).filter(Boolean);
      fd.append("languages", JSON.stringify(langArray));
      fd.append("services", JSON.stringify(services));

      // Photo handling
      if (selectedFile) {
        fd.append("photoFile", selectedFile);
      } else if (photoUrl) {
        fd.append("photo", photoUrl);
      } else if (initialData?.photo) {
        fd.append("photo", initialData.photo);
      }

      await onSubmit(fd);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save profile. Please check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCategories = gender === "female" ? CATEGORIES_FEMALE : CATEGORIES_MALE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#181311] border border-[#B8783D]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B8783D]/25 bg-[#211B18]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8A2E2E]/20 border border-[#8A2E2E]/40 flex items-center justify-center text-[#E8C88A]">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {isEditing ? "Edit VIP Profile" : "Add New VIP Profile"}
              </h2>
              <p className="text-xs text-[#E8C88A]/70">
                {isEditing ? `Updating profile: ${initialData?.name} (ID: ${initialData?.id})` : "Create and upload verified Indian companion profile"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {errorMsg && (
            <div className="p-3 bg-[#8A2E2E]/30 border border-[#8A2E2E] rounded-lg text-white text-xs">
              {errorMsg}
            </div>
          )}

          {/* Gender Selector Tabs */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#E8C88A] font-semibold mb-2">
              Select Gender Profile
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleGenderChange("female")}
                className={`py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 border transition-all ${
                  gender === "female"
                    ? "bg-[#8A2E2E] border-[#B8483F] text-white shadow-lg shadow-[#8A2E2E]/30"
                    : "bg-[#211B18] border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <User size={16} /> Female Companion
              </button>
              <button
                type="button"
                onClick={() => handleGenderChange("male")}
                className={`py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 border transition-all ${
                  gender === "male"
                    ? "bg-[#2A4B7C] border-[#3B66A8] text-white shadow-lg shadow-[#2A4B7C]/30"
                    : "bg-[#211B18] border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <User size={16} /> Male Studd
              </button>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="bg-[#211B18] p-4 rounded-xl border border-white/10 space-y-4">
            <label className="block text-xs uppercase tracking-wider text-[#E8C88A] font-semibold">
              Profile Photo Upload & Preview
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Photo Preview Box */}
              <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-lg overflow-hidden bg-black/60 border-2 border-dashed border-[#B8783D]/50 flex items-center justify-center shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl("/images/w1.jpg")}
                  />
                ) : (
                  <div className="text-center p-2 text-white/40">
                    <ImageIcon size={32} className="mx-auto mb-1" />
                    <span className="text-[10px]">No Photo Selected</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-[#B8783D]/20 hover:bg-[#B8783D]/30 border border-[#B8783D] text-[#E8C88A] rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                >
                  <Upload size={16} /> Upload Image File (JPG, PNG, WebP)
                </button>
                <div className="relative flex items-center py-1">
                  <div className="grow border-t border-white/10"></div>
                  <span className="shrink mx-3 text-[10px] uppercase text-white/40">OR Enter Image URL</span>
                  <div className="grow border-t border-white/10"></div>
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg or /images/w1.jpg"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    if (e.target.value) setPreviewUrl(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#E8C88A]"
                />
              </div>
            </div>
          </div>

          {/* Basic Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-white/70 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kiara Advani / Devraj Kapoor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Age *</label>
              <input
                type="number"
                min="18"
                max="60"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
          </div>

          {/* Category & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c} className="bg-[#211B18]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">City *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              >
                {CITIES.filter((c) => c !== "All Cities").map((c) => (
                  <option key={c} value={c} className="bg-[#211B18]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Locality & Profession */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1">Locality / Area *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bandra West, Vasant Vihar, Koramangala"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Profession</label>
              <input
                type="text"
                placeholder="e.g. Fashion Model, Corporate Executive"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
          </div>

          {/* Rate & Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1">Consultation Rate</label>
              <input
                type="text"
                placeholder="₹25,000 / Session"
                value={consultationRate}
                onChange={(e) => setConsultationRate(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Membership Tier</label>
              <select
                value={membershipTier}
                onChange={(e) => setMembershipTier(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              >
                {MEMBERSHIP_TIERS.map((tier) => (
                  <option key={tier} value={tier} className="bg-[#211B18]">
                    {tier}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">VIP Badge</label>
              <input
                type="text"
                placeholder="VIP Exclusive / Top Rated"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
          </div>

          {/* Tagline & Bio */}
          <div>
            <label className="block text-xs text-white/70 mb-1">Tagline</label>
            <input
              type="text"
              placeholder="e.g. Fashion model & luxury lifestyle companion for discerning gentlemen."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">Bio / Profile Description</label>
            <textarea
              rows={3}
              placeholder="Detailed introduction, poise, personality and companionship background..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
            />
          </div>

          {/* Services Checklist */}
          <div>
            <label className="block text-xs text-white/70 mb-2">Select Services Offered</label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SERVICES.map((serv) => {
                const selected = services.includes(serv);
                return (
                  <button
                    key={serv}
                    type="button"
                    onClick={() => toggleService(serv)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      selected
                        ? "bg-[#E8C88A] text-[#191412] border-[#E8C88A] font-semibold"
                        : "bg-[#211B18] text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {selected && <Check size={12} />} {serv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Height, Languages & Verified */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs text-white/70 mb-1">Height</label>
              <input
                type="text"
                placeholder="5 ft 7 in or 6 ft 1 in"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Languages (comma separated)</label>
              <input
                type="text"
                placeholder="English, Hindi, Marathi"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full px-3 py-2 bg-[#211B18] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E8C88A]"
              />
            </div>
            <div className="pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  className="w-4 h-4 rounded text-[#E8C88A] focus:ring-0 bg-[#211B18] border-white/20"
                />
                <span className="text-xs font-semibold text-white flex items-center gap-1">
                  <ShieldCheck size={16} className="text-[#E8C88A]" /> 100% Verified Profile
                </span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#B8783D] to-[#E8C88A] text-[#191412] font-bold hover:brightness-110 shadow-lg shadow-[#B8783D]/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Saving Profile...</>
              ) : isEditing ? (
                <>Save Changes</>
              ) : (
                <>Create & Publish Profile</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

