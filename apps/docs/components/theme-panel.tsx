"use client";

import {Button} from "@nextui-org/react";
import {CopyIcon, MoonIcon, SunIcon} from "@nextui-org/shared-icons";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

const ThemePanel = () => {
  const {theme, setTheme} = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="border p-4 col-span-1 h-[70vh] overflow-scroll">
      <h2 className="font-bold text-xl">Theme</h2>
      <div className="flex gap-x-2 my-2">
        <Button isIconOnly variant="flat">
          <CopyIcon />
        </Button>
        <Button
          isIconOnly
          variant="flat"
          onPress={() => {
            theme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          {theme == "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <div className="my-2">
        <h4 className="text-md">Color</h4>
      </div>
    </div>
  );
};

export default ThemePanel;
