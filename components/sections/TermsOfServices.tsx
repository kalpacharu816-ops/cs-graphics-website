"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft, HiCheck } from "react-icons/hi";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TERMS = [
  {
    id: 1,
    text: "Payment for your order must be made within 24 hours of placing the order. We will acknowledge your order by sending the order via WhatsApp and payment must be made within 24 hours of placing the order.",
  },
  {
    id: 2,
    text: "A fee of Rs. 500 will be charged for each revision made after payment. If the entire design is being redesigned, half of the applicable total amount will also be charged additionally.",
  },
  {
    id: 3,
    text: "Placing orders as early as possible before the date you need the design completed will allow us to complete the order within the specified time frame considering the current busy schedule.",
  },
  {
    id: 4,
    text: "When purchasing monthly, weekly or combination packages, the applicable full fee must be paid first. No refunds will be given for such purchases.",
  },
  {
    id: 5,
    text: "All designs must be made within the validity period of the monthly, weekly or combination package and no refunds or additional designs can be requested after the expiry date.",
  },
  {
    id: 6,
    text: "All terms and conditions for monthly, weekly or combo packages also apply to our special discounts.",
  },
  {
    id: 7,
    text: "We take responsibility for all accepted orders and created designs may be published on our social media platforms. If you do not wish this, please inform us while creating the relevant design.",
  },
  {
    id: 8,
    text: "An advance payment of Rs. 500 will be charged for orders requiring high priority.",
  },
  {
    id: 9,
    text: "If project files are requested, half of the total design fee will also be charged.",
  },
  {
    id: 10,
    text: "Project files are safely stored for 30 days only. After 30 days they will be permanently deleted.",
  },
];

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const termVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function TermsOfServices() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen bg-cs-black">
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cs-violet/20 via-cs-purple/60 to-cs-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-cs-black/20 via-cs-black/50 to-cs-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(110,0,255,0.3),transparent_55%)]" />
        <div className="section-padding relative z-10 w-full pb-16 pt-36 md:pb-20 md:pt-44">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cs-silver/50 hover:text-cs-neon transition-colors"
          >
            <HiArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-4 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-cs-neon"
          >
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-cs-silver md:text-6xl lg:text-7xl drop-shadow-[0_0_20px_rgba(217,217,217,0.12)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Terms of Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-5 max-w-2xl text-base sm:text-lg text-cs-silver/60 leading-relaxed"
          >
            Please read these terms carefully before placing an order with CS Graphics.
          </motion.p>
        </div>
      </section>

      <section className="section-padding py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="glass-premium rounded-3xl overflow-hidden stroke-purple"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6 sm:p-8 md:p-12">
              <motion.ol
                className="space-y-6 sm:space-y-8"
                variants={staggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {TERMS.map((term, i) => (
                  <motion.li
                    key={term.id}
                    variants={termVariants}
                    className="flex gap-4 sm:gap-5"
                  >
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-cs-violet/15 text-cs-neon text-xs sm:text-sm font-bold border border-cs-violet/30">
                      {term.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-cs-silver/85 leading-relaxed">
                        {term.text}
                      </p>
                    </div>
                    {i < TERMS.length - 1 && (
                      <div className="hidden sm:block absolute left-0 top-10 bottom-0 w-px bg-gradient-to-b from-cs-violet/30 to-transparent" />
                    )}
                  </motion.li>
                ))}
              </motion.ol>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative my-10 sm:my-12"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cs-violet/20" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[rgba(14,10,24,0.72)] px-4 text-[10px] uppercase tracking-[0.3em] text-cs-violet/50">
                    Acknowledgment
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="glass-premium rounded-2xl p-5 sm:p-7 md:p-8 stroke-yellow"
              >
                <p
                  className="text-sm sm:text-base text-cs-silver/80 leading-relaxed italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;Dear Valued Customer,
                  <br />
                  You are our most valuable asset,
                  <br />
                  and to add value to both your and our valuable time,
                  <br />
                  these terms and conditions are effective from January 2026.&rdquo;
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 sm:mt-10"
              >
                <label className="group flex cursor-pointer items-start gap-3 sm:gap-4">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={accepted}
                    onClick={() => setAccepted(!accepted)}
                    className="relative mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-300"
                    style={{
                      borderColor: accepted ? "rgba(231,255,0,0.8)" : "rgba(110,0,255,0.5)",
                      background: accepted ? "rgba(110,0,255,0.25)" : "transparent",
                    }}
                  >
                    {accepted && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <HiCheck className="h-3 w-3 sm:h-4 sm:w-4 text-cs-neon" />
                      </motion.span>
                    )}
                  </button>
                  <span className="text-xs sm:text-sm text-cs-silver/60 leading-relaxed select-none">
                    I have read and agree to the{" "}
                    <span className="text-cs-neon/80">Terms of Services</span> outlined above.
                  </span>
                </label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 sm:mt-10"
              >
                <div className="relative my-8 sm:my-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-cs-violet/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[rgba(14,10,24,0.72)] px-4 text-[10px] uppercase tracking-[0.3em] text-cs-violet/50">
                      Next Steps
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                  {accepted ? (
                    <MagneticButton href="/#contact">
                      Proceed to Contact
                    </MagneticButton>
                  ) : (
                    <span className="btn-premium glass relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] text-cs-silver opacity-40 cursor-not-allowed select-none">
                      <span className="relative z-[1]">Accept Terms First</span>
                    </span>
                  )}
                  <Link
                    href="/"
                    className="text-xs uppercase tracking-[0.25em] text-cs-silver/40 hover:text-cs-silver/70 transition-colors"
                  >
                    Return Home
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
