"use client";

import {Link} from "@nextui-org/react";
import {usePostHog} from "posthog-js/react";

export type Sponsor = {
  name: string;
  href: string;
  logo: React.ReactNode;
};

export const SponsorItem = ({name, href, logo}: Sponsor) => {
  const posthog = usePostHog();

  return (
    <Link
      isExternal
      className="flex flex-col items-center justify-center"
      href={href}
      onClick={() => {
        posthog.capture("Hero - Sponsors", {
          name,
          action: "click",
          category: "hero",
        });
      }}
    >
      {logo}
    </Link>
  );
};
