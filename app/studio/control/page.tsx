"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid password");
        return;
      }
      router.push("/studio/control/dashboard");
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-cs-black">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="glass w-full max-w-md rounded-3xl p-8 md:p-10 space-y-6"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cs-violet">Private</p>
          <h1
            className="mt-2 text-2xl font-bold text-cs-silver"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Studio Control
          </h1>
          <p className="mt-2 text-sm text-cs-silver/50">
            Authorized access only. Not linked on the public site.
          </p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="form-input w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-cs-silver"
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-premium w-full rounded-full bg-cs-violet py-3.5 text-sm font-medium text-white hover:glow-violet disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Enter Dashboard"}
        </button>
      </motion.form>
    </div>
  );
}
