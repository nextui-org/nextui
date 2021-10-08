import React, { useEffect } from 'react';
import { Meta } from '@storybook/react';
import useInput from '../use-input';
import Textarea from './index';
import Spacer from '../spacer';
import Grid from '../grid';
import Button from '../button';
import Text from '../text';

export default {
  title: 'General/Textarea',
  component: Textarea,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => (
  <>
    <Textarea
      label="Write your thoughts"
      placeholder="Enter your amazing thoughts."
    />
    <Spacer y={1.5} />
    <Textarea labelPlaceholder="Write your thoughts" />
  </>
);

export const Rows = () => (
  <>
    <Textarea
      label="Write your thoughts"
      placeholder="Enter your amazing thoughts."
    />
  </>
);

export const Types = () => (
  <>
    <Textarea label="Default" placeholder="Default Textarea" />
    <Spacer y={2} />
    <Textarea
      underlined
      color="primary"
      labelPlaceholder="Underlined Textarea"
    />
    <Spacer y={2} />
    <Textarea bordered color="secondary" labelPlaceholder="Bordered Textarea" />
  </>
);

export const Disabled = () => {
  return (
    <>
      <Textarea
        disabled
        label="Name"
        helperText="Disabled"
        placeholder="Enter your name"
      />
    </>
  );
};

export const ReadOnly = () => {
  return (
    <>
      <Textarea
        readOnly
        label="Read only Text"
        initialValue="Almost before we knew it, we had left the ground."
      />
    </>
  );
};

export const WithHelperText = () => {
  return (
    <>
      <Textarea
        label="Name"
        helperText="Please enter your name"
        placeholder="Enter your name"
      />
      <Spacer y={1.4} />
      <Textarea
        status="error"
        helperColor="error"
        helperText="Required"
        label="Error"
        placeholder="Enter something"
      />
      <Spacer y={1.4} />
      <Textarea
        status="success"
        helperColor="success"
        initialValue="getnextui"
        helperText="Excelent username"
        label="Username"
        placeholder="Enter your username"
      />
      <Spacer y={1.4} />
      <Textarea
        color="error"
        status="error"
        helperColor="error"
        helperText="Required"
        label="Email"
        placeholder="Enter your email"
      />
      <Spacer y={1.4} />
      <Textarea
        status="warning"
        helperColor="warning"
        helperText="Insecure password"
        label="Password"
        placeholder="Enter your password"
      />
      <Spacer y={1.4} />
      <Textarea
        helperColor="warning"
        status="warning"
        initialValue="123"
        helperText="Insecure password"
        label="Password"
        placeholder="Enter your password"
      />
    </>
  );
};

export const WithUseInput = () => {
  const { value, setValue, reset, bindings } = useInput('NextUI');
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
            size="small"
            onClick={() => setValue(Math.random().toString(32))}
          >
            Set value
          </Button>
        </Grid>
        <Grid>
          <Button auto flat size="small" onClick={() => reset()}>
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
    if (textareaRef.current)
      textareaRef.current.value = Math.random().toString(32);
  };
  return (
    <>
      <Text>Update component in an uncontrolled way.</Text>
      <Grid.Container gap={1} direction="column">
        <Textarea
          ref={textareaRef}
          initialValue="Hello"
          onChange={(e) => console.log(e.target.value)}
        />
        <Spacer y={0.5} />
        <Grid>
          <Button auto color="secondary" size="small" onClick={onClick}>
            Set value
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};
