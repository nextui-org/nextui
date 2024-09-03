"use client";

import {usePathname} from "next/navigation";

import {getCurrentYear} from "@/utils/time";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <footer className="container mx-auto max-w-7xl pb-12 px-12">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm text-default-400">
          © {getCurrentYear()} NextUI Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
