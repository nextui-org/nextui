import {memo} from "react";
import clsx from "clsx";

import {sectionWrapper, title, titleWrapper, subtitle} from "../../primitives";
import Marquee from "../marquee";

import {HeroUIProButton} from "./heroui-pro-button";
import {HeroUIProChip} from "./heroui-pro-chip";
import {HeroUIProImage} from "./heroui-pro-image";

const CheckmarkIcon = memo(() => (
  <svg fill="none" height="11" viewBox="0 0 13 11" width="13" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 6.4L4.14286 10L12 1"
      stroke="#006FEE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
));

CheckmarkIcon.displayName = "CheckmarkIcon";

export const HeroUIProSection = () => {
  return (
    <section
      className={sectionWrapper({
        class: "flex-row items-end relative mt-16 lg:mt-44 overflow-hidden",
      })}
    >
      <div className="flex min-h-[480px]">
        <div className="w-full w-full relative z-30 flex h-full flex-col items-start justify-center leading-8 pt-4">
          <HeroUIProChip />
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
            created by the team behind HeroUI.
          </p>
          <ul className="mt-4 text-foreground-600 font-medium">
            <li className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              210+ Components
            </li>
            <li className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Lifetime Access
            </li>
            <li className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Free Updates
            </li>
            <li className="flex gap-x-4 items-center">
              <CheckmarkIcon />
              Figma Files Included
            </li>
          </ul>
          <div className="mt-4">
            <HeroUIProButton />
          </div>
        </div>
      </div>
      <div className="hidden md:block w-screen">
        <Marquee
          vertical
          className="hidden md:block relative flex overflow-visible items-center min-h-[480px]"
          duration={90}
          wrapperClassName="absolute md:top-24 -left-[47%] w-[1000px]"
        >
          <HeroUIProImage />
        </Marquee>
        <div
          className={clsx(
            "absolute inset-0 pointer-events-none z-20 bg-white dark:bg-black",
            "[-webkit-mask-image:radial-gradient(at_70%_50%,_rgba(255,255,255,0)_20%,_rgba(255,255,255,0.8)_40%,_rgba(0,0,0,1)_60%)]",
          )}
        />
      </div>
    </section>
  );
};
