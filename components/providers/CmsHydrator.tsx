"use client";

import { useEffect, useRef } from "react";

export function CmsHydrator() {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    Promise.allSettled([
      import("@/lib/cms/store").then((m) => m.syncAllFromApi()),
      import("@/lib/reviews").then((m) => m.syncReviewsFromApi()),
      import("@/lib/contact-inbox").then((m) => m.syncInboxFromApi()),
      import("@/lib/cms/site-settings").then((m) => m.syncSiteSettingsFromApi()),
    ]);
  }, []);

  return null;
}
