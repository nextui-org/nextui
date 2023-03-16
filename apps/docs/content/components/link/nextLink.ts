const App = `import { Link } from "@nextui-org/react";
import NextLink from "next/link";

export default function App() {
  return (
    <Link href="/" as={NextLink} block color="secondary">
      Go to Button
    </Link>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
