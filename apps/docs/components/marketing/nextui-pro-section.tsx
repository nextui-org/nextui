"use client";

import {Button, Chip, cn} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import NextImage from "next/image";

import {sectionWrapper, title, titleWrapper, subtitle} from "../primitives";

import Marquee from "./marquee";

import {useIsMobile} from "@/hooks/use-media-query";

export const NextUIProSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useIsMobile();
  const {theme} = useTheme();
  const isDarkMode = theme === "dark";

  let imgSrc: string;

  if (isDarkMode) {
    imgSrc = isMobile
      ? "/images/nextuipro-section-background@mobile.webp"
      : "/images/nextuipro-section-background.webp";
  } else {
    imgSrc = isMobile
      ? "/images/nextuipro-section-background-light@mobile.webp"
      : "/images/nextuipro-section-background-light.webp";
  }

  useEffect(() => {
    const imagesToPreload = [
      "/images/nextuipro-section-background.webp",
      "/images/nextuipro-section-background-light.webp",
      "/images/nextuipro-section-background@mobile.webp",
      "/images/nextuipro-section-background-light@mobile.webp",
    ];
    const preloadImages = (images) => {
      images.forEach((src) => {
        const img = new Image();

        img.src = src;
      });
    };

    preloadImages(imagesToPreload);
  }, []);

  if (!mounted) return null;

  const CheckmarkIcon = () => (
    <svg fill="none" height="11" viewBox="0 0 13 11" width="13" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 6.4L4.14286 10L12 1"
        stroke="#006FEE"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <section className={sectionWrapper({class: "mt-16 lg:mt-44 overflow-hidden"})}>
      <div className="flex flex-col gap-8 min-h-[480px]">
        <div className="z-30 flex w-screen h-full flex-col items-start justify-center leading-8 pt-4">
          <Chip
            classNames={{
              base: "ml-0.5 transition-colors bg-gradient-to-br from-cyan-600 to-blue-600",
              content: "text-tiny font-semibold",
            }}
            color="primary"
            size="sm"
          >
            PRO
          </Chip>
          <div className={titleWrapper({class: "mt-2 inline md:block"})}>
            <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
              Ship&nbsp;
            </h1>
            <h1
              className={title({
                size: "lg",
                color: "blue",
                class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]",
              })}
            >
              faster&nbsp;
            </h1>
            <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
              with&nbsp;
            </h1>
            <div className="flex flex-col sm:flex-row">
              <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
                beautiful&nbsp;
              </h1>
              <h1 className={title({size: "lg", class: "[text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]"})}>
                components
              </h1>
            </div>
          </div>
          <p className={subtitle({class: "pr-12 text-foreground-500"})}>
            Premade templates of over 210+ beautiful and responsive components, professionally
            created by the team behind NextUI.
          </p>
          <div className="mt-4 text-foreground-600 font-medium">
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              210+ Components
            </div>
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Lifetime Access
            </div>
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Free Updates
            </div>
            <div className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Figma Files Included
            </div>
          </div>
          <div className="mt-4">
            <Button
              as={"a"}
              className="px-6 flex items-center"
              color="primary"
              href="https://nextui.pro?utm_source=nextui.org&utm_medium=nextui-homepage-section"
              rel="noopener noreferrer"
              target="_blank"
            >
              Explore NextUI Pro
              <svg
                fill="none"
                height="21"
                viewBox="0 0 20 21"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0254 5.44189L17.0837 10.5002L12.0254 15.5586"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.91602 10.5H16.941"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden">
          <Marquee
            vertical
            className="flex opacity-15 md:opacity-100 w-screen mt-4 absolute top-0 inset-0 isolate max-h-dvh "
            duration={60}
          >
            <NextImage
              alt="Hero Background"
              className="w-full opacity-0 animate-fadeIn"
              height={3255}
              quality={100}
              src={imgSrc}
              width={1920}
            />
          </Marquee>
          <div
            className={cn(
              "absolute inset-0 pointer-events-none z-20 bg-white dark:bg-black",
              !isMobile &&
                "[-webkit-mask-image:radial-gradient(at_70%_50%,_rgba(255,255,255,0)_20%,_rgba(255,255,255,0.8)_40%,_rgba(0,0,0,1)_60%)]",
              isMobile &&
                "[-webkit-mask-image:linear-gradient(to_left,_rgba(255,255,255,_0)_10%,_rgba(0,0,0,1)_100%)]",
            )}
          />
        </div>
      </div>
    </section>
  );
};
