import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, SERVICE_SLUGS } from "@/lib/services-data";
import { ServicePageLoader } from "@/components/services/ServicePageLoader";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service — CS Graphics" };
  return {
    title: `${service.title} — CS Graphics`,
    description: service.longDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServicePageLoader slug={slug} initialService={service} />;
}
