import {FC, useState, useEffect} from "react";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {useSwitch} from "@nextui-org/react";
import {useTheme} from "next-themes";

import {SunFilledIcon, MoonFilledIcon} from "@/components/icons";

export const ThemeSwitch: FC<{}> = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} = useSwitch({
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
        className: "px-px transition-opacity hover:opacity-80 cursor-pointer",
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-auto h-auto",
            "bg-transparent",
            "rounded-lg",
            "flex items-center justify-center",
            "group-data-[checked=true]:bg-transparent",
            "!text-neutral-400",
            "pt-px",
            "px-0",
            "mx-0",
          ],
        })}
      >
        {isSelected ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
      </div>
    </Component>
  );
};
