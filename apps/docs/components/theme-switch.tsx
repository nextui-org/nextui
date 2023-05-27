import {FC, useState, useEffect} from "react";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {SwitchProps, useSwitch} from "@nextui-org/react";
import {useTheme} from "next-themes";
import {clsx} from "@nextui-org/shared-utils";

import {SunFilledIcon, MoonFilledIcon} from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({className, classNames}) => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
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
              "group-data-[checked=true]:bg-transparent",
              "!text-default-600 dark:!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {isSelected ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
      </div>
    </Component>
  );
};
