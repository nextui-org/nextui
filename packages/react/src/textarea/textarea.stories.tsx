import React, {useEffect} from "react";
import {Meta} from "@storybook/react";

import useInput from "../use-input";
import Spacer from "../spacer";
import Grid from "../grid";
import Button from "../button";
import Text from "../text";

import Textarea from "./index";

export default {
  title: "General/Textarea",
  component: Textarea,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => (
  <>
    <Textarea label="Write your thoughts" placeholder="Enter your amazing thoughts." />
    <Spacer y={1.5} />
    <Textarea labelPlaceholder="Write your thoughts" />
  </>
);

export const Rows = () => (
  <>
    <Textarea label="Write your thoughts" placeholder="Enter your amazing thoughts." />
  </>
);

export const labelPlaceholder = () => (
  <>
    <Textarea label="Write your thoughts" placeholder="Enter your amazing thoughts." />
    <Spacer y={2} />
    <Textarea labelPlaceholder="Write your thoughts" />
  </>
);

export const Types = () => (
  <>
    <Textarea label="Default" placeholder="Default Textarea" />
    <Spacer y={2} />
    <Textarea underlined color="primary" labelPlaceholder="Underlined Textarea" />
    <Spacer y={2} />
    <Textarea bordered color="secondary" labelPlaceholder="Bordered Textarea" />
  </>
);

export const Disabled = () => {
  return (
    <>
      <Textarea disabled helperText="Disabled" label="Name" placeholder="Enter your name" />
    </>
  );
};

export const ReadOnly = () => {
  return (
    <>
      <Textarea
        readOnly
        initialValue="Almost before we knew it, we had left the ground."
        label="Read only Text"
      />
    </>
  );
};

export const WithHelperText = () => {
  return (
    <>
      <Textarea helperText="Please enter your name" label="Name" placeholder="Enter your name" />
      <Spacer y={1.4} />
      <Textarea
        helperColor="error"
        helperText="Required"
        label="Error"
        placeholder="Enter something"
        status="error"
      />
      <Spacer y={1.4} />
      <Textarea
        helperColor="success"
        helperText="Excelent username"
        initialValue="getnextui"
        label="Username"
        placeholder="Enter your username"
        status="success"
      />
      <Spacer y={1.4} />
      <Textarea
        color="error"
        helperColor="error"
        helperText="Required"
        label="Email"
        placeholder="Enter your email"
        status="error"
      />
      <Spacer y={1.4} />
      <Textarea
        helperColor="warning"
        helperText="Insecure password"
        label="Password"
        placeholder="Enter your password"
        status="warning"
      />
      <Spacer y={1.4} />
      <Textarea
        helperColor="warning"
        helperText="Insecure password"
        initialValue="123"
        label="Password"
        placeholder="Enter your password"
        status="warning"
      />
    </>
  );
};

export const WithUseInput = () => {
  const {value, setValue, reset, bindings} = useInput("NextUI");

  useEffect(() => console.log(value), [value]);

  return (
    <>
      <Textarea {...bindings} />
      <Spacer y={0.5} />
      <Grid.Container gap={0.5}>
        <Grid>
          <Button
            auto
            color="primary"
            size="sm"
            onClick={() => setValue(Math.random().toString(32))}
          >
            Set value
          </Button>
        </Grid>
        <Grid>
          <Button auto flat size="sm" onClick={() => reset()}>
            Reset value
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};

export const Uncontrolled = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const onClick = () => {
    if (textareaRef.current) textareaRef.current.value = Math.random().toString(32);
  };

  return (
    <>
      <Text>Update component in an uncontrolled way.</Text>
      <Grid.Container direction="column" gap={1}>
        <Textarea
          ref={textareaRef}
          initialValue="Hello"
          onChange={(e) => console.log(e.target.value)}
        />
        <Spacer y={0.5} />
        <Grid>
          <Button auto color="secondary" size="sm" onClick={onClick}>
            Set value
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};
