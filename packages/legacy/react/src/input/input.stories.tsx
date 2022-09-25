import React, {useEffect, useMemo} from "react";
import {Meta} from "@storybook/react";

import useInput from "../use-input";
import {Text, Spacer, Button, Grid} from "../index";
import {Lock, Unlock, User, Activity, Notification, Sun, Moon} from "../utils/icons";
import useTheme from "../use-theme";

import Input from "./index";

export default {
  title: "General/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => <Input label="Name" placeholder="Next UI" />;

export const FullWidth = () => <Input placeholder="Next UI" width="100%" />;

export const Password = () => {
  const theme = useTheme();

  return (
    <>
      <Spacer y={1} />
      <Input.Password initialValue="nextui123" labelPlaceholder="Password" />
      <Spacer y={1.5} />
      <Input.Password
        hiddenIcon={<Lock fill="currentColor" theme={theme} />}
        labelPlaceholder="Custom icon"
        visibleIcon={<Unlock fill="currentColor" theme={theme} />}
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
        contentLeft={<User fill="currentColor" theme={theme} />}
        labelPlaceholder="Icon left"
      />
      <Spacer y={1.5} />
      <Input
        clearable
        contentRight={<Activity fill="currentColor" theme={theme} />}
        labelPlaceholder="Icon right"
      />
      <Spacer y={1.5} />
      <Input
        clearable
        contentRight={<Notification fill="currentColor" theme={theme} />}
        labelPlaceholder="Icon left"
        status="success"
      />
      <Spacer y={1.5} />
      <Input
        clearable
        underlined
        color="warning"
        contentRight={<Sun filled fill="currentColor" theme={theme} />}
        labelPlaceholder="Icon left"
        status="warning"
      />
      <Spacer y={1.5} />
      <Input
        bordered
        clearable
        color="secondary"
        contentRight={<Moon filled fill="currentColor" theme={theme} />}
        labelPlaceholder="Icon left"
        status="secondary"
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
    <Input placeholder="Mini" size="xs" />
    <Spacer y={0.5} />
    <Input placeholder="Small" size="sm" />
    <Spacer y={0.5} />
    <Input placeholder="Medium" size="md" />
    <Spacer y={0.5} />
    <Input placeholder="Large" size="lg" />
    <Spacer y={0.5} />
    <Input placeholder="xLarge" size="xl" />
    <Spacer y={0.5} />
    <Input placeholder="Custom" width="50%" />
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
    <Input labelPlaceholder="Primary" shadow={false} status="primary" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Secondary" shadow={false} status="secondary" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Success" shadow={false} status="success" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Warning" shadow={false} status="warning" />
    <Spacer y={1.5} />
    <Input labelPlaceholder="Error" shadow={false} status="error" />
  </>
);

export const NoAnimated = () => (
  <>
    <Spacer y={1.5} />
    <Input animated={false} labelPlaceholder="Default" />
    <Spacer y={1.5} />
    <Input underlined animated={false} color="primary" labelPlaceholder="Primary" />
    <Spacer y={1.5} />
    <Input animated={false} labelPlaceholder="Secondary" status="secondary" />
    <Spacer y={1.5} />
    <Input animated={false} labelPlaceholder="Success" status="success" />
    <Spacer y={1.5} />
    <Input animated={false} labelPlaceholder="Warning" status="warning" />
    <Spacer y={1.5} />
    <Input animated={false} labelPlaceholder="Error" status="error" />
  </>
);

export const Bordered = () => (
  <>
    <Spacer y={1.5} />
    <Input bordered color="default" labelPlaceholder="Default" />
    <Spacer y={1.5} />
    <Input bordered color="primary" labelPlaceholder="Primary" />
    <Spacer y={1.5} />
    <Input bordered color="secondary" labelPlaceholder="Secondary" />
    <Spacer y={1.5} />
    <Input bordered color="success" labelPlaceholder="Success" />
    <Spacer y={1.5} />
    <Input bordered color="warning" labelPlaceholder="Warning" />
    <Spacer y={1.5} />
    <Input bordered color="error" labelPlaceholder="Error" />
  </>
);

export const Underlined = () => (
  <>
    <Spacer y={1.5} />
    <Input underlined color="default" labelPlaceholder="Default" />
    <Spacer y={1.5} />
    <Input underlined color="primary" labelPlaceholder="Primary" />
    <Spacer y={1.5} />
    <Input underlined color="secondary" labelPlaceholder="Secondary" />
    <Spacer y={1.5} />
    <Input underlined color="success" labelPlaceholder="Success" />
    <Spacer y={1.5} />
    <Input underlined color="warning" labelPlaceholder="Warning" />
    <Spacer y={1.5} />
    <Input underlined color="error" labelPlaceholder="Error" />
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
    <Input color="primary" labelPlaceholder="Label placeholder" />
    <Spacer y={1.5} />
    <Input labelLeft="username" placeholder="Next UI" />
    <Spacer y={1.5} />
    <Input labelRight=".com" placeholder="https://github/nextui-org/nextui" status="error" />
    <Spacer y={1.5} />
    <Input underlined labelLeft="username" placeholder="Next UI" status="primary" />
    <Spacer y={1.5} />
    <Input bordered labelRight=".com" placeholder="https://github/nextui-org/nextui" />
    <Spacer y={1.5} />
    <Input bordered labelLeft="https://" placeholder="github/nextui-org/nextui" />
    <Spacer y={1.5} />
    <Input bordered labelLeft="https://" labelRight=".org" placeholder="nextui" />
  </>
);

export const WithHelperText = () => {
  const {value, reset, bindings} = useInput("");

  const validateEmail = (value: string) => {
    return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  const helperText = useMemo(() => {
    if (!value) return "";

    return !validateEmail(value) ? "Enter a valid email" : "Correct email";
  }, [value]);

  const helperColor = useMemo(() => {
    if (!value) return "default";

    return !validateEmail(value) ? "error" : "success";
  }, [value]);

  return (
    <>
      <Input
        {...bindings}
        clearable
        helperColor={helperColor}
        helperText={helperText}
        label="Email"
        placeholder="With regex validation"
        shadow={false}
        status={helperColor}
        type="email"
        onClearClick={reset}
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
        helperColor="error"
        helperText="Required"
        label="Error"
        placeholder="Enter something"
        status="error"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="success"
        helperText="Excelent username"
        initialValue="getnextui"
        label="Username"
        placeholder="Enter your username"
        type="test"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="error"
        helperText="Required"
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <Spacer y={1.4} />
      <Input
        clearable
        color="warning"
        helperText="Insecure password"
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <Spacer y={1.4} />
      <Input.Password
        clearable
        color="warning"
        helperText="Insecure password"
        initialValue="123"
        label="Password"
        placeholder="Enter your password with eye"
        type="password"
      />
    </>
  );
};

export const WithUseInput = () => {
  const {value, setValue, reset, bindings} = useInput("NextUI");

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
      <Input ref={inputRef} initialValue="Hello" onChange={(e) => console.log(e.target.value)} />
      <Spacer y={0.5} />
      <Button auto color="secondary" size="sm" onClick={onClick}>
        Set value
      </Button>
    </>
  );
};
