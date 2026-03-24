"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Invalid Credentials");
      }
    } catch {
      setError("System Offline: Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <FadeIn delay={0}>
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#8DFF69]/10 border border-[#8DFF69]/20 mb-6 shadow-[0_0_30px_rgba(141,255,105,0.1)]">
              <ShieldCheck className="w-8 h-8 text-[#8DFF69]" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
              Security Portal
            </h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
              Authorized Personnel Only
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-[#8DFF69]/20 transition-all duration-500"
          >
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 mb-2 block">
                  Encryption Key
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-white/20 group-focus-within:text-[#8DFF69] transition-colors" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-[#8DFF69]/50 focus:bg-[#8DFF69]/5 outline-none transition-all font-mono placeholder:text-white/10"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in text-red-400">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-[11px] font-bold uppercase tracking-wider leading-none">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-white/10 cursor-not-allowed text-white/20"
                    : "bg-[#8DFF69] hover:bg-[#a3ff87] active:scale-[0.98] shadow-[0_10px_30px_rgba(141,255,105,0.2)]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Decrypt &amp; Enter</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest">
            Michael&apos;s Portfolio
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
