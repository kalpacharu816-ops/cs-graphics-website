import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPaymentBySlug,
  PAYMENT_SLUGS,
} from "@/lib/payment-methods.config";
import { PaymentPageContent } from "@/components/payments/PaymentPageContent";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PAYMENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payment = getPaymentBySlug(slug);
  if (!payment) return { title: "Payment — CS Graphics" };
  return {
    title: `Pay with ${payment.name} — CS Graphics`,
    description: payment.shortDescription,
  };
}

export default async function PaymentPage({ params }: Props) {
  const { slug } = await params;
  const payment = getPaymentBySlug(slug);
  if (!payment) notFound();

  return <PaymentPageContent payment={payment} />;
}
