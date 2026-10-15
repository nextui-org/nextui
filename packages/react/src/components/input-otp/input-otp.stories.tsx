import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {Form} from "../form";
import {Label} from "../label";
import {Link} from "../link";
import {Spinner} from "../spinner";

import {InputOTP, REGEXP_ONLY_CHARS} from "./index";

const meta: Meta<typeof InputOTP> = {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    maxLength: {
      control: "number",
    },
  },
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  title: "Components/Forms/InputOTP",
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="otp-example-1">Verify account</Label>
        <p className="text-sm text-muted">We&apos;ve sent a code to a****@gmail.com</p>
      </div>
      <InputOTP id="otp-example-1" {...args} maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
      <div className="flex items-center gap-[5px] px-1 pt-1">
        <p className="text-sm text-muted">Didn&apos;t receive a code?</p>
        <Link className="text-foreground" underline="always">
          Resend
        </Link>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="otp-example-2">Primary variant</Label>
        <InputOTP id="otp-example-2" maxLength={6} variant="primary">
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="otp-example-3">Secondary variant</Label>
        <InputOTP id="otp-example-3" maxLength={6} variant="secondary">
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </div>
    </div>
  ),
};

export const FourDigits: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <Label htmlFor="otp-example-4">Enter PIN</Label>
      <InputOTP id="otp-example-4" {...args} maxLength={4}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP.Group>
      </InputOTP>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <Label isDisabled htmlFor="otp-disabled">
        Verify account
      </Label>
      <Description>Code verification is currently disabled</Description>
      <InputOTP {...args} isDisabled id="otp-disabled" maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
    </div>
  ),
};

export const WithPattern: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <Label htmlFor="otp-example-5">Enter code (letters only)</Label>
      <Description>Only alphabetic characters are allowed</Description>
      <InputOTP id="otp-example-5" {...args} maxLength={6} pattern={REGEXP_ONLY_CHARS}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");

    return (
      <div className="flex w-[280px] flex-col gap-2">
        <Label htmlFor="otp-example-6">Verify account</Label>
        <InputOTP id="otp-example-6" {...args} maxLength={6} value={value} onChange={setValue}>
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
        <Description>
          {value.length > 0 ? (
            <>
              Value: {value} ({value.length}/6) •{" "}
              <button
                className="font-medium text-foreground underline"
                onClick={() => setValue("")}
              >
                Clear
              </button>
            </>
          ) : (
            "Enter a 6-digit code"
          )}
        </Description>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [isInvalid, setIsInvalid] = React.useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const code = formData.get("code");

      if (code !== "123456") {
        setIsInvalid(true);

        return;
      }

      setIsInvalid(false);
      setValue("");

      alert("Code verified successfully!");
    };

    const handleChange = (val: string) => {
      setValue(val);
      setIsInvalid(false);
    };

    return (
      <div className="flex w-[280px] flex-col gap-2">
        <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <Label htmlFor="otp-example-7">Verify account</Label>
          <Description>Hint: The code is 123456</Description>
          <InputOTP
            id="otp-example-7"
            {...args}
            aria-describedby={isInvalid ? "code-error" : undefined}
            isInvalid={isInvalid}
            maxLength={6}
            name="code"
            value={value}
            onChange={handleChange}
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
          <span className="field-error" data-visible={isInvalid} id="code-error">
            Invalid code. Please try again.
          </span>
          <Button isDisabled={value.length !== 6} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  },
};

export const OnComplete: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleComplete = (code: string) => {
      setIsComplete(true);
      // eslint-disable-next-line no-console
      console.log("Code complete:", code);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setValue("");
        setIsComplete(false);
      }, 2000);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-2" onSubmit={handleSubmit}>
        <Label htmlFor="otp-example-8">Verify account</Label>
        <InputOTP
          id="otp-example-8"
          {...args}
          maxLength={6}
          value={value}
          onComplete={handleComplete}
          onChange={(val) => {
            setValue(val);
            setIsComplete(false);
          }}
        >
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
        <Button
          className="mt-2 w-full"
          isDisabled={!isComplete}
          isPending={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? (
            <>
              <Spinner color="current" size="sm" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
      </Form>
    );
  },
};

export const FormExample: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (value.length !== 6) {
        setError("Please enter all 6 digits");

        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        if (value === "123456") {
          // eslint-disable-next-line no-console
          console.log("Code verified successfully!");
          setValue("");
        } else {
          setError("Invalid code. Please try again.");
        }
        setIsSubmitting(false);
      }, 1500);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="otp-example-9">Two-factor authentication</Label>
          <Description>Enter the 6-digit code from your authenticator app</Description>
          <InputOTP
            id="otp-example-9"
            {...args}
            isInvalid={!!error}
            maxLength={6}
            value={value}
            onChange={(val) => {
              setValue(val);
              setError("");
            }}
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
          <span className="field-error" data-visible={!!error} id="code-error">
            {error}
          </span>
        </div>
        <Button
          className="w-full"
          isDisabled={value.length !== 6}
          isPending={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? (
            <>
              <Spinner color="current" size="sm" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
        <div className="flex items-center justify-center gap-1">
          <p className="text-sm text-muted">Having trouble?</p>
          <Link className="text-sm text-foreground" underline="always">
            Use backup code
          </Link>
        </div>
      </Form>
    );
  },
};
