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

export function FormValue() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <Form
      className="flex w-[256px] flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setMessage(`Key: ${formData.get("animal")}. Text: ${formData.get("animal-text")}.`);
      }}
    >
      <ComboBox isRequired className="w-full" formValue="key" name="animal">
        <Label>Animal</Label>
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
        <Description>Submits the selected key</Description>
        <FieldError />
      </ComboBox>
      <ComboBox isRequired className="w-full" formValue="text" name="animal-text">
        <Label>Animal (text)</Label>
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
        <Description>Submits the selected text</Description>
        <FieldError />
      </ComboBox>
      <Button className="w-fit" type="submit">
        Submit
      </Button>
      {!!message && <p className="text-sm text-muted">{message}</p>}
    </Form>
  );
}
