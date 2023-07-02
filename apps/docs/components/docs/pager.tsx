"use client";

import * as React from "react";
import NextLink from "next/link";
import {Link} from "@nextui-org/react";
import {ChevronIcon} from "@nextui-org/shared-icons";

import manifest from "@/config/routes.json";
import {removeFromLast} from "@/utils";
import {Route} from "@/libs/docs/page";
import {useDocsRoute} from "@/hooks/use-docs-route";

export interface FooterNavProps {
  currentRoute?: Route;
}

export const DocsPager: React.FC<FooterNavProps> = ({currentRoute}) => {
  const {prevRoute, nextRoute} = useDocsRoute(manifest.routes, currentRoute);

  return (
    <div className="flex w-full justify-between py-20">
      {prevRoute ? (
        <Link
          isBlock
          as={NextLink}
          className="flex gap-2"
          color="foreground"
          href={removeFromLast(prevRoute.path || "", ".")}
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
          href={removeFromLast(nextRoute.path || "", ".")}
        >
          {nextRoute.title}
          <ChevronIcon className="rotate-180 text-primary" height={20} width={20} />
        </Link>
      )}
    </div>
  );
};
