"use client";

import {usePathname} from "next/navigation";
import {Link} from "@nextui-org/react";

import {getCurrentYear} from "@/utils/time";
import {XIcon, GithubIcon, DiscordIcon} from "@/components/icons";
import {siteConfig} from "@/config/site";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/examples")) {
    return null;
  }

  const isDocs = pathname.includes("/docs");

  return (
    <footer className="container mx-auto max-w-7xl pb-12 px-12">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm text-default-400">
          © {getCurrentYear()} NextUI Inc. All rights reserved.
        </p>
        {isDocs ? (
          <div className="flex items-center gap-1">
            <Link
              isExternal
              aria-label="Discord"
              className="p-1"
              href={siteConfig.links.discord}
              rel="noopener noreferrer"
            >
              <DiscordIcon className="text-default-600 dark:text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="X"
              className="p-1"
              href={siteConfig.links.twitter}
              rel="noopener noreferrer"
            >
              <XIcon className="text-default-600 dark:text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Github"
              className="p-1"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
            >
              <GithubIcon className="text-default-600 dark:text-default-500" />
            </Link>
          </div>
        ) : null}
      </div>
    </footer>
  );
};
