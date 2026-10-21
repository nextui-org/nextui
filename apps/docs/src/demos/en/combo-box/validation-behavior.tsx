"use client";

import {
  Button,
  ComboBox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
} from "@heroui/react";
import {useState} from "react";

const animals = [
  {id: "aardvark", name: "Aardvark"},
  {id: "cat", name: "Cat"},
  {id: "dog", name: "Dog"},
  {id: "kangaroo", name: "Kangaroo"},
  {id: "panda", name: "Panda"},
  {id: "snake", name: "Snake"},
];

export function ValidationBehavior() {
  const [nativeMessage, setNativeMessage] = useState<string | null>(null);
  const [ariaMessage, setAriaMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <Form
        className="flex w-[256px] flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setNativeMessage("Submitted with native validation.");
        }}
      >
        <ComboBox isRequired className="w-full" name="animal" validationBehavior="native">
          <Label>Animal (native)</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Select an animal..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              {animals.map((animal) => (
                <ListBox.Item key={animal.id} id={animal.id} textValue={animal.name}>
                  {animal.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
          <Description>Blocks submission when the value is missing</Description>
          <FieldError />
        </ComboBox>
        <Button className="w-fit" type="submit">
          Submit
        </Button>
        {!!nativeMessage && <p className="text-sm text-muted">{nativeMessage}</p>}
      </Form>
      <Form
        className="flex w-[256px] flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setAriaMessage("Submitted with ARIA validation.");
        }}
      >
        <ComboBox isRequired className="w-full" name="animal-aria" validationBehavior="aria">
          <Label>Animal (ARIA)</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Select an animal..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              {animals.map((animal) => (
                <ListBox.Item key={animal.id} id={animal.id} textValue={animal.name}>
                  {animal.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
          <Description>Shows errors in realtime and does not block submission</Description>
          <FieldError />
        </ComboBox>
        <Button className="w-fit" type="submit">
          Submit
        </Button>
        {!!ariaMessage && <p className="text-sm text-muted">{ariaMessage}</p>}
      </Form>
    </div>
  );
}
