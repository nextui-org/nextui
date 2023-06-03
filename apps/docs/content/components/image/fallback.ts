const App = `import {Image} from "@nextui-org/react";

export default function App() {
  return (
    <Image
      width={300}
      height={200}
      src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
      fallbackSrc="https://via.placeholder.com/300x200"
      alt="NextUI Image with fallback"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
