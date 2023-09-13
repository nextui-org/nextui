"use client";

import {Button, Link} from "@nextui-org/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";
import NextLink from "next/link";
import {Code} from "@nextui-org/react";

import {FeaturesGrid} from "./features-grid";

import {sectionWrapper, subtitle, title} from "@/components/primitives";
import {GithubIcon, NoteLinearIcon, NextJsIcon} from "@/components/icons";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {trackEvent} from "@/utils/va";

const bannerSuggestions = [
  {
    title: "Getting Started",
    description:
      "Make beautiful, modern, and fast websites/applications regardless of your design experience.",
    icon: <NoteLinearIcon className="text-pink-500" />,
    href: "/docs/guide/installation",
  },
  {
    title: "NextUI + Next.js",
    description: (
      <>
        NextUI is fully compatible with the new Next.js 13 <Code>app/</Code> directory structure.
      </>
    ),
    icon: <NextJsIcon className="text-pink-500" />,
    href: "/docs/frameworks/nextjs",
  },
];

export const InstallBanner = () => {
  const isMounted = useIsMounted();

  return (
    <section
      className={sectionWrapper({
        isBlurred: true,
        class:
          "border-t border-b border-divider px-8 w-screen flex justify-center items-center mt-16 lg:mt-44",
      })}
    >
      <div className=" w-full max-w-7xl py-10 grid grid-cols-12 gap-6 md:gap-0 z-20">
        <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
          <div className="flex flex-col">
            <h1 className={title({size: "md", class: "inline"})}>Let&apos;s make the</h1>
            <div>
              <h1 className={title({size: "md"})}>Web&nbsp;</h1>
              <h1 className={title({size: "md", color: "violet", class: "inline"})}>Prettier</h1>
            </div>
          </div>
          <p className={subtitle({class: "md:w-full text-base lg:text-lg"})}>
            Experience it firsthand and show us your creations!
          </p>
          <div className="flex flex-row gap-3 justify-start">
            <Button
              as={NextLink}
              className="text-sm"
              color="secondary"
              endContent={
                <ArrowRightIcon
                  className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
                  strokeWidth={2}
                />
              }
              href="/docs/guide/installation"
              radius="full"
              size="md"
              onClick={() => {
                trackEvent("InstallBanner - Get Started", {
                  action: "press",
                  category: "landing-page",
                  data: "/docs/guide/installation",
                });
              }}
            >
              Get Started
            </Button>
            <Button
              isExternal
              as={Link}
              className="text-sm"
              href="https://github.com/nextui-org/nextui"
              radius="full"
              size="md"
              startContent={<GithubIcon />}
              variant="bordered"
              onClick={() => {
                trackEvent("InstallBanner - Github", {
                  action: "press",
                  category: "landing-page",
                  data: "https://github.com/nextui-org/nextui",
                });
              }}
            >
              Github
            </Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-2",
            }}
            features={bannerSuggestions}
          />
        </div>
      </div>
      <div
        className={clsx(
          "absolute -top-20 lg:top-10 -translate-y-1/2 w-screen h-screen -z-50 opacity-0",
          "data-[mounted=true]:opacity-100 transition-opacity",
          "bg-left bg-no-repeat bg-[url('/gradients/looper-pattern.svg')]",
          "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-[-1]",
          "after:bg-gradient-to-b after:from-transparent after:to-white/80 dark:after:to-black/20 after:z-[-1]",
        )}
        data-mounted={isMounted}
      />
    </section>
  );
};
