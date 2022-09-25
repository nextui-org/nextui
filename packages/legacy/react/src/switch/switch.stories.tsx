import React from "react";
import {Meta} from "@storybook/react";

import {Moon, Sun, Lock, Notification} from "../utils/icons";

import Switch from "./index";

export default {
  title: "Inputs/Switch",
  component: Switch,
  onChange: {action: "changed"},
} as Meta;

export const Default = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Switch />
    <br />
    <Switch initialChecked />
  </div>
);

export const Colors = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Switch checked={true} color="primary">
      Primary
    </Switch>
    <br />
    <Switch checked={true} color="secondary">
      Secondary
    </Switch>
    <br />
    <Switch checked={true} color="success">
      Success
    </Switch>
    <br />
    <Switch checked={true} color="warning">
      Warning
    </Switch>
    <br />
    <Switch checked={true} color="error">
      Error
    </Switch>
  </div>
);

export const Sizes = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Switch initialChecked size="xs" />
    <br />
    <Switch size="sm" />
    <br />
    <Switch initialChecked size="md" />
    <br />
    <Switch size="lg" />
    <br />
    <Switch initialChecked size="xl" />
  </div>
);

export const Squared = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Switch squared checked={true} color="primary">
      Primary
    </Switch>
    <br />
    <Switch squared checked={true} color="secondary">
      Secondary
    </Switch>
    <br />
    <Switch squared checked={true} color="success">
      Success
    </Switch>
    <br />
    <Switch squared checked={true} color="warning">
      Warning
    </Switch>
    <br />
    <Switch squared checked={true} color="error">
      Error
    </Switch>
  </div>
);

export const Disabled = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Switch disabled />
    <br />
    <Switch disabled initialChecked />
  </div>
);

export const Icons = () => {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Switch icon={<Lock />} size="xl" />
      <Switch icon={<Notification />} size="xl" />
      <Switch iconOff={<Moon />} iconOn={<Sun />} size="xl" />
    </div>
  );
};
