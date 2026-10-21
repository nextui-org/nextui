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

export function ValidationBehavior() {
  const [nativeMessage, setNativeMessage] = useState<string | null>(null);
  const [ariaMessage, setAriaMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <Form
        className="flex w-[256px] flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setNativeMessage("已通过原生校验提交。");
        }}
      >
        <ComboBox isRequired className="w-full" name="animal" validationBehavior="native">
          <Label>动物（原生校验）</Label>
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
          <Description>值为空时阻止提交</Description>
          <FieldError />
        </ComboBox>
        <Button className="w-fit" type="submit">
          提交
        </Button>
        {!!nativeMessage && <p className="text-sm text-muted">{nativeMessage}</p>}
      </Form>
      <Form
        className="flex w-[256px] flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setAriaMessage("已通过 ARIA 校验提交。");
        }}
      >
        <ComboBox isRequired className="w-full" name="animal-aria" validationBehavior="aria">
          <Label>动物（ARIA 校验）</Label>
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
          <Description>实时显示错误，不阻止提交</Description>
          <FieldError />
        </ComboBox>
        <Button className="w-fit" type="submit">
          提交
        </Button>
        {!!ariaMessage && <p className="text-sm text-muted">{ariaMessage}</p>}
      </Form>
    </div>
  );
}
