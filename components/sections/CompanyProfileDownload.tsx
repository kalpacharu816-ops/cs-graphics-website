"use client";

import { motion } from "framer-motion";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { SectionReveal } from "@/components/ui/SectionReveal";

const PDF_PATH = "/content/company-profile.pdf";

export function CompanyProfileDownload() {
  return (
    <SectionReveal delay={0.1}>
      <section className="section-padding py-16 md:py-20 border-t border-white/5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cs-violet mb-4">
            Company Profile
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-cs-silver mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Download our studio overview
          </h2>
          <p className="text-sm text-cs-silver/55 mb-8 max-w-md mx-auto leading-relaxed">
            Services, process, and credentials — a premium PDF for partners and clients.
          </p>
          <motion.a
            href={PDF_PATH}
            download
            data-magnetic
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-premium liquid-glass inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] text-cs-silver hover:glow-violet"
          >
            <HiOutlineDocumentDownload className="h-5 w-5 text-cs-neon" />
            Download PDF
            <span className="btn-premium-shine absolute inset-0 rounded-full pointer-events-none" aria-hidden />
          </motion.a>
        </div>
      </section>
    </SectionReveal>
  );
}
