import {Link} from "@nextui-org/react";

import {VercelCallout} from "@/components";

export const Footer = () => {
  return (
    <div className="container mx-auto max-w-7xl pb-12">
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm text-neutral-400 flex items-center justify-center">
          Created&nbsp;by&nbsp;
          <Link isExternal className="text-sm" href="https://jrgarciadev.com">
            Junior Garcia
          </Link>
        </p>
        <VercelCallout />
      </div>
    </div>
  );
};
