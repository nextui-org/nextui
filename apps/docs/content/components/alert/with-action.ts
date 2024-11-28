const App = `import {Alert, Button} from "@nextui-org/react";

export default function App() {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex items-center justify-center w-full">
      <Alert
        color="warning"
        description="Upgrade to a paid plan to continue"
        endContent={
          <Button color="warning" size="sm" variant="flat">
            Upgrade
          </Button>
        }
        title="You have no credits left"
        variant="faded"
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
