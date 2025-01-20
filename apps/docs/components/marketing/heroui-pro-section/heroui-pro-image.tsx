"use client";

import {useTheme} from "next-themes";
import NextImage from "next/image";
import {useEffect, useState} from "react";

export const HeroUIProImage = () => {
  const [mounted, setMounted] = useState(false);
  const {theme} = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  let imgSrc = isDarkMode
    ? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/nextuipro-section-background.webp"
    : "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/nextuipro-section-background-light.webp";

  if (!mounted) return null;

  return (
    <NextImage
      alt="Hero Background"
      className="opacity-0 animate-fadeIn"
      height={3255}
      quality={100}
      src={imgSrc}
      width={1920}
    />
  );
};
