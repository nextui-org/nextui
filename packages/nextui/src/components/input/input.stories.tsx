import React, { useEffect, useMemo } from 'react';
import { Meta } from '@storybook/react';
import Input from './index';
import useInput from './use-input';
import { Text, Spacer, Button, Grid } from '../index';
import { Lock, Unlock, User, Activity } from '../../utils/icons';
import { useTheme } from '../../hooks';

export default {
  title: 'General/Input',
  component: Input,
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

export const Default = () => <Input placeholder="Next UI" />;

export const FullWidth = () => <Input placeholder="Next UI" width="100%" />;

export const Password = () => {
  const theme = useTheme();
  return (
    <>
      <Spacer y={1} />
      <Input.Password labelPlaceholder="Password" initialValue="nextui123" />
      <Spacer y={1.5} />
      <Input.Password
        labelPlaceholder="Custom icon"
        visibleIcon={<Unlock theme={theme} fill="currentColor" />}
        hiddenIcon={<Lock theme={theme} fill="currentColor" />}
      />
    </>
  );
};

export const WithIcons = () => {
  const theme = useTheme();
  return (
    <>
      <Spacer y={1} />
      <Input
        clearable
        labelPlaceholder="Icon left"
        icon={<User theme={theme} fill="currentColor" />}
      />
      <Spacer y={1.5} />
      <Input
        clearable
        labelPlaceholder="Icon right"
        iconRight={<Activity theme={theme} fill="currentColor" />}
      />
    </>
  );
};

export const Clearable = () => (
  <>
    <Spacer y={1} />
    <Input clearable labelPlaceholder="Next UI" />
  </>
);

export const ReadOnly = () => (
  <>
    <Input disabled placeholder="Disabled" />
    <Spacer y={0.5} />
    <Input readOnly initialValue="readOnly" />
  </>
);

export const Sizes = () => (
  <>
    <Input size="mini" placeholder="Mini" />
    <Spacer y={0.5} />
    <Input size="small" placeholder="Small" />
    <Spacer y={0.5} />
    <Input size="medium" placeholder="Medium" />
    <Spacer y={0.5} />
    <Input size="large" placeholder="Large" />
    <Spacer y={0.5} />
    <Input size="xlarge" placeholder="xLarge" />
    <Spacer y={0.5} />
    <Input width="50%" placeholder="Custom" />
  </>
);

export const Bordered = () => (
  <>
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Enter Email" color="default" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Enter Email" color="primary" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Enter Email" color="secondary" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Enter Email" color="success" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Enter Email" color="warning" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Enter Email" color="error" />
  </>
);

export const Rounded = () => (
  <>
    <Spacer y={1.5} />
    <Input rounded labelPlaceholder="Enter Email" />
    <Spacer y={1.5} />
    <Input rounded labelPlaceholder="Enter Email" />
    <Spacer y={1.5} />
    <Input rounded labelPlaceholder="Enter Email" />
    <Spacer y={1.5} />
    <Input rounded labelPlaceholder="Enter Email" />
    <Spacer y={1.5} />
    <Input rounded labelPlaceholder="Enter Email" />
  </>
);

export const WithLabels = () => (
  <>
    <Input label="Name" placeholder="Enter your name" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Label placeholder" color="primary" />
    <Spacer y={1.5} />
    <Input labelLeft="username" placeholder="Next UI" />
    <Spacer y={1.5} />
    <Input labelRight=".com" placeholder="https://github/nextui-org/nextui" />
  </>
);

export const WithHelperText = () => {
  const { value, reset, bindings } = useInput('');

  const validateEmail = (value: string) => {
    return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  const helperText = useMemo(() => {
    if (!value) return '';
    return !validateEmail(value) ? 'Enter a valid email' : 'Correct email';
  }, [value]);

  const helperColor = useMemo(() => {
    if (!value) return 'default';
    return !validateEmail(value) ? 'error' : 'success';
  }, [value]);

  return (
    <>
      <Input
        {...bindings}
        clearable
        onClearClick={reset}
        color={helperColor}
        helperText={helperText}
        type="email"
        label="Email"
        placeholder="With regex validation"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="error"
        helperText="Required"
        label="Error"
        placeholder="Enter something"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="success"
        initialValue="getnextui"
        helperText="Excelent username"
        type="test"
        label="Username"
        placeholder="Enter your username"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="error"
        helperText="Required"
        type="email"
        label="Email"
        placeholder="Enter your email"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="warning"
        helperText="Insecure password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />
      <Spacer y={1.4} />
      <Input.Password
        clearable
        color="warning"
        initialValue="123"
        helperText="Insecure password"
        type="password"
        label="Password"
        placeholder="Enter your password with eye"
      />
    </>
  );
};

export const WithUseInput = () => {
  const { value, setValue, reset, bindings } = useInput('NextUI');
  useEffect(() => console.log(value), [value]);
  return (
    <>
      <Input {...bindings} />
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (inputRef.current) inputRef.current.value = Math.random().toString(32);
  };
  return (
    <>
      <Text>Update component in an uncontrolled way.</Text>
      <Input
        ref={inputRef}
        initialValue="Hello"
        onChange={(e) => console.log(e.target.value)}
      />
      <Spacer y={0.5} />
      <Button auto color="secondary" size="small" onClick={onClick}>
        set value
      </Button>
    </>
  );
};
