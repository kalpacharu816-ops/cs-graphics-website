"use client";

import { useEffect, useState } from "react";
import { getOfferMessages } from "@/lib/cms/store";
import { OFFER_MESSAGES } from "@/lib/constants";

export function OfferBar() {
  const [messages, setMessages] = useState<string[]>([...OFFER_MESSAGES]);

  useEffect(() => {
    setMessages(getOfferMessages());
  }, []);

  const segment = messages.map((msg) => (
    <span key={msg} className="offer-segment inline-flex items-center shrink-0">
      <span className="text-cs-neon mr-4 sm:mr-6">◆</span>
      <span>{msg}</span>
    </span>
  ));

  const track = (
    <>
      {segment}
      {segment}
    </>
  );

  const rowClass =
    "flex items-center gap-16 sm:gap-24 md:gap-32 px-10 sm:px-14 whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cs-silver/75";

  return (
    <section
      className="offer-bar fixed top-0 left-0 right-0 z-[90] h-9 sm:h-10 overflow-hidden border-b border-white/5 bg-cs-black/85 backdrop-blur-md"
      aria-label="Promotional offers"
    >
      <div className="flex h-full w-max items-center animate-offer">
        <div className={rowClass}>{track}</div>
        <div className={rowClass} aria-hidden>
          {track}
        </div>
      </div>
    </section>
  );
}
