"use client";

import {
  Button,
  Textarea,
  Tabs,
  Tab,
  Input,
  RadioGroup,
  Radio,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import {useState} from "react";

export default function NextUIPerf() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [textC, setTextC] = useState("");
  const [radio, setRadio] = useState("1");

  return (
    <div className="w-full p-24 gap-4 flex flex-col">
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
          cupidatat voluptate eu officia. Ut laborum sunt nostrud magna. Ex magna esse cillum enim
          incididunt pariatur qui veniam dolor. Exercitation id culpa et enim mollit duis duis
          aliquip. Magna ullamco est cupidatat laboris irure pariatur aliquip duis aute cillum.
          Officia irure do laboris ea nisi sunt reprehenderit laboris irure. Ex eiusmod in duis
          veniam excepteur. Sunt et et laboris culpa. Mollit excepteur occaecat elit anim officia.
          Laborum commodo proident cupidatat pariatur eu veniam id qui do culpa. Quis consectetur
          adipisicing anim ex ea velit excepteur. Deserunt laboris ex aute sunt laborum tempor ea
          enim dolore ut in. Id aliqua Lorem exercitation qui velit nostrud anim reprehenderit enim.
          Nisi elit fugiat deserunt elit. Sit excepteur ipsum enim excepteur irure irure sint veniam
          elit consequat ea id. Lorem ea qui sunt enim occaecat excepteur officia ex consequat
          nostrud. Tempor sint Lorem est culpa do.
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
          cupidatat voluptate eu officia. Ut laborum sunt nostrud magna. Ex magna esse cillum enim
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
        </AccordionItem>
      </Accordion>
      <Tabs classNames={{panel: "flex flex-col gap-5"}} variant="underlined">
        <Tab title="Test 1">
          <Textarea defaultValue="ASdasd" label="Default value (uncontrolled)" />
          <Input label="Text B Tab 1" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 1" value={textC} onValueChange={setTextC} />
        </Tab>
        <Tab title="Test 2">
          <Textarea label="Text B Tab 2" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 2" value={textC} onValueChange={setTextC} />
        </Tab>
        <Tab title="Test 3">
          <Textarea label="Text B Tab 3" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 3" value={textC} onValueChange={setTextC} />
        </Tab>
      </Tabs>

      <h2>Outside</h2>
      <Textarea label="Text A" placeholder="Text A" value={textA} onValueChange={setTextA} />
      <Textarea label="Text B" placeholder="Text B" value={textB} onValueChange={setTextB} />
      <Textarea label="Text C" placeholder="Text C" value={textC} onValueChange={setTextC} />

      <RadioGroup value={radio} onValueChange={setRadio}>
        <Radio value="1">Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
        <Radio value="4">Radio 4</Radio>
        <Radio value="5">Radio 5</Radio>
        <Radio value="6">Radio 6</Radio>
        <Radio value="7">Radio 7</Radio>
        <Radio value="8">Radio 8</Radio>
        <Radio value="9">Radio 9</Radio>
        <Radio value="10">Radio 10</Radio>
      </RadioGroup>

      <Button>Click Me!</Button>
    </div>
  );
}
