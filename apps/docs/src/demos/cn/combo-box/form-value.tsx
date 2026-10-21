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
  {id: "aardvark", name: "土豚"},
  {id: "cat", name: "猫"},
  {id: "dog", name: "狗"},
  {id: "kangaroo", name: "袋鼠"},
  {id: "panda", name: "熊猫"},
  {id: "snake", name: "蛇"},
];

export function FormValue() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <Form
      className="flex w-[256px] flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setMessage(`key：${formData.get("animal")}。文本：${formData.get("animal-text")}。`);
      }}
    >
      <ComboBox isRequired className="w-full" formValue="key" name="animal">
        <Label>动物</Label>
        <ComboBox.InputGroup>
          <Input placeholder="选择动物…" />
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
        <Description>提交选中项的 key</Description>
        <FieldError />
      </ComboBox>
      <ComboBox isRequired className="w-full" formValue="text" name="animal-text">
        <Label>动物（文本）</Label>
        <ComboBox.InputGroup>
          <Input placeholder="选择动物…" />
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
        <Description>提交选中项的文本</Description>
        <FieldError />
      </ComboBox>
      <Button className="w-fit" type="submit">
        提交
      </Button>
      {!!message && <p className="text-sm text-muted">{message}</p>}
    </Form>
  );
}
