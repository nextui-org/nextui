const App = `import {Accordion, AccordionItem} from "@nextui-org/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Light</h3>
        <Accordion variant="light">
          <AccordionItem key="1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Bordered</h3>
        <Accordion variant="bordered">
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Shadow</h3>
        <Accordion variant="shadow">
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Splitted</h3>
        <Accordion variant="splitted" fullWidth>
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
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
