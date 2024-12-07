import {Image} from "@nextui-org/react";
import NextImage from "next/image";

export default function App() {
  return (
    <Image
      alt="NextUI hero Image"
      as={NextImage}
      height={200}
      src="https://nextui.org/images/hero-card-complete.jpeg"
      width={300}
    />
  );
}
