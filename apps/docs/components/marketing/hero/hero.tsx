"use client";

import NextLink from "next/link";
import {Button, Link, Chip, Snippet} from "@nextui-org/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";

import {FloatingComponents} from "./floating-components";

import {GithubIcon} from "@/components/icons";
import {title, subtitle} from "@/components/primitives";
import {trackEvent} from "@/utils/va";

const BgLooper = dynamic(() => import("./bg-looper").then((mod) => mod.BgLooper), {
  ssr: false,
});

export const Hero = () => {
  const handlePressAnnouncement = (name: string, url: string) => {
    trackEvent("NavbarItem", {
      name,
      action: "press",
      category: "home - gero",
      data: url,
    });
  };

  return (
    <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      <div className="flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10">
        <div className="w-full flex justify-center md:hidden">
          <Chip
            as={NextLink}
            className="bg-default-100/50 hover:bg-default-100 border-default-200/80 dark:border-default-100/80 transition-colors cursor-pointer"
            color="default"
            href="/blog/v2.3.0"
            variant="dot"
            onClick={() => handlePressAnnouncement("New version v2.4.0", "/blog/v2.4.0")}
          >
            New version v2.4.0&nbsp;
            <span aria-label="emoji" role="img">
              🚀
            </span>
          </Chip>
        </div>
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
        <div className="flex flex-col gap-y-2 my-3 items-start">
          <a
            href="https://www.producthunt.com/posts/zigma-by-nextui-yc-s24?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-zigma&#0045;by&#0045;nextui&#0045;yc&#0045;s24"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Zigma&#0032;by&#0032;NextUI&#0032;&#0040;YC&#0032;S24&#0041; - Connect&#0032;your&#0032;design&#0032;files&#0032;to&#0032;production&#0032;code&#0032;in&#0032;minutes | Product Hunt"
              className="m-0"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=488715&theme=light"
              style={{width: "250px", height: "54px"}}
              width="250"
            />
          </a>
          <p className="text-sm text-default-500 font-semibold !p-0 m-0">
            We&apos;re live on Product Hunt! Join the conversation and help us get to #1 Product of
            the day 🚀
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button
            as={NextLink}
            className="w-full md:h-11 md:w-auto"
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
          <Snippet
            className="w-full rounded-full hidden md:flex sm:w-auto"
            copyButtonProps={{
              radius: "full",
            }}
            onCopy={() => {
              trackEvent("Hero - Copy Install Command", {
                name: "Copy",
                action: "click",
                category: "landing-page",
                data: "npx nextui-cli@latest init",
              });
            }}
          >
            npx nextui-cli@latest init
          </Snippet>
          <Button
            fullWidth
            isExternal
            as={Link}
            className="w-full md:hidden"
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
