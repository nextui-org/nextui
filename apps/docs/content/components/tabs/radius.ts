const App = `import {Tabs, Tab} from "@nextui-org/react"; 

export default function App() {
  const radiusList = [
    "full",
    "lg",
    "md",
    "sm",
    "none",
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {radiusList.map((radius) => (
        <Tabs key={radius} radius={radius} aria-label="Tabs radius">
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
