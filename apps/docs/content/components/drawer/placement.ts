const App = `import {Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [drawerPlacement, setDrawerPlacement] = React.useState("bottom");

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Open Drawer</Button>
      <RadioGroup
        label="Select drawer placement"
        orientation="horizontal"
        value={drawerPlacement}
        onValueChange={setDrawerPlacement}
      >
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
      </RadioGroup>
      <Drawer 
        isOpen={isOpen}
        placement={drawerPlacement}
        onOpenChange={onOpenChange} 
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
              <DrawerBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
