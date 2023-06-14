"use client";

import * as React from "react";
import NextLink from "next/link";
import {Link} from "@nextui-org/react";
import {ChevronIcon} from "@nextui-org/shared-icons";

import manifest from "@/content/docs/manifest.json";
import {removeFromLast} from "@/utils";
import {Route, addTagToSlug} from "@/libs/docs/page";
import {useDocsRoute} from "@/hooks/use-docs-route";

export interface FooterNavProps {
  tag?: string;
  currentRoute?: Route;
}

export const FooterNav: React.FC<FooterNavProps> = ({currentRoute, tag}) => {
  const {prevRoute, nextRoute} = useDocsRoute(manifest.routes, currentRoute);

  return (
    <div className="flex w-full justify-between py-20">
      {prevRoute ? (
        <Link
          isBlock
          as={NextLink}
          className="flex gap-2"
          color="foreground"
          href={addTagToSlug(removeFromLast(prevRoute.path || "", "."), tag)}
        >
          <ChevronIcon className="text-primary" height={20} width={20} />
          {prevRoute.title}
        </Link>
      ) : (
        <span />
      )}
      {nextRoute && (
        <Link
          isBlock
          as={NextLink}
          className="flex gap-1 items-center"
          color="foreground"
          href={addTagToSlug(removeFromLast(nextRoute.path || "", "."), tag)}
        >
          {nextRoute.title}
          <ChevronIcon className="rotate-180 text-primary" height={20} width={20} />
        </Link>
      )}
    </div>
  );
};
