"use client";

import {Link} from "@nextui-org/react";

import {trackEvent} from "@/utils/va";

export type Sponsor = {
  name: string;
  href: string;
  logo: React.ReactNode;
};

export const SponsorItem = ({name, href, logo}: Sponsor) => {
  return (
    <Link
      isExternal
      className="flex flex-col items-center justify-center"
      href={href}
      onClick={() => {
        trackEvent("Hero - Sponsors", {
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
