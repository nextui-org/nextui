const App = `import { Link, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Link href="#" isExternal>
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
      <Spacer />
      <Link href="#" isExternal color="success">
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
