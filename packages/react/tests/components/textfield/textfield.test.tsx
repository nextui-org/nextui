import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextArea} from "@/components/textarea";
import {TextField} from "@/components/textfield";

describe("TextField", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderField = (props: ComponentProps<typeof TextField> = {}) =>
    render(
      <TextField name="name" {...props}>
        <Label>Your name</Label>
        <Input placeholder="John" />
      </TextField>,
    );

  it("exposes accessible name via Label and Input", () => {
    renderField();

    expect(screen.getByRole("textbox", {name: "Your name"})).toBeInTheDocument();
  });

  it("exposes textfield and input data-slots with BEM blocks", () => {
    renderField();

    const field = document.querySelector('[data-slot="textfield"]');
    const input = document.querySelector('[data-slot="input"]');

    expect(field?.className).toEqual(expect.stringContaining("textfield"));
    expect(input?.className).toEqual(expect.stringContaining("input"));
  });

  it("exposes Input variant BEM from TextField context", () => {
    renderField({variant: "secondary"});

    expect(document.querySelector('[data-slot="input"]')?.className).toEqual(
      expect.stringContaining("input--secondary"),
    );
  });

  it("supports typing and calls onChange", async () => {
    const onChange = vi.fn();

    renderField({onChange});
    const input = screen.getByRole("textbox", {name: "Your name"});

    await user.type(input, "Ada");
    expect(input).toHaveValue("Ada");
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.at(-1)?.[0]).toBe("Ada");
  });

  it("supports controlled value", async () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <TextField name="name" value="Ada" onChange={onChange}>
        <Label>Your name</Label>
        <Input />
      </TextField>,
    );

    expect(screen.getByRole("textbox", {name: "Your name"})).toHaveValue("Ada");

    await user.type(screen.getByRole("textbox", {name: "Your name"}), "!");
    expect(onChange).toHaveBeenCalled();

    rerender(
      <TextField name="name" value="Ada!" onChange={onChange}>
        <Label>Your name</Label>
        <Input />
      </TextField>,
    );
    expect(screen.getByRole("textbox", {name: "Your name"})).toHaveValue("Ada!");
  });

  it("supports disabled state and blocks typing", async () => {
    const onChange = vi.fn();

    renderField({isDisabled: true, onChange});
    const input = screen.getByRole("textbox", {name: "Your name"});

    expect(input).toBeDisabled();
    expect(document.querySelector('[data-slot="textfield"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );

    await user.type(input, "x");
    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("renders FieldError when invalid", () => {
    render(
      <TextField isInvalid isRequired name="password" type="password">
        <Label>Password</Label>
        <Input />
        <FieldError>Password must be longer than 8 characters</FieldError>
      </TextField>,
    );

    expect(screen.getByText("Password must be longer than 8 characters")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="field-error"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="textfield"]')).toHaveAttribute(
      "data-invalid",
      "true",
    );
  });

  it("renders no FieldError when valid", () => {
    render(
      <TextField name="password" type="password">
        <Label>Password</Label>
        <Input />
        <FieldError>Password must be longer than 8 characters</FieldError>
      </TextField>,
    );

    expect(screen.queryByText("Password must be longer than 8 characters")).toBeNull();
  });

  it("exposes accessible description via Description", () => {
    render(
      <TextField name="name">
        <Label>Your name</Label>
        <Input />
        <Description>Visible to other users</Description>
      </TextField>,
    );

    const input = screen.getByRole("textbox", {name: "Your name"});

    expect(input).toHaveAccessibleDescription("Visible to other users");
    expect(document.querySelector('[data-slot="description"]')).not.toBeNull();
  });

  it("supports TextArea composition with textarea data-slot", async () => {
    const onChange = vi.fn();

    render(
      <TextField name="bio" onChange={onChange}>
        <Label>Bio</Label>
        <TextArea />
      </TextField>,
    );

    const textarea = screen.getByRole("textbox", {name: "Bio"});

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(document.querySelector('[data-slot="textarea"]')?.className).toEqual(
      expect.stringContaining("textarea"),
    );

    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
    expect(onChange.mock.calls.at(-1)?.[0]).toBe("Hello");
  });

  it("exposes TextArea variant BEM from TextField context", () => {
    render(
      <TextField name="bio" variant="secondary">
        <Label>Bio</Label>
        <TextArea />
      </TextField>,
    );

    expect(document.querySelector('[data-slot="textarea"]')?.className).toEqual(
      expect.stringContaining("textarea--secondary"),
    );
  });

  it("supports focus-visible via keyboard", async () => {
    renderField();
    const input = screen.getByRole("textbox", {name: "Your name"});

    await user.tab();
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("data-focus-visible", "true");
  });

  it("supports children as a render function receiving field state", () => {
    render(
      <TextField isRequired>
        {({isRequired}) => (
          <>
            <Label>Your name</Label>
            <Input />
            <Description>{isRequired ? "Required" : "Optional"}</Description>
          </>
        )}
      </TextField>,
    );

    expect(screen.getByRole("textbox", {name: "Your name"})).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
