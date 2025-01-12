import {Image} from "@heroui/react";
import NextImage from "next/image";

export default function App() {
  return (
    <Image
      alt="HeroUI hero Image"
      as={NextImage}
      height={200}
      src="https://heroui.com/images/hero-card-complete.jpeg"
      width={300}
    />
  );
}
