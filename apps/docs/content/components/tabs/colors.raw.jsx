import {Tabs, Tab} from "@heroui/react";

export default function App() {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Tabs key={color} aria-label="Tabs colors" color={color} radius="full">
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </Tabs>
      ))}
    </div>
  );
}
