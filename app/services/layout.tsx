import { OfferBar } from "@/components/sections/OfferBar";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatbotPlaceholder } from "@/components/modals/ChatbotPlaceholder";

export default function ServicesLayout({
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
      <ChatbotPlaceholder />
    </>
  );
}
