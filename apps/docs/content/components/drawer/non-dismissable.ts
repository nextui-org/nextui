const App = `import {Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure} from "@nextui-org/react";

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Non Dismissable Drawer</DrawerHeader>
              <DrawerBody>
                <p>
                  Click the close button or action button to close the drawer.
                  Clicking outside or pressing the escape key won't close it.
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
    </>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
