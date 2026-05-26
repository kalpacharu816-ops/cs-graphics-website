"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { PremiumCard } from "@/components/ui/PremiumCard";

export function Services() {
  return (
    <SectionReveal>
      <section id="services" className="section-padding py-24 md:py-36">
        <SectionHeading
          eyebrow="Services"
          title="Design that performs"
          subtitle="Every deliverable is engineered for platform algorithms and human attention."
        />

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumCard
                href={`/services/${service.slug}`}
                stroke="purple"
                glass
                className="service-card h-full p-6 sm:p-8 cursor-pointer"
              >
                <span className="text-2xl text-cs-violet">{service.icon}</span>
                <h3
                  className="mt-5 text-lg sm:text-xl font-bold text-cs-silver drop-shadow-[0_0_12px_rgba(217,217,217,0.12)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cs-silver/65">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-cs-neon opacity-70 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
