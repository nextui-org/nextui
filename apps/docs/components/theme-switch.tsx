"use client";

import {FC} from "react";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {SwitchProps, useSwitch} from "@nextui-org/react";
import {useTheme} from "next-themes";
import {clsx} from "@nextui-org/shared-utils";
import {useIsSSR} from "@react-aria/ssr";

import {SunFilledIcon, MoonFilledIcon} from "@/components/icons";
import {trackEvent} from "@/utils/va";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({className, classNames}) => {
  const {theme, setTheme} = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");

    trackEvent("ThemeChange", {
      action: "click",
      category: "theme",
      data: theme === "light" ? "dark" : "light",
    });
  };

  const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "p-1 w-8 h-8 transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-600 dark:!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
      </div>
    </Component>
  );
};
