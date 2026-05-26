import type { Metadata } from "next";
import { OfferBar } from "@/components/sections/OfferBar";
import { Navbar } from "@/components/sections/Navbar";
import { TermsOfServices } from "@/components/sections/TermsOfServices";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Services — CS Graphics",
  description:
    "Read the terms and conditions for ordering design services from CS Graphics.",
};

export default function TermsPage() {
  return (
    <>
      <OfferBar />
      <Navbar />
      <TermsOfServices />
      <Footer />
    </>
  );
}
