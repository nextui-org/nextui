const App = `import {Link} from "@nextui-org/react";
import NextLink from "next/link";

export default function App() {
  return (
    <Link href="/route" as={NextLink}>
      Next.js Link
    </Link>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
