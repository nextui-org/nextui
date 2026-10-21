"use client";

import {Button, ComboBox, FieldError, Form, Input, Label, ListBox} from "@heroui/react";

const animals = [
  {id: "aardvark", name: "Aardvark"},
  {id: "cat", name: "Cat"},
  {id: "dog", name: "Dog"},
  {id: "kangaroo", name: "Kangaroo"},
  {id: "panda", name: "Panda"},
  {id: "snake", name: "Snake"},
];

export function CustomValidation() {
  return (
    <Form
      className="flex w-[256px] flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
      }}
    >
      <ComboBox
        isRequired
        className="w-full"
        name="animal"
        validate={(value) => {
          if (value.selectedKey == null) {
            return "Please select an animal";
          }

          if (value.selectedKey === "snake") {
            return "Snakes are not allowed";
          }

          return true;
        }}
      >
        <Label>Favorite Animal</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search animals..." />
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
        <FieldError />
      </ComboBox>
      <Button className="w-fit" type="submit">
        Submit
      </Button>
    </Form>
  );
}
