"use client";

import { useEffect, useState } from "react";
import { getMergedService } from "@/lib/cms/store";
import { getServiceBySlug, type ServiceDetail } from "@/lib/services-data";
import { ServicePageContent } from "./ServicePageContent";

export function ServicePageLoader({ slug }: { slug: string }) {
  const [service, setService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    setService(getMergedService(slug) ?? getServiceBySlug(slug) ?? null);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-cs-silver/40 text-sm uppercase tracking-widest">
        Loading…
      </div>
    );
  }

  return <ServicePageContent service={service} />;
}
