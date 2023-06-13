import {ArrowRightIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import NextLink from "next/link";

import {FloatingComponents} from "./floating-components";
import {BgLooper} from "./bg-looper";

import {title, subtitle} from "@/components/primitives";
import {GithubIcon} from "@/components/icons";

export const Hero = () => {
  return (
    <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      <div className="flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10">
        <div className="text-center leading-8 md:leading-10 md:text-left">
          <div className="inline-block">
            <h1 className={title()}>Make&nbsp;</h1>
            <h1 className={title({color: "violet"})}>beautiful&nbsp;</h1>
          </div>
          <h1 className={title()}>websites regardless of your design experience.</h1>
        </div>
        <h4 className={subtitle({fullWidth: true, class: "text-center md:text-left"})}>
          Beautiful, fast and modern React UI library.
        </h4>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button
            as={NextLink}
            className="w-full md:w-auto"
            color="primary"
            endIcon={
              <ArrowRightIcon
                className="group-data-[hover=true]:translate-x-0.5 transition-transform"
                strokeWidth={2}
              />
            }
            href="/docs/guide/introduction"
            radius="full"
            size="lg"
          >
            Get Started
          </Button>

          <Button
            fullWidth
            isExternal
            as={Link}
            className="w-full md:w-auto"
            href="https://github.com/nextui-org/nextui"
            radius="full"
            size="lg"
            startIcon={<GithubIcon />}
            variant="bordered"
          >
            Github
          </Button>
        </div>
      </div>

      <FloatingComponents />

      <BgLooper />
    </section>
  );
};
