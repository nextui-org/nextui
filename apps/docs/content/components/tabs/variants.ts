const App = `import {Tabs, Tab} from "@nextui-org/react"; 

export default function App() {
  const variants = [
    "solid",
    "underlined",
    "bordered",
    "light",
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant} aria-label="Tabs variants">
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
