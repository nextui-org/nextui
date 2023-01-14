import React from "react";
import {Item} from "react-stately";

import Select from "./index";

export const Default = () => (
  <Select>
    <Item>Orange</Item>
    <Item>Yellow</Item>
    <Item>Green</Item>
    <Item>Blue</Item>
    <Item>Purple</Item>
    <Item>Black</Item>
    <Item>White</Item>
    <Item>Lime</Item>
    <Item>Fushsia</Item>
  </Select>
);

export default {
  title: "Other/Select",
  component: Select,
} as any;
