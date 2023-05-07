import * as React from "react";
import NextLink from "next/link";
import {Link} from "@nextui-org/react";
import {ChevronIcon} from "@nextui-org/shared-icons";

import {removeFromLast} from "@/utils";
import {Route, addTagToSlug} from "@/libs/docs/page";

export interface FooterNavProps {
  tag?: string;
  prevRoute?: Route;
  nextRoute?: Route;
}

export const FooterNav: React.FC<FooterNavProps> = ({tag, prevRoute, nextRoute}) => {
  return (
    <div className="flex justify-between py-44">
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
