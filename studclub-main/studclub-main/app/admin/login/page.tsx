'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to /admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("studdclub_admin_session") === "authenticated";
      if (isAuth) {
        router.push("/admin");
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const validUser = (username.trim().toLowerCase() === "admin" || username.trim().toLowerCase() === "admin@studclub.com");
    const validPass = password === "admin123" || password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123");

    setTimeout(() => {
      if (validUser && validPass) {
        localStorage.setItem("studdclub_admin_session", "authenticated");
        localStorage.setItem("studdclub_admin_user", username.trim());
        router.push("/admin");
      } else {
        setError("Invalid username or password. Please try again.");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0F0D0C] text-[#F8F5F0] flex flex-col justify-center items-center px-4 relative overflow-hidden font-body">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8A2E2E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#B8783D]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-[#181311] border border-[#B8783D]/30 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        {/* Header with Logo */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8A2E2E] to-[#B8783D] border border-[#E8C88A]/40 text-[#E8C88A] font-extrabold text-2xl shadow-xl shadow-[#8A2E2E]/40 mb-2">
            SC
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-display">
              STUDDCLUB <span className="text-[#E8C88A]">ADMIN</span>
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#E8C88A]/15 text-[#E8C88A] border border-[#E8C88A]/30 px-2 py-0.5 rounded">
              VIP
            </span>
          </div>
          <p className="text-xs text-white/50">
            Sign in to access VIP Profile Controller & Management
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-[#8A2E2E]/20 border border-[#8A2E2E] text-white text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#E8C88A] font-semibold mb-2">
              Username or Email
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 bg-[#211B18] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#E8C88A] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider text-[#E8C88A] font-semibold">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#211B18] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#E8C88A] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Credentials Info Helper */}
          <div className="p-3 bg-[#211B18]/70 border border-white/5 rounded-xl text-[11px] text-white/50 space-y-1">
            <div className="flex items-center gap-1.5 text-[#E8C88A] font-semibold">
              <Sparkles size={12} /> Default Access Details:
            </div>
            <p>Username: <code className="text-white bg-black/40 px-1 py-0.5 rounded">admin</code> | Password: <code className="text-white bg-black/40 px-1 py-0.5 rounded">admin123</code></p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8A2E2E] via-[#B8783D] to-[#E8C88A] hover:brightness-110 text-[#191412] font-bold text-sm tracking-wide uppercase shadow-lg shadow-[#8A2E2E]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 pt-5 border-t border-white/10">
          <a
            href="/"
            className="text-xs text-white/50 hover:text-[#E8C88A] transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
