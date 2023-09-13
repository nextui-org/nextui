"use client";

import * as React from "react";
import {Link} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {ChevronIcon} from "@nextui-org/shared-icons";

import manifest from "@/config/routes.json";
import {removeFromLast} from "@/utils";
import {Route} from "@/libs/docs/page";
import {useDocsRoute} from "@/hooks/use-docs-route";
import {trackEvent} from "@/utils/va";

export interface FooterNavProps {
  currentRoute?: Route;
}

export const DocsPager: React.FC<FooterNavProps> = ({currentRoute}) => {
  const router = useRouter();

  const {prevRoute, nextRoute} = useDocsRoute(manifest.routes, currentRoute);

  const handlePress = (path: string) => {
    trackEvent("DocsPager - Click", {
      category: "docs",
      action: "click",
      data: path || "",
    });

    router.push(removeFromLast(path || "", "."));
  };

  return (
    <div className="flex w-full justify-between py-20">
      {prevRoute ? (
        <Link
          isBlock
          className="cursor-pointer flex gap-2"
          color="foreground"
          onPress={() => handlePress(prevRoute.path || "")}
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
          className="cursor-pointer flex gap-1 items-center"
          color="foreground"
          onPress={() => handlePress(nextRoute.path || "")}
        >
          {nextRoute.title}
          <ChevronIcon className="rotate-180 text-primary" height={20} width={20} />
        </Link>
      )}
    </div>
  );
};
