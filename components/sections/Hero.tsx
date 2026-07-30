"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";
import { getHeroConfig } from "@/lib/cms/store";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassButton } from "@/components/ui/GlassButton";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { HeroBackground } from "./HeroBackground";

const HeroParticleField = dynamic(
  () =>
    import("@/components/effects/HeroParticleField").then(
      (m) => m.HeroParticleField
    ),
  { ssr: false }
);

function CompanyTagline({ text }: { text: string }) {
  const match = text.match(/^#\s*(\S+?)\.\s+(\S+?)\.?$/);
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7 }}
      className="tagline mt-5 text-sm sm:text-base tracking-[0.12em] sm:tracking-[0.15em] text-cs-silver/80"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {match ? (
        <>
          #
          <span className="text-cs-gold">{match[1][0]}</span>
          {match[1].slice(1)}.{" "}
          <span className="text-cs-gold">{match[2][0]}</span>
          {match[2].slice(1)}.
        </>
      ) : (
        text
      )}
    </motion.p>
  );
}

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const [hero, setHero] = useState(() => ({
    eyebrow: "Premium Creative Studio",
    titleWords: ["Premium", "Visuals", "That", "Convert."],
    subtitle:
      "CS Graphics crafts scroll-stopping thumbnails, stream packs, and brand visuals with cinematic precision.",
    tagline: "#Creative. Strong.",
  }));

  useEffect(() => {
    setHero(getHeroConfig());
  }, []);

  useHeroAnimation(headlineRef, subRef);

  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden isolate">
      <HeroBackground />
      <HeroParticleField />

      <div className="section-padding relative z-10 w-full pb-20 pt-32 sm:pb-24 sm:pt-40 md:pb-32 md:pt-48">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 sm:mb-6 text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.4em] text-cs-neon"
        >
          {hero.eyebrow}
        </motion.p>

        <h1
          ref={headlineRef}
          className="hero-headline max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-cs-silver sm:text-5xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {hero.titleWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="word inline-block mr-[0.2em] opacity-100 will-gpu"
            >
              {word}
            </span>
          ))}
        </h1>

        <CompanyTagline text={hero.tagline} />

        <p
          ref={subRef}
          className="hero-sub text-gold-shine mt-6 sm:mt-8 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed opacity-100"
        >
          {hero.subtitle}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
        >
          <MagneticButton href="/#services">View Services</MagneticButton>
          <GlassButton href={CONTACT.whatsappUrl} variant="neon">
            WhatsApp Us
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );
}
