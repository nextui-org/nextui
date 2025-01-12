import {Tabs, Tab} from "@heroui/react";

export default function App() {
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Tabs key={size} aria-label="Tabs sizes" size={size}>
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </Tabs>
      ))}
    </div>
  );
}
