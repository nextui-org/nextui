const App = `import {Tabs, Tab} from "@nextui-org/react";

export default function App() {
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger"
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Tabs key={color} color={color} aria-label="Tabs colors">
          <Tab key="photos" title="Photos"/>
          <Tab key="music" title="Music"/>
          <Tab key="videos" title="Videos"/>
        </Tabs>
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
