"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/constants";

export function ChatbotPlaceholder() {
  const [open, setOpen] = useState(false);

  return (
    <section className="fixed bottom-6 right-6 z-[70]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="ai-assistant-panel mb-4 w-[min(92vw,360px)] rounded-2xl p-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-cs-violet font-medium">
              AI Assistant
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cs-silver/90">
              Our AI design assistant is coming soon. For now, reach us instantly on
              WhatsApp or email.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={CONTACT.whatsappUrl}
                className="liquid-glass rounded-xl py-3 text-center text-xs font-medium text-cs-neon hover:glow-neon transition-shadow"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="rounded-xl border border-white/15 bg-white/5 py-3 text-center text-xs text-cs-silver/85 hover:border-cs-violet/40 transition-colors"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        data-magnetic
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="ai-assistant-btn flex h-14 w-14 items-center justify-center rounded-full text-xl text-cs-silver will-gpu"
        aria-label="Open AI assistance"
        aria-expanded={open}
      >
        <span className="relative z-[1]">{open ? "✕" : "✦"}</span>
      </motion.button>
    </section>
  );
}
