"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";
import { saveContactMessage } from "@/lib/contact-inbox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassButton } from "@/components/ui/GlassButton";
import { SocialIcons } from "@/components/ui/SocialIcons";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContactMessage({ name, email, message });
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <SectionReveal>
      <section id="contact" className="section-padding py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something iconic"
            subtitle="Tell us about your project. We typically respond within a few hours on WhatsApp."
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-premium stroke-purple rounded-3xl p-8 md:p-10 space-y-5"
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="form-input w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-cs-silver placeholder:text-cs-silver/30 outline-none focus:border-cs-violet/50"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="form-input w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-cs-silver placeholder:text-cs-silver/30 outline-none focus:border-cs-violet/50"
            />
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Project details"
              className="form-input w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-cs-silver placeholder:text-cs-silver/30 outline-none focus:border-cs-violet/50"
            />
            <GlassButton type="submit" variant="primary" className="w-full">
              {sent ? "Message sent — we'll reply soon" : "Send Inquiry"}
            </GlassButton>
          </motion.form>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <GlassButton href={CONTACT.whatsappUrl} variant="neon">
            WhatsApp · {CONTACT.whatsapp}
          </GlassButton>
          <GlassButton href={`mailto:${CONTACT.email}`} variant="outline">
            {CONTACT.email}
          </GlassButton>
        </div>

        <SocialIcons className="mt-10" />
      </section>
    </SectionReveal>
  );
}
