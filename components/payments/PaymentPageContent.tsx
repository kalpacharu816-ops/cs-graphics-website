"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import type { PaymentMethodConfig } from "@/lib/payment-methods.config";
import { CONTACT } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassButton } from "@/components/ui/GlassButton";

export function PaymentPageContent({
  payment,
}: {
  payment: PaymentMethodConfig;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }
    );
  }, []);

  return (
    <>
      <section className="section-padding pt-32 pb-16 md:pt-40 md:pb-20">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cs-silver/50 hover:text-cs-neon transition-colors mb-8"
        >
          <HiArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <p className="text-xs uppercase tracking-[0.4em] text-cs-violet mb-3">
          Payment Method
        </p>
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-cs-silver opacity-100"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {payment.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-cs-silver/60">
          {payment.shortDescription}
        </p>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-3xl p-8 md:p-10"
          >
            <h2
              className="text-xl font-semibold text-cs-silver mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How to pay
            </h2>
            <ol className="space-y-4">
              {payment.instructions.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-cs-silver/70 leading-relaxed"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cs-violet/20 text-xs font-bold text-cs-violet">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {payment.accountDetails && payment.accountDetails.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                <p className="text-xs uppercase tracking-widest text-cs-violet">
                  Details
                </p>
                {payment.accountDetails.map((d) => (
                  <div key={d.label} className="flex flex-wrap justify-between gap-2">
                    <span className="text-sm text-cs-silver/50">{d.label}</span>
                    <span className="text-sm font-medium text-cs-silver">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {payment.note && (
              <p className="mt-8 text-sm text-cs-silver/45 italic border-l-2 border-cs-violet/40 pl-4">
                {payment.note}
              </p>
            )}
          </motion.div>

          {payment.qrImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="glass rounded-3xl p-6 flex flex-col items-center justify-center lg:w-72"
            >
              <p className="text-xs uppercase tracking-widest text-cs-silver/50 mb-4">
                Scan QR
              </p>
              <div className="relative h-48 w-48 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src={payment.qrImage}
                  alt={`${payment.name} QR code`}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <p className="mt-4 text-[10px] text-center text-cs-silver/40">
                Replace with your QR in /public/payments/
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href={CONTACT.whatsappUrl}>WhatsApp Us</MagneticButton>
          <GlassButton href={`mailto:${CONTACT.email}`} variant="outline">
            Email
          </GlassButton>
        </motion.div>
      </section>
    </>
  );
}
