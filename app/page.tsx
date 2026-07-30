import { LoaderGate } from "@/components/sections/LoaderGate";
import { OfferBar } from "@/components/sections/OfferBar";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ExperienceStats } from "@/components/sections/ExperienceStats";
import { Services } from "@/components/sections/Services";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Payments } from "@/components/sections/Payments";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoIAm } from "@/components/sections/WhoIAm";
import { ReviewSubmit } from "@/components/sections/ReviewSubmit";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SeasonalPopup } from "@/components/modals/SeasonalPopup";
import { FloatingActions } from "@/components/modals/FloatingActions";

export default function Home() {
  return (
    <LoaderGate>
      <OfferBar />
      <Navbar />
      <main>
        <Hero />
        <ExperienceStats />
        <Services />
        <ClientMarquee />
        <Payments />
        <Testimonials />
        <WhoIAm />
        <ReviewSubmit />
        <Contact />
      </main>
      <Footer />
      <SeasonalPopup />
      <FloatingActions />
    </LoaderGate>
  );
}
