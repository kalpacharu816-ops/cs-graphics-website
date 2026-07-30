"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { CONTACT } from "@/lib/constants";
import { getCompanyProfileUrl } from "@/lib/cms/site-settings";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("/content/company-profile.pdf");

  useEffect(() => {
    setPdfUrl(getCompanyProfileUrl());
  }, []);

  return (
    <section className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3">
      <motion.a
        href={pdfUrl}
        download
        data-magnetic
        title="Download company profile"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fab-yellow flex h-14 w-14 items-center justify-center rounded-full will-gpu"
        aria-label="Download company profile PDF"
      >
        <HiOutlineDocumentDownload className="h-6 w-6 text-cs-neon relative z-[1]" />
      </motion.a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="glass-premium mb-1 w-[min(92vw,340px)] rounded-2xl p-6 stroke-purple"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-cs-violet font-medium">
              AI Assistant
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cs-silver/90">
              Our AI design assistant is coming soon. Reach us on WhatsApp or email.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={CONTACT.whatsappUrl}
                className="rounded-xl py-3 text-center text-xs font-medium text-cs-neon stroke-yellow bg-cs-black/40 hover:glow-yellow transition-shadow"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="rounded-xl border border-cs-violet/30 bg-cs-black/40 py-3 text-center text-xs text-cs-silver/85 hover:glow-purple transition-shadow"
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
