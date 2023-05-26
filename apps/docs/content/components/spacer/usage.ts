const CustomCard = `import { Card } from "@nextui-org/react";

export const CustomCard = () => (
  <Card className="w-[200px] space-y-5 p-4" radius="2xl">
    <div className="h-24 rounded-lg bg-neutral-300"></div>
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-neutral-200"></div>
      <div className="h-3 w-4/5 rounded-lg bg-neutral-200"></div>
      <div className="h-3 w-2/5 rounded-lg bg-neutral-300"></div>
    </div>
  </Card>
);`;

const App = `import { Spacer } from "@nextui-org/react";
import { CustomCard } from "./CustomCard";

export default function App() {
  return (
    <div className="flex">
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/CustomCard.jsx": CustomCard,
};

export default {
  ...react,
};
