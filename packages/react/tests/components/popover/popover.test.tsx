import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";
import {createRef} from "react";
import {PopoverContext} from "react-aria-components/Popover";

import {Button} from "@/components/button";
import {DatePicker} from "@/components/date-picker";
import {DateRangePicker} from "@/components/date-range-picker";
import {Popover} from "@/components/popover";

import {PopoverFixture} from "./fixtures";

const renderPopover = (
  props: {
    isOpen?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {},
) => render(<PopoverFixture {...props} />);

describe("Popover", () => {
  let user: ReturnType<typeof setupUser>;
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
    testUtilUser = new User({
      interactionType: "mouse",
      advanceTimer: vi.advanceTimersByTime,
    });
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("calls callback ref cleanup when the overlay closes", () => {
    const dispose = vi.fn();
    const ref = vi.fn((node: HTMLElement | null) => (node ? dispose : undefined));
    const fixture = (isOpen: boolean) => (
      <Popover isOpen={isOpen}>
        <Button>Open popover</Button>
        <Popover.Content ref={ref}>
          <Popover.Dialog aria-label="Ref cleanup">Content</Popover.Dialog>
        </Popover.Content>
      </Popover>
    );
    const view = render(fixture(true));

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    view.rerender(fixture(false));
    runAllTimers();

    expect(dispose).toHaveBeenCalledTimes(1);
    expect(ref).not.toHaveBeenCalledWith(null);
  });

  it("calls the previous callback ref cleanup when the ref changes", () => {
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    const firstRef = vi.fn((node: HTMLElement | null) => (node ? firstCleanup : undefined));
    const secondRef = vi.fn((node: HTMLElement | null) => (node ? secondCleanup : undefined));
    const fixture = (ref: typeof firstRef) => (
      <Popover isOpen>
        <Button>Open popover</Button>
        <Popover.Content ref={ref}>
          <Popover.Dialog aria-label="Ref replacement">Content</Popover.Dialog>
        </Popover.Content>
      </Popover>
    );
    const view = render(fixture(firstRef));

    view.rerender(fixture(secondRef));
    expect(firstCleanup).toHaveBeenCalledTimes(1);
    expect(secondRef).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(secondCleanup).not.toHaveBeenCalled();

    view.unmount();
    expect(secondCleanup).toHaveBeenCalledTimes(1);
  });

  it("calls legacy callback refs with null on unmount", () => {
    const ref = vi.fn();
    const view = render(
      <Popover isOpen>
        <Button>Open popover</Button>
        <Popover.Content ref={ref}>
          <Popover.Dialog aria-label="Legacy ref">Content</Popover.Dialog>
        </Popover.Content>
      </Popover>,
    );

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    view.unmount();
    expect(ref).toHaveBeenLastCalledWith(null);
  });

  it("exposes dialog slots via Dialog tester", async () => {
    renderPopover();

    const tester = testUtilUser.createTester("Dialog", {
      root: screen.getByRole("button", {name: "Open popover"}),
      overlayType: "popover",
    });

    expect(tester.getDialog()).toBeNull();

    await tester.open();
    runAllTimers();

    const dialog = tester.getDialog();

    expect(dialog).not.toBeNull();
    expect(dialog).toHaveAttribute("data-slot", "popover-dialog");
    expect(dialog?.className).toEqual(expect.stringContaining("popover__dialog"));
    expect(screen.getByText("This is the popover content")).toBeInTheDocument();
    expect(document.querySelector(".popover")).not.toBeNull();

    await tester.close();
    runAllTimers();

    expect(tester.getDialog()).toBeNull();
  });

  it("supports Escape dismiss", async () => {
    const onOpenChange = vi.fn();

    renderPopover({defaultOpen: true, onOpenChange});
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("preserves accessible names supplied to a custom semantic renderer", () => {
    render(
      <Popover defaultOpen>
        <Button>Open popover</Button>
        <Popover.Content
          isNonModal
          aria-label="Preview"
          render={(props) => <div {...props} aria-labelledby={undefined} role="region" />}
        >
          Preview content
        </Popover.Content>
      </Popover>,
    );
    runAllTimers();

    expect(screen.getByRole("region", {name: "Preview"})).toBeInTheDocument();
  });

  it("keeps the automatic dialog name when no child dialog is present", () => {
    render(
      <Popover defaultOpen>
        <Button>Open popover</Button>
        <Popover.Content aria-labelledby="preview-label">
          <span id="preview-label">Preview</span>
        </Popover.Content>
      </Popover>,
    );
    runAllTimers();

    expect(screen.getByRole("dialog", {name: "Preview"})).toBeInTheDocument();
  });

  it.each([
    ["Popover.Content", Popover.Content],
    ["DatePicker.Popover", DatePicker.Popover],
    ["DateRangePicker.Popover", DateRangePicker.Popover],
  ] as const)("supports a context renderer for %s", (_, Content) => {
    const triggerRef = createRef<HTMLButtonElement>();

    render(
      <>
        <button ref={triggerRef} type="button">
          Open
        </button>
        <PopoverContext
          value={{render: (props) => <div {...props} data-testid="context-popover" />}}
        >
          <Content isOpen aria-label="Preview" triggerRef={triggerRef}>
            Preview content
          </Content>
        </PopoverContext>
      </>,
    );
    runAllTimers();

    expect(screen.getByRole("dialog", {name: "Preview"})).toBe(
      screen.getByTestId("context-popover"),
    );
  });

  it("keeps naming on the child dialog rather than the generic container", () => {
    render(
      <Popover defaultOpen>
        <Button>Open popover</Button>
        <Popover.Content aria-label="Preview" data-testid="container">
          <Popover.Dialog>
            <Popover.Heading>Preview details</Popover.Heading>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>,
    );
    runAllTimers();

    expect(screen.getByRole("dialog", {name: "Preview details"})).toBeInTheDocument();
    expect(screen.getByTestId("container")).not.toHaveAttribute("aria-label");
    expect(screen.getByTestId("container")).not.toHaveAttribute("aria-labelledby");
  });

  describe("Arrow", () => {
    it("renders a default arrow when no child is provided", () => {
      render(
        <Popover defaultOpen>
          <Button>Open popover</Button>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Dialog>Content</Popover.Dialog>
          </Popover.Content>
        </Popover>,
      );

      runAllTimers();

      expect(document.querySelector('[data-slot="popover-overlay-arrow-group"]')).not.toBeNull();
      expect(document.querySelector('svg[data-slot="popover-overlay-arrow"]')).not.toBeNull();
    });

    it("tags a custom arrow child with the arrow slot", () => {
      render(
        <Popover defaultOpen>
          <Button>Open popover</Button>
          <Popover.Content>
            <Popover.Arrow>
              <span data-testid="custom-arrow">▲</span>
            </Popover.Arrow>
            <Popover.Dialog>Content</Popover.Dialog>
          </Popover.Content>
        </Popover>,
      );

      runAllTimers();

      const custom = screen.getByTestId("custom-arrow");

      expect(custom).toHaveAttribute("data-slot", "popover-overlay-arrow");
      expect(document.querySelector('svg[data-slot="popover-overlay-arrow"]')).toBeNull();
    });
  });

  describe("Trigger", () => {
    it("exposes the trigger slot and opens the popover on press", async () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Dialog>Trigger content</Popover.Dialog>
          </Popover.Content>
        </Popover>,
      );

      const trigger = screen.getByRole("button", {name: "Open"});

      expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
      expect(trigger.className).toEqual(expect.stringContaining("popover__trigger"));

      await user.click(trigger);
      runAllTimers();

      expect(screen.getByText("Trigger content")).toBeInTheDocument();
    });
  });

  it("exposes heading slot", async () => {
    render(
      <Popover defaultOpen>
        <Button>Open popover</Button>
        <Popover.Content>
          <Popover.Dialog>
            <Popover.Heading>Popover heading</Popover.Heading>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>,
    );

    runAllTimers();

    const heading = screen.getByRole("heading", {name: "Popover heading"});

    expect(heading.className).toEqual(expect.stringContaining("popover__heading"));
  });
});
