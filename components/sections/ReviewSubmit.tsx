"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewForm } from "@/components/sections/ReviewForm";

export function ReviewSubmit() {
  return (
    <SectionReveal>
      <section id="submit-review" className="section-padding pb-24 md:pb-32">
        <SectionHeading
          eyebrow="Your voice"
          title="Share your experience"
          subtitle="Submit a review in English or Sinhala — we appreciate every word."
          align="center"
        />
        <ReviewForm />
      </section>
    </SectionReveal>
  );
}
