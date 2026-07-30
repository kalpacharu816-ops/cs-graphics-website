"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCollaborators } from "@/lib/cms/store";
import { COLLABORATORS, type Collaborator } from "@/lib/collaborators";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function ClientMarquee() {
  const [list, setList] = useState<Collaborator[]>(COLLABORATORS);

  useEffect(() => {
    setList(getCollaborators());
  }, []);

  const row = [...list, ...list];

  return (
    <SectionReveal>
      <section className="py-20 md:py-28 border-y border-white/5 overflow-hidden">
        <SectionHeading
          eyebrow="Partners"
          title="My Collaborators"
          subtitle="Brands and creators we've had the privilege to work alongside."
          align="center"
        />
        <div className="relative mt-4">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 marquee-fade-left"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 marquee-fade-right"
            aria-hidden
          />

          <motion.div className="flex w-max animate-marquee gap-6 sm:gap-10 md:gap-12 items-center py-2">
            {row.map((collab, i) => (
              <motion.div
                key={`${collab.id}-${i}`}
                className="collaborator-pill group flex shrink-0 items-center justify-center"
              >
                <div className="collaborator-pill-inner flex h-[72px] w-[180px] sm:h-[80px] sm:w-[200px] items-center justify-center px-5 py-3 rounded-2xl">
                  <Image
                    src={collab.logo}
                    alt={collab.name}
                    width={140}
                    height={40}
                    className="collaborator-pill-logo"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </SectionReveal>
  );
}
