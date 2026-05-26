import { OfferBar } from "@/components/sections/OfferBar";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SeasonalPopup } from "@/components/modals/SeasonalPopup";
import { ChatbotPlaceholder } from "@/components/modals/ChatbotPlaceholder";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OfferBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SeasonalPopup />
      <ChatbotPlaceholder />
    </>
  );
}
