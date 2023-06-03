const App = `import {Image} from "@nextui-org/react";

export default function App() {
  return (
    <Image
      width={300}
      height={200}
      src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
