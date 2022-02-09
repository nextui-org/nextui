import React, { useEffect, useMemo } from 'react';
import { Meta } from '@storybook/react';
import Input from './index';
import useInput from '../use-input';
import { Text, Spacer, Button, Grid } from '../index';
import {
  Lock,
  Unlock,
  User,
  Activity,
  Notification,
  Sun,
  Moon
} from '../utils/icons';
import useTheme from '../use-theme';

export default {
  title: 'General/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Story />
      </div>
    )
  ]
} as Meta;

export const Default = () => <Input label="Name" placeholder="Next UI" />;

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
        contentLeft={<User theme={theme} fill="currentColor" />}
      />
      <Spacer y={1.5} />
      <Input
        clearable
        labelPlaceholder="Icon right"
        contentRight={<Activity theme={theme} fill="currentColor" />}
      />
      <Spacer y={1.5} />
      <Input
        clearable
        status="success"
        labelPlaceholder="Icon left"
        contentRight={<Notification theme={theme} fill="currentColor" />}
      />
      <Spacer y={1.5} />
      <Input
        clearable
        underlined
        color="warning"
        status="warning"
        labelPlaceholder="Icon left"
        contentRight={<Sun theme={theme} filled fill="currentColor" />}
      />
      <Spacer y={1.5} />
      <Input
        clearable
        bordered
        color="secondary"
        status="secondary"
        labelPlaceholder="Icon left"
        contentRight={<Moon theme={theme} filled fill="currentColor" />}
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
    <Input size="xs" placeholder="Mini" />
    <Spacer y={0.5} />
    <Input size="sm" placeholder="Small" />
    <Spacer y={0.5} />
    <Input size="md" placeholder="Medium" />
    <Spacer y={0.5} />
    <Input size="lg" placeholder="Large" />
    <Spacer y={0.5} />
    <Input size="xl" placeholder="xLarge" />
    <Spacer y={0.5} />
    <Input width="50%" placeholder="Custom" />
  </>
);

export const Status = () => (
  <>
    <Spacer y={1.5} />
    <Input labelPlaceholder="Primary" status="primary" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Secondary" status="secondary" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Success" status="success" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Warning" status="warning" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Error" status="error" />
  </>
);

export const NoShadow = () => (
  <>
    <Spacer y={1.5} />
    <Input labelPlaceholder="Default" shadow={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Primary" status="primary" shadow={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Secondary" status="secondary" shadow={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Success" status="success" shadow={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Warning" status="warning" shadow={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Error" status="error" shadow={false} />
  </>
);

export const NoAnimated = () => (
  <>
    <Spacer y={1.5} />
    <Input labelPlaceholder="Default" animated={false} />
    <Spacer y={1.5} />
    <Input
      underlined
      labelPlaceholder="Primary"
      animated={false}
      color="primary"
    />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Secondary" status="secondary" animated={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Success" status="success" animated={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Warning" status="warning" animated={false} />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Error" status="error" animated={false} />
  </>
);

export const Bordered = () => (
  <>
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Default" color="default" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Primary" color="primary" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Secondary" color="secondary" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Success" color="success" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Warning" color="warning" />
    <Spacer y={1.5} />
    <Input bordered labelPlaceholder="Error" color="error" />
  </>
);

export const Underlined = () => (
  <>
    <Spacer y={1.5} />
    <Input underlined labelPlaceholder="Default" color="default" />
    <Spacer y={1.5} />
    <Input underlined labelPlaceholder="Primary" color="primary" />
    <Spacer y={1.5} />
    <Input underlined labelPlaceholder="Secondary" color="secondary" />
    <Spacer y={1.5} />
    <Input underlined labelPlaceholder="Success" color="success" />
    <Spacer y={1.5} />
    <Input underlined labelPlaceholder="Warning" color="warning" />
    <Spacer y={1.5} />
    <Input underlined labelPlaceholder="Error" color="error" />
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

export const InputTypes = () => (
  <Grid.Container gap={1}>
    <Grid>
      <Input label="Text" type="text" />
    </Grid>
    <Grid>
      <Input label="Password" type="password" />
    </Grid>
    <Grid>
      <Input label="Search" type="search" />
    </Grid>
    <Grid>
      <Input label="Number" type="number" />
    </Grid>
    <Grid>
      <Input label="Url" type="url" />
    </Grid>
    <Grid>
      <Input label="Time" type="time" />
    </Grid>
    <Grid>
      <Input label="Date" type="date" />
    </Grid>
  </Grid.Container>
);

export const WithLabels = () => (
  <>
    <Input label="Name" placeholder="Enter your name" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Label placeholder" color="primary" />
    <Spacer y={1.5} />
    <Input labelLeft="username" placeholder="Next UI" />
    <Spacer y={1.5} />
    <Input
      status="error"
      labelRight=".com"
      placeholder="https://github/nextui-org/nextui"
    />
    <Spacer y={1.5} />
    <Input
      status="primary"
      underlined
      labelLeft="username"
      placeholder="Next UI"
    />
    <Spacer y={1.5} />
    <Input
      bordered
      labelRight=".com"
      placeholder="https://github/nextui-org/nextui"
    />
    <Spacer y={1.5} />
    <Input
      bordered
      labelLeft="https://"
      placeholder="github/nextui-org/nextui"
    />
    <Spacer y={1.5} />
    <Input
      bordered
      labelLeft="https://"
      labelRight=".org"
      placeholder="nextui"
    />
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
        shadow={false}
        onClearClick={reset}
        helperText={helperText}
        helperColor={helperColor}
        status={helperColor}
        type="email"
        label="Email"
        placeholder="With regex validation"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        helperText="Please enter your name"
        label="Name"
        placeholder="Enter your name"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="error"
        label="Error"
        status="error"
        helperText="Required"
        helperColor="error"
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
      <Button auto color="secondary" size="sm" onClick={onClick}>
        Set value
      </Button>
    </>
  );
};
