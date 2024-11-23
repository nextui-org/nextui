const App = `import {Image} from "@nextui-org/react";

export default function App() {
  return (
    <Image
      width={300}
      height={200}
      alt="NextUI hero Image with delay"
      src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
