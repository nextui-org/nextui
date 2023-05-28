const App = `import {Card, CardBody} from "@nextui-org/react";

export default function App() {
  return (
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
