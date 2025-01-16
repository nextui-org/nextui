import {Tabs, Tab} from "@heroui/react";

export default function App() {
  const radiusList = ["full", "lg", "md", "sm", "none"];

  return (
    <div className="flex flex-wrap gap-4">
      {radiusList.map((radius) => (
        <Tabs key={radius} aria-label="Tabs radius" radius={radius}>
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </Tabs>
      ))}
    </div>
  );
}
