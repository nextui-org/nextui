const App = `import {Tabs, Tab, Card, CardBody, RadioGroup, Radio} from "@nextui-org/react";

export default function App() {
  const [position, setPosition] = React.useState("top");
  return (
    <div className="flex flex-col px-4">
      <RadioGroup
        className="mb-4"
        value={position}
        label="Tab Position"
        orientation="horizontal"
        onValueChange={(value) => setPosition(value)}
      >
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
      </RadioGroup>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" tabPosition={position}>
          <Tab key="photos" title="Photos">
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="music" title="Music">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="videos" title="Videos">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
