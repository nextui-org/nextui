const App = `import {Image} from "@nextui-org/react";

export default function App() {
  return <Image width={300} src="/images/hero-card-complete.jpeg" />;
}
`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
