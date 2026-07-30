"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PARAGRAPHS = [
  "I'm Kalpa Charuka, a professional graphic designer and the founder of CS Graphics. With a strong passion for visual creativity and brand communication, I help businesses turn ideas into impactful designs that connect with their audience.",
  "Founded in 2022, CS Graphics is a creative graphic design, marketing, and advertising company based in Sri Lanka. We specialize in delivering eye-catching designs and effective marketing solutions tailored to each client's unique goals. From branding and digital designs to promotional visuals, every project is crafted with attention to detail and strategic thinking.",
  "Driven by fresh ideas, modern design trends, and result-oriented strategies, CS Graphics is committed to helping brands grow, stand out, and make a lasting impression in today's competitive market.",
  "CS Graphics is more than a design service — it's your partner in visual storytelling and business success.",
];

export function WhoIAm() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !imageRef.current) return;
    gsap.from(imageRef.current, {
      x: -40,
      opacity: 0,
      filter: "blur(16px)",
      duration: 1.1,
      ease: "power4.out",
    });
  }, [inView]);

  return (
    <section id="about" ref={sectionRef} className="section-padding py-24 md:py-36">
      <SectionHeading
        eyebrow="Founder"
        title="Who I Am"
        subtitle="The mind behind CS Graphics — where strategy meets cinematic design."
      />

      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-10 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-14 items-start"
      >
        <motion.div
          ref={imageRef}
          className="relative mx-auto w-full max-w-[240px] sm:max-w-[260px] lg:mx-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass overflow-hidden rounded-3xl p-2 glow-violet will-gpu">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/profile/kalpa.svg"
                alt="Kalpa Charuka — Founder of CS Graphics"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 70vw, 260px"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-cs-black/80 via-transparent to-transparent pointer-events-none"
                aria-hidden
              />
            </div>
          </div>
          <p
            className="mt-4 text-center lg:text-left text-sm text-cs-silver/55 tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Kalpa Charuka · Founder
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 space-y-5 md:space-y-6">
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[15px] md:text-[17px] leading-[1.75] text-cs-silver/70"
            >
              {text}
            </motion.p>
          ))}
          <div className="pt-2">
            <MagneticButton href="/#contact">Start a Project</MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
