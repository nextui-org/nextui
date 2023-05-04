import React from "react";
import {Link} from "@nextui-org/react";

import {VercelIcon} from "@/components/icons";

export const VercelCallout: React.FC<unknown> = () => {
  return (
    <Link
      isExternal
      className="flex mt-4 justify-end items-center gap-2 text-foreground"
      href="https://www.vercel.com?utm_source=nextui&utm_marketing=oss"
    >
      <p className="font-medium">Deployed on</p>
      <VercelIcon className="text-black dark:text-white" height={18} />
    </Link>
  );
};
