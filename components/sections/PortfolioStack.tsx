"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO } from "@/lib/constants";
import { getPortfolio } from "@/lib/cms/store";
import type { PortfolioItem } from "@/lib/cms/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CARD_HEIGHT = 500;

export function PortfolioStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<PortfolioItem[]>(
    PORTFOLIO.map((p, i) => ({
      id: `port-${i}`,
      title: p.title,
      category: p.category,
      gradient: p.gradient,
    }))
  );

  useEffect(() => {
    setItems(getPortfolio());
  }, []);

  useEffect(() => {
    const stack = stackRef.current;
    const section = sectionRef.current;
    if (!stack || !section) return;

    const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card", stack);
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 10,
          zIndex: i + 1,
          transformOrigin: "center top",
          force3D: true,
        });
      });

      const scrollPerCard = window.innerHeight * 0.55;

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: stack,
          start: "top 15%",
          end: () => `+=${scrollPerCard * (cards.length - 1)}`,
          pin: stack,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to(
            card,
            { scale: 0.94, opacity: 0.85, duration: 0.8 },
            0.2
          );
          return;
        }

        const position = i - 0.15;

        tl.fromTo(
          card,
          { yPercent: 40, scale: 0.92, opacity: 0 },
          { yPercent: 0, scale: 1, opacity: 1, duration: 1 },
          position
        );

        const prev = cards[i - 1];
        tl.to(
          prev,
          { scale: 0.9, opacity: 0.35, yPercent: -4, duration: 0.6 },
          position + 0.05
        );
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(stack);

      return () => {
        window.removeEventListener("load", refresh);
        resizeObserver.disconnect();
      };
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected work"
        subtitle="Apple-style stacked showcase — scroll to reveal each project."
        align="center"
      />

      <div className="mx-auto max-w-4xl">
        {/* Desktop stacked scroll */}
        <div
          ref={stackRef}
          className="relative mx-auto hidden w-full max-w-3xl md:block"
          style={{ height: CARD_HEIGHT }}
        >
          {items.map((item, i) => (
            <article
              key={item.id}
              className="portfolio-card portfolio-card-surface relative absolute inset-x-0 top-0 mx-auto w-full overflow-hidden rounded-3xl will-change-transform"
              style={{ height: CARD_HEIGHT }}
            >
              <CardContent item={item} />
            </article>
          ))}
        </div>

        {/* Mobile: simple vertical list */}
        <div className="flex flex-col gap-6 md:hidden">
          {items.map((item) => (
            <article
              key={`mobile-${item.id}`}
              className="portfolio-card-surface relative overflow-hidden rounded-3xl min-h-[320px]"
            >
              <CardContent item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardContent({ item }: { item: PortfolioItem }) {
  return (
    <>
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          loading="lazy"
        />
      ) : null}
      <div
        className={cn(
          "portfolio-card-inner absolute inset-0 bg-gradient-to-br",
          item.gradient,
          item.image && "opacity-75"
        )}
      />
      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-cs-neon">
          {item.category}
        </p>
        <h3
          className="mt-2 text-3xl md:text-4xl font-bold text-cs-silver"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {item.title}
        </h3>
      </div>
    </>
  );
}
