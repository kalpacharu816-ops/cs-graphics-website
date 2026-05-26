"use client";

import { useEffect, useState } from "react";
import { getMergedService } from "@/lib/cms/store";
import type { ServiceDetail } from "@/lib/services-data";
import { ServicePageContent } from "./ServicePageContent";

export function ServicePageLoader({
  slug,
  initialService,
}: {
  slug: string;
  initialService: ServiceDetail;
}) {
  const [service, setService] = useState<ServiceDetail>(initialService);

  useEffect(() => {
    const merged = getMergedService(slug);
    if (merged) setService(merged);
  }, [slug]);

  return <ServicePageContent service={service} />;
}
