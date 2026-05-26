"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton } from "@/components/ui/GlassButton";
import { StarRating } from "@/components/ui/StarRating";
import { createReviewId, saveReview, type ClientReview } from "@/lib/reviews";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [lang, setLang] = useState<"en" | "si">("en");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      setStatus("error");
      return;
    }

    const review: ClientReview = {
      id: createReviewId(),
      name: name.trim(),
      role: role.trim() || "Client",
      quote: quote.trim(),
      rating,
      lang,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveReview(review);
    setStatus("success");
    setName("");
    setRole("");
    setQuote("");
    setRating(5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass premium-card rounded-3xl p-6 md:p-10 max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`btn-premium flex-1 rounded-xl py-2.5 text-xs uppercase tracking-widest transition-colors ${
              lang === "en"
                ? "bg-cs-violet/30 text-cs-silver border border-cs-violet/50"
                : "glass text-cs-silver/50"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang("si")}
            className={`btn-premium flex-1 rounded-xl py-2.5 text-xs uppercase tracking-widest sinhala-text transition-colors ${
              lang === "si"
                ? "bg-cs-violet/30 text-cs-silver border border-cs-violet/50"
                : "glass text-cs-silver/50"
            }`}
          >
            සිංහල
          </button>
        </div>

        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === "si" ? "ඔබේ නම" : "Your name"}
          className="form-input w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-cs-silver outline-none focus:border-cs-violet/50"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder={lang === "si" ? "තනතුර" : "Role (e.g. YouTuber)"}
          className="form-input w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-cs-silver outline-none focus:border-cs-violet/50"
        />
        <textarea
          required
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={4}
          placeholder={
            lang === "si" ? "ඔබේ අදහස..." : "Your review..."
          }
          className="form-input sinhala-text w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-cs-silver outline-none focus:border-cs-violet/50"
          lang={lang === "si" ? "si" : "en"}
        />

        <div className="space-y-2">
          <span className="text-xs text-cs-silver/50 uppercase tracking-widest block">
            Rating · 1–5 stars
          </span>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <GlassButton type="submit" variant="primary" className="w-full">
          Submit Review
        </GlassButton>

        <AnimatePresence>
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-cs-neon sinhala-text"
            >
              Thank you! Pending approval. ස්තූතියි!
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-red-400"
            >
              Please fill in required fields.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
