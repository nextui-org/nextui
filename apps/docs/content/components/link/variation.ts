const App = `import { Link, Spacer, Text } from "@nextui-org/react";

export default function App() {
  const text = "First solve the problem. Then, write the code. - Jon Johnson.";
  return (
    <>
      <Text>
        <Link href="#" color="text">
          {text}
        </Link>
      </Text>
      <Spacer />
      <Text>
        <Link href="#" color="success">
          {text}
        </Link>
      </Text>
      <Spacer />
      <Text>
        <Link href="#" underline>
          {text}
        </Link>
      </Text>
      <Spacer />
      <Text>
        <Link href="#" color="error" underline>
          {text}
        </Link>
      </Text>
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
