"use client";

import dynamic from "next/dynamic";
import {usePathname} from "next/navigation";

import {getCurrentYear} from "@/utils/time";

const VercelCallout = dynamic(() => import("./vercel-callout").then((mod) => mod.VercelCallout));

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <footer className="container mx-auto max-w-7xl pb-12 px-12">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm text-default-400">© {getCurrentYear()} NextUI Inc.</p>
        <VercelCallout />
      </div>
    </footer>
  );
};
