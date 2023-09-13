"use client";

import NextLink from "next/link";
import {Button, Link} from "@nextui-org/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";

import {FloatingComponents} from "./floating-components";

import {title, subtitle} from "@/components/primitives";
import {GithubIcon} from "@/components/icons";
import {trackEvent} from "@/utils/va";

const BgLooper = dynamic(() => import("./bg-looper").then((mod) => mod.BgLooper), {
  ssr: false,
});

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
        <h2 className={subtitle({fullWidth: true, class: "text-center md:text-left"})}>
          Beautiful, fast and modern React UI library.
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button
            as={NextLink}
            className="w-full md:w-auto"
            color="primary"
            endContent={
              <ArrowRightIcon
                className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
                strokeWidth={2}
              />
            }
            href="/docs/guide/introduction"
            radius="full"
            size="lg"
            onPress={() => {
              trackEvent("Hero - Get Started", {
                name: "Get Started",
                action: "click",
                category: "landing-page",
                data: "/docs/guide/introduction",
              });
            }}
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
            startContent={<GithubIcon />}
            variant="bordered"
            onPress={() => {
              trackEvent("Hero - Github", {
                name: "Github",
                action: "click",
                category: "landing-page",
                data: "https://github.com/nextui-org/nextui",
              });
            }}
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
