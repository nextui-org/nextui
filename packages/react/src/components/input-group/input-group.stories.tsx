import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {Button} from "../button";
import {Chip} from "../chip";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Kbd} from "../kbd";
import {Label} from "../label";
import {Spinner} from "../spinner";
import {TextField} from "../textfield";
import {Tooltip} from "../tooltip";

import {InputGroup} from "./index";

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/InputGroup",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
      </InputGroup>
    </TextField>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField className="w-[280px]" name="primary">
        <Label>Primary variant</Label>
        <InputGroup variant="primary">
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField className="w-[280px]" name="secondary">
        <Label>Secondary variant</Label>
        <InputGroup variant="secondary">
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="name@email.com" />
        </InputGroup>
      </TextField>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="email">
        <Label>Email address</Label>
        <InputGroup fullWidth>
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField fullWidth name="password">
        <Label>Password</Label>
        <InputGroup fullWidth>
          <InputGroup.Input placeholder="Enter password" type="password" />
          <InputGroup.Suffix>
            <Icon className="size-4 text-muted" icon="gravity-ui:eye" />
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  ),
};

export const WithPrefixIcon: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
      </InputGroup>
      <Description>We'll never share this with anyone else</Description>
    </TextField>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        <InputGroup.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
        </InputGroup.Suffix>
      </InputGroup>
      <Description>We don't send spam</Description>
    </TextField>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" defaultValue="10" name="price">
      <Label>Set a price</Label>
      <InputGroup>
        <InputGroup.Prefix>$</InputGroup.Prefix>
        <InputGroup.Input className="w-[200px]" type="number" />
        <InputGroup.Suffix>USD</InputGroup.Suffix>
      </InputGroup>
      <Description>What customers would pay</Description>
    </TextField>
  ),
};

export const WithTextPrefix: Story = {
  render: () => (
    <TextField className="w-[280px]" defaultValue="heroui.com" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>https://</InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" />
      </InputGroup>
    </TextField>
  ),
};

export const WithTextSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" defaultValue="heroui" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-[280px]" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithIconPrefixAndTextSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" defaultValue="heroui" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:globe" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithCopySuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" defaultValue="heroui.com" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-[280px]" />
        <InputGroup.Suffix className="pe-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Icon className="size-4" icon="gravity-ui:copy" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithIconPrefixAndCopySuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" defaultValue="heroui.com" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:globe" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" />
        <InputGroup.Suffix className="pe-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Icon className="size-4" icon="gravity-ui:copy" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <TextField className="w-[280px]" name="password">
        <Label>Password</Label>
        <InputGroup>
          <InputGroup.Input
            className="w-[280px]"
            type={isVisible ? "text" : "password"}
            value={isVisible ? "87$2h.3diua" : "••••••••"}
          />
          <InputGroup.Suffix className="pe-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              <Icon
                className="size-4"
                icon={isVisible ? "gravity-ui:eye" : "gravity-ui:eye-slash"}
              />
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    );
  },
};

export const WithLoadingSuffix: Story = {
  render: () => (
    <TextField
      aria-label="Sending status"
      className="w-[280px]"
      defaultValue="Sending..."
      name="status"
    >
      <InputGroup>
        <InputGroup.Input className="w-[280px]" />
        <InputGroup.Suffix>
          <Spinner className="size-4" />
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <TextField aria-label="Command" className="w-[280px]" name="command">
      <InputGroup>
        <InputGroup.Input className="w-[280px]" placeholder="Command" />
        <InputGroup.Suffix className="pe-2">
          <Kbd>
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithBadgeSuffix: Story = {
  render: () => (
    <TextField aria-label="Email address" className="w-[280px]" name="email">
      <InputGroup>
        <InputGroup.Input className="w-[280px]" placeholder="Email address" />
        <InputGroup.Suffix className="pe-2">
          <Chip color="accent" size="md" variant="soft">
            Pro
          </Chip>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isRequired className="w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField isRequired name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-[200px]" placeholder="0" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
        <Description>What customers would pay</Description>
      </TextField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isInvalid isRequired className="w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        </InputGroup>
        <FieldError>Please enter a valid email address</FieldError>
      </TextField>
      <TextField isInvalid isRequired className="w-[280px]" name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-[200px]" placeholder="0" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
        <FieldError>Price must be greater than 0</FieldError>
      </TextField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isDisabled className="w-[280px]" defaultValue="name@email.com" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" />
        </InputGroup>
      </TextField>
      <TextField isDisabled className="w-[280px]" defaultValue="10" name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-[200px]" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  ),
};

export const WithTextArea: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
      if (!value.trim()) return;

      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setValue("");
      }, 1000);
    };

    return (
      <TextField
        fullWidth
        aria-label="Prompt input"
        className="flex w-sm flex-col sm:w-lg"
        name="prompt"
      >
        <InputGroup fullWidth className="flex flex-col gap-2 rounded-3xl py-2">
          <InputGroup.Prefix className="px-3 py-0">
            <Button aria-label="Add context" size="sm" variant="outline">
              <Icon icon="gravity-ui:at" />
              Add Context
            </Button>
          </InputGroup.Prefix>
          <InputGroup.TextArea
            className="w-full resize-none px-3.5 py-0"
            placeholder="Assign tasks or ask anything..."
            rows={5}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <InputGroup.Suffix className="flex w-full items-center gap-1.5 px-3 py-0">
            <Tooltip delay={0}>
              <Button isIconOnly aria-label="Attach file" size="sm" variant="tertiary">
                <Icon icon="gravity-ui:plus" />
              </Button>
              <Tooltip.Content>
                <p className="text-xs">Add a files and more</p>
              </Tooltip.Content>
            </Tooltip>
            <Tooltip delay={0}>
              <Button isIconOnly aria-label="Connect Apps" size="sm" variant="tertiary">
                <Icon icon="gravity-ui:plug-connection" />
              </Button>
              <Tooltip.Content>
                <p className="text-xs">Connect apps</p>
              </Tooltip.Content>
            </Tooltip>
            <div className="ms-auto flex items-center gap-1.5">
              <Tooltip delay={0}>
                <Button isIconOnly aria-label="Voice input" size="sm" variant="ghost">
                  <Icon icon="gravity-ui:microphone" />
                </Button>
                <Tooltip.Content>
                  <p className="text-xs">Voice input</p>
                </Tooltip.Content>
              </Tooltip>
              <Tooltip delay={0}>
                <Button
                  isIconOnly
                  aria-label="Send prompt"
                  isDisabled={!value.trim()}
                  isPending={isSubmitting}
                  onPress={handleSubmit}
                >
                  {({isPending}) =>
                    isPending ? (
                      <Spinner color="current" size="sm" />
                    ) : (
                      <Icon icon="gravity-ui:arrow-up" />
                    )
                  }
                </Button>
                <Tooltip.Content className="flex items-center gap-1">
                  <p className="text-xs">Send</p>
                  <Kbd className="h-4 rounded-sm px-1">
                    <Kbd.Abbr keyValue="enter" />
                  </Kbd>
                </Tooltip.Content>
              </Tooltip>
            </div>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextField className="w-[280px]" name="email1">
          <Label>Email address *</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
            </InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
          </InputGroup>
          <Description>We'll never share this with anyone else</Description>
        </TextField>

        <TextField className="w-[280px]" name="email2">
          <Label>Email address *</Label>
          <InputGroup>
            <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
            <InputGroup.Suffix>
              <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
            </InputGroup.Suffix>
          </InputGroup>
          <Description>We don't send spam</Description>
        </TextField>

        <TextField className="w-[280px]" defaultValue="10" name="price">
          <Label>Set a price</Label>
          <InputGroup>
            <InputGroup.Prefix>$</InputGroup.Prefix>
            <InputGroup.Input className="w-[200px]" type="number" />
            <InputGroup.Suffix>USD</InputGroup.Suffix>
          </InputGroup>
          <Description>What customers would pay</Description>
        </TextField>

        <TextField className="w-[280px]" defaultValue="heroui.com" name="website1">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Prefix>https://</InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" />
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" defaultValue="heroui" name="website2">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Input className="w-[280px]" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" defaultValue="heroui" name="website3">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:globe" />
            </InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" defaultValue="heroui.com" name="website4">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Input className="w-[280px]" />
            <InputGroup.Suffix className="pe-0">
              <Button isIconOnly aria-label="Copy" className="h-auto p-0" size="sm" variant="ghost">
                <Icon className="size-4" icon="gravity-ui:copy" />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" defaultValue="heroui.com" name="website5">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:globe" />
            </InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" />
            <InputGroup.Suffix className="pe-0">
              <Button isIconOnly aria-label="Copy" className="h-auto p-0" size="sm" variant="ghost">
                <Icon className="size-4" icon="gravity-ui:copy" />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </div>
    </div>
  ),
};
