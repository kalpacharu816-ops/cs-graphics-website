"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PAYMENT_METHODS } from "@/lib/constants";
import { PAYMENT_METHODS_CONFIG } from "@/lib/payment-methods.config";
import { PaymentLogo } from "@/components/ui/PaymentLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Payments() {
  return (
    <section className="section-padding py-20 md:py-24">
      <SectionHeading
        eyebrow="Payments"
        title="Flexible payment options"
        align="center"
      />
      <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5">
        {PAYMENT_METHODS.map((method, i) => (
          <motion.div
            key={method.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.45 }}
            whileHover={{ scale: 1.06, y: -4 }}
            className="will-gpu"
          >
            <Link
              href={`/payments/${method.slug}`}
              data-magnetic
              aria-label={PAYMENT_METHODS_CONFIG[method.slug].name}
              className="payment-card-icon flex h-[88px] w-[120px] sm:h-[96px] sm:w-[132px] flex-col items-center justify-center gap-3 rounded-2xl bg-cs-black/60 stroke-purple px-4 py-5 transition-shadow duration-300 hover:glow-purple"
            >
              <PaymentLogo slug={method.slug} />
              <span className="sr-only">{method.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
