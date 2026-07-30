"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import type { ServiceDetail } from "@/lib/services-data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";

export function ServicePageContent({ service }: { service: ServiceDetail }) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  useEffect(() => {
    const words = titleRef.current?.querySelectorAll(".word");
    if (!words?.length) return;
    gsap.from(words, {
      y: 60,
      opacity: 0,
      filter: "blur(14px)",
      stagger: 0.07,
      duration: 0.95,
      ease: "power4.out",
      delay: 0.2,
    });
  }, []);

  const titleWords = service.title.split(" ");

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-end overflow-hidden"
      >
        <motion.div
          style={{ y: parallaxY, opacity: heroOpacity }}
          className="absolute inset-0 -z-10"
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gallery[0]?.gradient ?? "from-cs-violet/40 to-black"}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cs-black/20 via-cs-black/70 to-cs-black"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(110,0,255,0.25),transparent_55%)]" />
        </motion.div>

        <motion.div
          className="section-padding relative z-10 w-full pb-20 pt-36 md:pb-28 md:pt-44"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="/#services"
            scroll={false}
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cs-silver/50 hover:text-cs-neon transition-colors"
          >
            <HiArrowLeft className="h-4 w-4" />
            All Services
          </Link>

          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cs-neon">
            {service.heroEyebrow}
          </p>

          <h1
            ref={titleRef}
            className="max-w-4xl text-4xl font-bold leading-[1.08] text-cs-silver md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.2em]">
                {word}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg text-cs-silver/60 leading-relaxed"
          >
            {service.longDescription}
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cs-violet mb-4">
            Ready when you are
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold text-cs-silver"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s create your next {service.shortTitle.toLowerCase()}
          </h2>
          <p className="mt-4 text-cs-silver/55 max-w-md mx-auto">
            Premium turnaround, cinematic quality, and a process built around your brand goals.
          </p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MagneticButton href="/#contact">Get a Quote</MagneticButton>
            <GlassButton href={CONTACT.whatsappUrl} variant="neon">
              WhatsApp
            </GlassButton>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
