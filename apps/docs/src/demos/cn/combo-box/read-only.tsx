"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";

const animals = [
  {id: "aardvark", name: "土豚"},
  {id: "cat", name: "猫"},
  {id: "dog", name: "狗"},
  {id: "kangaroo", name: "袋鼠"},
  {id: "panda", name: "熊猫"},
  {id: "snake", name: "蛇"},
];

export function ReadOnly() {
  return (
    <ComboBox isReadOnly className="w-[256px]" defaultSelectedKey="cat">
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
    </ComboBox>
  );
}
