const App = `import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

export default function App() {
  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content: "List of photos"
    },
    {
      id: "music",
      label: "Music",
      content: "List of music"
    },
    {
      id: "videos",
      label: "Videos",
      content: "List of videos"
    }
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>
                {item.content}
              </CardBody>
            </Card>  
          </Tab>
        )}
      </Tabs>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
