import React from "react";
import {Meta} from "@storybook/react";

import Checkbox from "./index";

const argTypes = {
  color: {
    name: "color",
    type: {name: "string", required: false},
    control: {
      type: "radio",
      options: ["default", "primary", "secondary", "success", "warning", "error"],
    },
  },
  labelColor: {
    name: "labelColor",
    type: {name: "string", required: false},
    control: {
      type: "radio",
      options: ["default", "primary", "secondary", "success", "warning", "error"],
    },
  },
  size: {
    name: "size",
    control: {
      type: "radio",
      options: ["md", "xs", "sm", "lg", "xl"],
    },
  },
  isDisabled: {
    name: "isDisabled",
    type: {name: "boolean", required: false},
    control: {
      type: "boolean",
    },
  },
};

export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
  argTypes,
} as Meta;

export const Default = () => {
  return (
    <Checkbox color="default" labelColor="default" size="md">
      Option
    </Checkbox>
  );
};

export const Label = () => {
  return <Checkbox color="default" label="Option" labelColor="default" size="md" />;
};

export const Disabled = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Checkbox defaultSelected size="xl">
      Enabled
    </Checkbox>
    <br />
    <Checkbox defaultSelected isDisabled size="xl">
      Disabled
    </Checkbox>
  </div>
);

export const Sizes = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Checkbox defaultSelected size="xs">
      mini
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="sm">
      small
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="md">
      medium
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="lg">
      large
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="xl">
      xlarge
    </Checkbox>
  </div>
);

export const Colors = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Checkbox defaultSelected color="primary">
      Primary
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="secondary">
      Secondary
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="success">
      Success
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="warning">
      Warning
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="error">
      Error
    </Checkbox>
  </div>
);

export const LabelColors = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Checkbox defaultSelected color="primary" labelColor="primary">
      Primary
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="secondary" labelColor="secondary">
      Secondary
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="success" labelColor="success">
      Success
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="warning" labelColor="warning">
      Warning
    </Checkbox>
    <br />
    <Checkbox defaultSelected color="error" labelColor="error">
      Error
    </Checkbox>
  </div>
);

export const Rounded = () => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <Checkbox defaultSelected isRounded color="primary">
      Primary
    </Checkbox>
    <br />
    <Checkbox defaultSelected isRounded color="secondary">
      Secondary
    </Checkbox>
    <br />
    <Checkbox defaultSelected isRounded color="success">
      Success
    </Checkbox>
    <br />
    <Checkbox defaultSelected isRounded color="warning">
      Warning
    </Checkbox>
    <br />
    <Checkbox defaultSelected isRounded color="error">
      Error
    </Checkbox>
  </div>
);

export const Indeterminate = () => {
  return (
    <Checkbox defaultSelected isIndeterminate color="primary" size="lg">
      Option
    </Checkbox>
  );
};

export const LineThrough = () => {
  return (
    <Checkbox defaultSelected lineThrough color="primary" size="lg">
      Option
    </Checkbox>
  );
};

export const Controlled = () => {
  const [selected, setSelected] = React.useState<boolean>(true);

  const [groupSelected, setGroupSelected] = React.useState<string[]>(["buenos-aires", "sydney"]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("CheckboxGroup ", groupSelected);
  }, [groupSelected]);

  return (
    <div style={{display: "flex", flexDirection: "row", gap: 200}}>
      <Checkbox color="success" isSelected={selected} onChange={setSelected}>
        Subscribe (controlled)
      </Checkbox>
      <Checkbox.Group
        color="warning"
        label="Select cities"
        labelColor="primary"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <Checkbox color="primary" value="buenos-aires">
          Buenos Aires
        </Checkbox>
        <Checkbox labelColor="warning" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox labelColor="error" value="london">
          London
        </Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </Checkbox.Group>
    </div>
  );
};

export const NoAnimated = () => {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Checkbox defaultSelected disableAnimation={true} size="md">
        Option
      </Checkbox>
      <br />
      <Checkbox defaultSelected lineThrough disableAnimation={true} size="md">
        Option
      </Checkbox>
    </div>
  );
};

export const Group = () => {
  // eslint-disable-next-line no-console
  const handleGroupChange = (value: string[]) => console.log(value);

  return (
    <Checkbox.Group
      color="warning"
      defaultValue={["buenos-aires"]}
      label="Select cities"
      labelColor="primary"
      onChange={handleGroupChange}
    >
      <Checkbox color="primary" value="buenos-aires">
        Buenos Aires
      </Checkbox>
      <Checkbox labelColor="warning" value="sydney">
        Sydney
      </Checkbox>
      <Checkbox isDisabled labelColor="error" value="london">
        London
      </Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </Checkbox.Group>
  );
};

export const GroupRow = () => (
  <Checkbox.Group
    color="warning"
    defaultValue={["1"]}
    label="Select cities"
    orientation="horizontal"
  >
    <Checkbox color="primary" value="1">
      Buenos Aires
    </Checkbox>
    <Checkbox value="2">Sydney</Checkbox>
    <Checkbox value="3">London</Checkbox>
    <Checkbox value="4">Tokyo</Checkbox>
  </Checkbox.Group>
);
