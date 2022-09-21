import React from "react";
import {Meta} from "@storybook/react";

import {Button, Spacer} from "../index";

import Radio from "./index";

export default {
  title: "Inputs/Radio",
  component: Radio,
  onChange: {action: "changed"},
} as Meta;

export const Default = () => (
  <Radio.Group label="Options">
    <Radio value="A">Option A</Radio>
    <Radio value="B">Option B</Radio>
    <Radio value="C">Option C</Radio>
    <Radio value="D">Option D</Radio>
  </Radio.Group>
);

const handleSubmit = (e: any) => {
  e.preventDefault();
  alert("Submitted!");
};

export const Required = () => (
  <form onSubmit={handleSubmit}>
    <Radio.Group isRequired label="Options">
      <Radio value="A">Option A</Radio>
      <Radio value="B">Option B</Radio>
      <Radio value="C">Option C</Radio>
      <Radio value="D">Option D</Radio>
    </Radio.Group>
    <Spacer y={1} />
    <Button type="submit">Submit</Button>
  </form>
);

export const Disabled = () => (
  <Radio.Group isDisabled defaultValue="A" label="Options">
    <Radio description="Description for Option A" value="A">
      Option A
    </Radio>
    <Radio value="B">Option B</Radio>
    <Radio value="C">Option C</Radio>
    <Radio value="D">Option D</Radio>
  </Radio.Group>
);

export const Sizes = () => {
  return (
    <div style={{display: "flex", flexDirection: "row", gap: 200}}>
      <Radio.Group defaultValue="md" label="Sizes">
        <Radio size="xs" value="xs">
          mini
        </Radio>
        <Radio size="sm" value="sm">
          small
        </Radio>
        <Radio size="md" value="md">
          medium
        </Radio>
        <Radio size="lg" value="lg">
          large
        </Radio>
        <Radio size="xl" value="xl">
          xlarge
        </Radio>
      </Radio.Group>
      <Radio.Group defaultValue="md" label="Sizes">
        <Radio description="Description for Option mini" size="xs" value="xs">
          mini
        </Radio>
        <Radio description="Description for Option small" size="sm" value="sm">
          small
        </Radio>
        <Radio description="Description for Option medium" size="md" value="md">
          medium
        </Radio>
        <Radio description="Description for Option large" size="lg" value="lg">
          large
        </Radio>
        <Radio description="Description for Option xlarge" size="xl" value="xl">
          xlarge
        </Radio>
      </Radio.Group>
    </div>
  );
};

export const Colors = () => {
  return (
    <Radio.Group defaultValue="primary" label="Colors">
      <Radio color="primary" value="primary">
        primary
      </Radio>
      <Radio color="secondary" value="secondary">
        secondary
      </Radio>
      <Radio color="success" value="success">
        success
      </Radio>
      <Radio color="warning" value="warning">
        warning
      </Radio>
      <Radio color="error" value="error">
        error
      </Radio>
    </Radio.Group>
  );
};

export const LabelColors = () => {
  return (
    <Radio.Group defaultValue="primary" label="Label colors">
      <Radio color="primary" labelColor="primary" value="primary">
        primary
      </Radio>
      <Radio color="secondary" labelColor="secondary" value="secondary">
        secondary
      </Radio>
      <Radio color="success" labelColor="success" value="success">
        success
      </Radio>
      <Radio color="warning" labelColor="warning" value="warning">
        warning
      </Radio>
      <Radio color="error" labelColor="error" value="error">
        error
      </Radio>
    </Radio.Group>
  );
};

export const Squared = () => (
  <Radio.Group defaultValue="A" label="Options">
    <Radio isSquared value="A">
      Option A
    </Radio>
    <Radio isSquared value="B">
      Option B
    </Radio>
    <Radio isSquared value="C">
      Option C
    </Radio>
    <Radio isSquared value="D">
      Option D
    </Radio>
  </Radio.Group>
);

export const Description = () => (
  <Radio.Group defaultValue="A" label="Options">
    <Radio description="Description for Option A" value="A">
      Option A
    </Radio>
    <Radio description="Description for Option B" value="B">
      Option B
    </Radio>
    <Radio description="Description for Option C" value="C">
      Option C
    </Radio>
    <Radio description="Description for Option D" value="D">
      Option D
    </Radio>
  </Radio.Group>
);

export const Invalid = () => (
  <Radio.Group defaultValue="A" label="Options" validationState="invalid">
    <Radio description="Description for Option A" value="A">
      Option A
    </Radio>
    <Radio description="Description for Option B" value="B">
      Option B
    </Radio>
    <Radio description="Description for Option C" value="C">
      Option C
    </Radio>
    <Radio description="Description for Option D" value="D">
      Option D
    </Radio>
  </Radio.Group>
);

export const Row = () => (
  <div style={{display: "flex", flexDirection: "column", gap: 100}}>
    <Radio.Group defaultValue="A" label="Options" orientation="horizontal">
      <Radio value="A">Option A</Radio>
      <Radio value="B">Option B</Radio>
      <Radio value="C">Option C</Radio>
      <Radio value="D">Option D</Radio>
    </Radio.Group>
    <Radio.Group defaultValue="A" label="Options" orientation="horizontal">
      <Radio description="Description for Option A" value="A">
        Option A
      </Radio>
      <Radio description="Description for Option B" value="B">
        Option B
      </Radio>
      <Radio description="Description for Option C" value="C">
        Option C
      </Radio>
      <Radio description="Description for Option D" value="D">
        Option D
      </Radio>
    </Radio.Group>
  </div>
);

export const Controlled = () => {
  const [checked, setChecked] = React.useState<string>("london");

  React.useEffect(() => {
    console.log("checked:", checked);
  }, [checked]);

  return (
    <Radio.Group label="Check cities" value={checked} onChange={setChecked}>
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </Radio.Group>
  );
};

export const DisableAnimation = () => {
  return (
    <Radio.Group defaultValue="A" label="Options">
      <Radio disableAnimation value="A">
        Option A
      </Radio>
      <Radio disableAnimation value="B">
        Option B
      </Radio>
      <Radio disableAnimation value="C">
        Option C
      </Radio>
      <Radio disableAnimation value="D">
        Option D
      </Radio>
    </Radio.Group>
  );
};
