const App = `import {Tabs, Tab} from "@nextui-org/react";

export default function App() {
  const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Tabs key={size} size={size} aria-label="Tabs sizes">
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
