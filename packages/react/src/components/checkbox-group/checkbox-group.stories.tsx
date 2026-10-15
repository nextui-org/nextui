import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Checkbox} from "../checkbox";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";

import {CheckboxGroup} from "./index";

export default {
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  component: CheckboxGroup,
  title: "Components/Forms/CheckboxGroup",
} as Meta<typeof CheckboxGroup>;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup name="interests">
      <Label>Select your interests</Label>
      <Description>Choose all that apply</Description>
      <Checkbox value="coding">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Coding
        </Checkbox.Content>
        <Description>Love building software</Description>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Design
        </Checkbox.Content>
        <Description>Enjoy creating beautiful interfaces</Description>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Writing
        </Checkbox.Content>
        <Description>Passionate about content creation</Description>
      </Checkbox>
    </CheckboxGroup>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => (
    <CheckboxGroup name="features">
      <Label>Features</Label>
      <Description>Select the features you want</Description>
      <Checkbox value="notifications">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator>
              {({isSelected}) =>
                isSelected ? (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : null
              }
            </Checkbox.Indicator>
          </Checkbox.Control>
          Email notifications
        </Checkbox.Content>
        <Description>Receive updates via email</Description>
      </Checkbox>
      <Checkbox value="newsletter">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator>
              {({isSelected}) =>
                isSelected ? (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : null
              }
            </Checkbox.Indicator>
          </Checkbox.Control>
          Newsletter
        </Checkbox.Content>
        <Description>Get weekly newsletters</Description>
      </Checkbox>
    </CheckboxGroup>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(["coding"]);
    const allOptions = ["coding", "design", "writing"];

    return (
      <div>
        <Checkbox
          isIndeterminate={selected.length > 0 && selected.length < allOptions.length}
          isSelected={selected.length === allOptions.length}
          name="select-all"
          onChange={(isSelected: boolean) => {
            setSelected(isSelected ? allOptions : []);
          }}
        >
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Select all
          </Checkbox.Content>
        </Checkbox>
        <div className="ms-6 flex flex-col gap-2">
          <CheckboxGroup value={selected} onChange={setSelected}>
            <Checkbox value="coding">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Coding
              </Checkbox.Content>
            </Checkbox>
            <Checkbox value="design">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Design
              </Checkbox.Content>
            </Checkbox>
            <Checkbox value="writing">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Writing
              </Checkbox.Content>
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    );
  },
};

export const Validation: Story = {
  render: () => {
    return (
      <Form
        className="flex flex-col gap-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const values = formData.getAll("preferences");

          alert(`Selected preferences: ${values.join(", ")}`);
        }}
      >
        <CheckboxGroup isRequired name="preferences">
          <Label>Preferences</Label>
          <Description>Select at least one preference</Description>
          <Checkbox value="email">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Email notifications
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="sms">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              SMS notifications
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="push">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Push notifications
            </Checkbox.Content>
          </Checkbox>
          <FieldError>Please select at least one notification method.</FieldError>
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(["coding", "design"]);

    return (
      <CheckboxGroup
        className="min-w-[320px]"
        name="skills"
        value={selected}
        onChange={setSelected}
      >
        <Label>Your skills</Label>
        <Checkbox value="coding">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Coding
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="design">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Design
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="writing">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Writing
          </Checkbox.Content>
        </Checkbox>
        <p className="my-4 text-sm text-muted">Selected: {selected.join(", ") || "None"}</p>
      </CheckboxGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup isDisabled name="disabled-features">
      <Label>Features</Label>
      <Description>Feature selection is temporarily disabled</Description>
      <Checkbox value="feature1">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Feature 1
        </Checkbox.Content>
        <Description>This feature is coming soon</Description>
      </Checkbox>
      <Checkbox value="feature2">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Feature 2
        </Checkbox.Content>
        <Description>This feature is coming soon</Description>
      </Checkbox>
    </CheckboxGroup>
  ),
};
