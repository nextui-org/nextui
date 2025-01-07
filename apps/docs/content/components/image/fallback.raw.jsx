import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with fallback"
      fallbackSrc="https://via.placeholder.com/300x200"
      height={200}
      src="https://app.requestly.io/delay/1000/https://heroui.com/images/fruit-4.jpeg"
      width={300}
    />
  );
}
