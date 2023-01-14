import React from "react";
import {Item} from "react-stately";

import User from "../user";

import Select from "./index";

export const Default = () => (
  <Select>
    <Select.Option textValue="banane">Banane</Select.Option>
    <Select.Option>Orange</Select.Option>
    <Select.Option>Pomme</Select.Option>
  </Select>
);

export const Bordered = () => (
  <Select inputProps={{bordered: true}}>
    <Select.Option>Banane</Select.Option>
    <Select.Option>Orange</Select.Option>
    <Select.Option>Pomme</Select.Option>
  </Select>
);
export const Exotic = () => (
  <Select inputProps={{bordered: true}}>
    <Select.Option textValue="Amaury Fischer">
      <User
        name="Amaury Fischer"
        src="https://media.licdn.com/dms/image/C4E03AQE-DLIIEdQhCA/profile-displayphoto-shrink_100_100/0/1649493319975?e=1678924800&v=beta&t=Jff2k7A7m3cO2wWGiFCw1CG-MC3GyrQJXRETb23nWo4"
      >
        <User.Link href="https://nextui.org/">@amaufischer</User.Link>
      </User>
    </Select.Option>
    <Select.Option textValue="Linh-dan Tran">
      <User
        name="Linh-dan Tran"
        src="https://media.licdn.com/dms/image/C5603AQFV-BEU-qlG_A/profile-displayphoto-shrink_100_100/0/1578136442382?e=1678924800&v=beta&t=5uj_qf7__BxWg96KZ2muQUonZBtgQTFlSdVqISKkY0Y"
      >
        <User.Link href="https://nextui.org/">@linhdantran</User.Link>
      </User>
    </Select.Option>
  </Select>
);
export default {
  title: "Other/Select",
  component: Select,
} as any;
