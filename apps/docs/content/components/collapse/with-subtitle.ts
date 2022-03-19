const App = `import { Collapse, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Collapse.Group>
      <Collapse title="Option A" subtitle="More description about Option A">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Collapse>
      <Collapse
        title="Option B"
        subtitle={
          <>
            More description about <Text b>Option B</Text>
          </>
        }
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Collapse>
    </Collapse.Group>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
