"use client";

import {Button, ComboBox, FieldError, Form, Input, Label, ListBox} from "@heroui/react";

const animals = [
  {id: "aardvark", name: "土豚"},
  {id: "cat", name: "猫"},
  {id: "dog", name: "狗"},
  {id: "kangaroo", name: "袋鼠"},
  {id: "panda", name: "熊猫"},
  {id: "snake", name: "蛇"},
];

export function CustomValidation() {
  return (
    <Form
      className="flex w-[256px] flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("表单提交成功！");
      }}
    >
      <ComboBox
        isRequired
        className="w-full"
        name="animal"
        validate={(value) => {
          if (value.selectedKey == null) {
            return "请选择一种动物";
          }

          if (value.selectedKey === "snake") {
            return "不允许选择蛇";
          }

          return true;
        }}
      >
        <Label>最喜欢的动物</Label>
        <ComboBox.InputGroup>
          <Input placeholder="搜索动物…" />
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
        提交
      </Button>
    </Form>
  );
}
