const App = `import { Link, Spacer, Badge, Loading } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Link href="#">
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
      <Spacer />
      <Link href="#" isExternal>
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
      <Spacer />
      <Link href="#" isExternal externalIcon={<Loading size="xs"/>}>
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
