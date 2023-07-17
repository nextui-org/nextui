const App = `import {Button} from '@nextui-org/react';

export default function App() {
  return (
    <div className="flex gap-4">
      <Button variant="bordered" className="rounded-[4px] border-[1px]">
        Button
      </Button>
      <Button isDisabled color="primary" className="rounded-[4px] opacity-30">
        Disabled
      </Button>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
