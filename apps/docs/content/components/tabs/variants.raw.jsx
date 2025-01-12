import {Tabs, Tab} from "@heroui/react";

export default function App() {
  const variants = ["solid", "underlined", "bordered", "light"];

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Tabs key={variant} aria-label="Tabs variants" variant={variant}>
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </Tabs>
      ))}
    </div>
  );
}
