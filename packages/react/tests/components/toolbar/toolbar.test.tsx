import {render, screen, setupUser} from "@heroui/testing/helpers";
import {ToggleButtonGroupContext} from "react-aria-components/ToggleButtonGroup";

import {Button} from "@/components/button";
import {ToggleButton} from "@/components/toggle-button";
import {ToggleButtonGroup} from "@/components/toggle-button-group";
import {Toolbar} from "@/components/toolbar";

describe("Toolbar", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes a labelled toolbar role with data-slot and BEM block", () => {
    render(
      <Toolbar aria-label="Text formatting">
        <Button>Bold</Button>
        <Button>Italic</Button>
      </Toolbar>,
    );

    const toolbar = screen.getByRole("toolbar", {name: "Text formatting"});

    expect(toolbar).toHaveAttribute("data-slot", "toolbar");
    expect(toolbar.className).toEqual(expect.stringContaining("toolbar"));
  });

  it("exposes default horizontal orientation BEM modifier", () => {
    render(
      <Toolbar aria-label="Tools">
        <Button>One</Button>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar").className).toEqual(
      expect.stringContaining("toolbar--horizontal"),
    );
  });

  it("exposes vertical orientation BEM modifier", () => {
    render(
      <Toolbar aria-label="Tools" orientation="vertical">
        <Button>One</Button>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar").className).toEqual(
      expect.stringContaining("toolbar--vertical"),
    );
  });

  it("exposes attached BEM modifier", () => {
    render(
      <Toolbar isAttached aria-label="Attached toolbar">
        <Button>One</Button>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar").className).toEqual(
      expect.stringContaining("toolbar--attached"),
    );
  });

  it("supports pressing grouped buttons inside the toolbar", async () => {
    const onPress = vi.fn();

    render(
      <Toolbar aria-label="Editor toolbar">
        <Button onPress={onPress}>Undo</Button>
        <Button>Redo</Button>
      </Toolbar>,
    );

    await user.click(screen.getByRole("button", {name: "Undo"}));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard arrow navigation between toolbar items", async () => {
    render(
      <Toolbar aria-label="Editor toolbar">
        <Button>Undo</Button>
        <Button>Redo</Button>
      </Toolbar>,
    );

    await user.tab();
    expect(screen.getByRole("button", {name: "Undo"})).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", {name: "Redo"})).toHaveFocus();
  });

  it("supports composition with a nested ToggleButtonGroup", async () => {
    const onSelectionChange = vi.fn();

    render(
      <Toolbar aria-label="Text formatting">
        <ToggleButtonGroup selectionMode="multiple" onSelectionChange={onSelectionChange}>
          <ToggleButton id="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>,
    );

    await user.click(screen.getByRole("button", {name: "Bold"}));

    expect(onSelectionChange).toHaveBeenCalledWith(new Set(["bold"]));
  });
  it("supports nested group keyboard navigation without unsupported orientation attributes", async () => {
    render(
      <Toolbar aria-label="Editor">
        <ToggleButtonGroup aria-label="Text style" selectionMode="multiple">
          <ToggleButton id="bold">Bold</ToggleButton>
          <ToggleButton id="italic">Italic</ToggleButton>
        </ToggleButtonGroup>
        <Button>Save</Button>
      </Toolbar>,
    );

    expect(screen.getByRole("group", {name: "Text style"})).not.toHaveAttribute("aria-orientation");
    expect(screen.getByRole("toolbar", {name: "Editor"})).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
    await user.tab();
    expect(screen.getByRole("button", {name: "Bold"})).toHaveFocus();
    await user.keyboard("{ArrowRight} ");
    expect(screen.getByRole("button", {name: "Italic"})).toHaveFocus();
    expect(screen.getByRole("button", {name: "Italic"})).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", {name: "Save"})).toHaveFocus();
  });

  it("preserves orientation for a toggle group's custom semantic renderer", () => {
    render(
      <Toolbar aria-label="Editor">
        <ToggleButtonGroup
          aria-label="Text style"
          orientation="vertical"
          render={(props) => <div {...props} role="toolbar" />}
        >
          <ToggleButton id="bold">Bold</ToggleButton>
          <ToggleButton id="italic">Italic</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar", {name: "Text style"})).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("supports a toggle group renderer supplied through context", () => {
    render(
      <ToggleButtonGroupContext
        value={{render: (props) => <div {...props} data-testid="context-group" />}}
      >
        <ToggleButtonGroup aria-label="Text style">
          <ToggleButton id="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      </ToggleButtonGroupContext>,
    );

    expect(screen.getByRole("radiogroup", {name: "Text style"})).toBe(
      screen.getByTestId("context-group"),
    );
  });
});
