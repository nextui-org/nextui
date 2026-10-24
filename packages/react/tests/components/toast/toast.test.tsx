import type {CSSProperties} from "react";

import {
  act,
  advanceTimersByTime,
  cleanup,
  render,
  runAllTimers,
  screen,
  setupUser,
} from "@heroui/testing/helpers";

import {I18nProvider} from "@/components/rac";
import {
  DEFAULT_EXIT_DURATION,
  DEFAULT_TOAST_TIMEOUT,
  Toast,
  ToastQueue,
  toast,
} from "@/components/toast";

describe("Toast", () => {
  let user: ReturnType<typeof setupUser>;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("renders nothing until a toast is queued", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    expect(screen.queryByRole("region")).toBeNull();
  });

  it("renders the region with data-slot and an accessible notification count label", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    const region = screen.getByRole("region");

    expect(region).toHaveAttribute("data-slot", "toast-region");
    expect(region).toHaveAttribute("aria-label", "1 notification.");
  });

  it("merges custom styles with the default region variables", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} style={{zIndex: 100_000}} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("region")).toHaveStyle({
      "--gap": "12px",
      "--placement": "bottom",
      "--scale-factor": "0.05",
      "--toast-width": "460px",
      "z-index": "100000",
    });
  });

  it("supports overriding a region variable through custom styles", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} style={{"--toast-width": "320px"} as CSSProperties} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("region")).toHaveStyle({
      "--gap": "12px",
      "--placement": "bottom",
      "--scale-factor": "0.05",
      "--toast-width": "320px",
    });
  });

  it("supports the width prop alongside custom styles", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} style={{zIndex: 100_000}} width={520} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("region")).toHaveStyle({
      "--toast-width": "520px",
      "z-index": "100000",
    });
  });

  it("supports a style render function on the region", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} style={() => ({zIndex: 100_000}) as CSSProperties} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("region")).toHaveStyle({
      "--toast-width": "460px",
      "z-index": "100000",
    });
  });

  it("renders default children with alertdialog role, title, description, and close button", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({description: "Your changes have been saved.", title: "Saved", variant: "success"});
    });

    const toastEl = screen.getByRole("alertdialog");

    expect(toastEl).toHaveAttribute("data-slot", "toast");
    expect(toastEl).toHaveAttribute("data-frontmost", "true");
    expect(toastEl.className).toEqual(expect.stringContaining("toast--success"));
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="toast-indicator"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="toast-default-icon"]')).not.toBeNull();
    expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument();
  });

  it("announces the close button with the locale from I18nProvider", () => {
    const queue = new ToastQueue();

    render(
      <I18nProvider locale="ko-KR">
        <Toast.Provider queue={queue} />
      </I18nProvider>,
    );

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("button", {name: "닫기"})).toBeInTheDocument();
  });

  it("supports a custom close label over the localized slot label", () => {
    const queue = new ToastQueue();

    render(
      <I18nProvider locale="ko-KR">
        <Toast.Provider queue={queue}>
          {({toast: toastItem}) => (
            <Toast toast={toastItem}>
              <Toast.Content>
                <Toast.Title>Saved</Toast.Title>
              </Toast.Content>
              <Toast.CloseButton aria-label="Dismiss notification" />
            </Toast>
          )}
        </Toast.Provider>
      </I18nProvider>,
    );

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("button", {name: "Dismiss notification"})).toBeInTheDocument();
  });

  it("renders no indicator when indicator is null", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({indicator: null, title: "No icon"});
    });

    expect(document.querySelector('[data-slot="toast-indicator"]')).toBeNull();
  });

  it("renders a custom indicator instead of the default icon", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({indicator: <span data-testid="custom-indicator" />, title: "Custom"});
    });

    expect(screen.getByTestId("custom-indicator")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="toast-default-icon"]')).toBeNull();
  });

  it("calls onClose when the close button is pressed", async () => {
    const queue = new ToastQueue();
    const onClose = vi.fn();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Dismiss me"}, {onClose});
    });

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", {name: "Close"}));

    // onClose fires at dismissal, while the exit animation is still playing.
    expect(onClose).toHaveBeenCalledTimes(1);

    // Pointer dismissal releases focus so hiding the toast is not blocked.
    expect(document.body).toHaveFocus();

    advanceTimersByTime(DEFAULT_EXIT_DURATION);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("supports auto-dismiss after the default timeout", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Auto dismiss"});
    });

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DEFAULT_TOAST_TIMEOUT);
    });

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("supports updating a persistent toast without starting a countdown", () => {
    render(<Toast.Provider />);

    let id = "";

    act(() => {
      id = toast("Saving", {timeout: 0});
    });

    act(() => {
      toast.update(id, "Saved", {variant: "success"});
    });

    act(() => {
      vi.advanceTimersByTime(DEFAULT_TOAST_TIMEOUT * 2);
    });

    expect(screen.getByRole("alertdialog")).toHaveTextContent("Saved");

    act(() => {
      toast.clear();
    });
    advanceTimersByTime(DEFAULT_EXIT_DURATION);
  });

  it("calls the original onClose when an update omits it", () => {
    const onClose = vi.fn();

    render(<Toast.Provider />);

    let id = "";

    act(() => {
      id = toast("Saving", {onClose, timeout: 0});
    });

    act(() => {
      toast.update(id, "Saved");
    });

    act(() => {
      toast.close(id);
    });

    expect(onClose).toHaveBeenCalledTimes(1);

    advanceTimersByTime(DEFAULT_EXIT_DURATION);
  });

  it("supports auto-dismiss once a promise toast settles", async () => {
    render(<Toast.Provider />);

    await act(async () => {
      toast.promise(Promise.resolve("ok"), {
        error: "Failed",
        loading: "Uploading",
        success: "Uploaded",
      });
    });

    expect(screen.getByRole("alertdialog")).toHaveTextContent("Uploaded");

    act(() => {
      vi.advanceTimersByTime(DEFAULT_TOAST_TIMEOUT);
    });
    advanceTimersByTime(DEFAULT_EXIT_DURATION);

    expect(screen.queryByRole("alertdialog", {hidden: true})).toBeNull();
  });

  it("supports restarting a running timer through reset", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Auto dismiss"}, {timeout: 1_000});
    });

    // React Aria owns the timers and calls reset() whenever the timeout changes,
    // so reset has to restart the countdown even while one is already running.
    const {timer} = queue.getQueue().visibleToasts[0]! as unknown as {
      timer: {reset: (delay: number) => void};
    };

    act(() => {
      vi.advanceTimersByTime(500);
      timer.reset(4_000);
    });

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3_000);
    });
    advanceTimersByTime(DEFAULT_EXIT_DURATION);

    expect(screen.queryByRole("alertdialog", {hidden: true})).toBeNull();
  });

  it("calls each onClose at dismissal and removes all toasts after clear", () => {
    const queue = new ToastQueue();
    const onCloseA = vi.fn();
    const onCloseB = vi.fn();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "First"}, {onClose: onCloseA});
    });
    act(() => {
      queue.add({title: "Second"}, {onClose: onCloseB});
    });

    act(() => {
      queue.clear();
    });

    // onClose fires at dismissal; the toasts stay mounted (aria-hidden)
    // while their exit animation plays.
    expect(onCloseA).toHaveBeenCalledTimes(1);
    expect(onCloseB).toHaveBeenCalledTimes(1);

    const exiting = screen.getAllByRole("alertdialog", {hidden: true});

    expect(exiting).toHaveLength(2);
    for (const toastEl of exiting) {
      expect(toastEl).toHaveAttribute("data-exiting", "true");
    }

    advanceTimersByTime(DEFAULT_EXIT_DURATION);

    expect(screen.queryByRole("alertdialog", {hidden: true})).toBeNull();
    expect(onCloseA).toHaveBeenCalledTimes(1);
    expect(onCloseB).toHaveBeenCalledTimes(1);
  });

  it("exposes a single batched exiting-state notification for clear", () => {
    const queue = new ToastQueue();
    const inner = queue.getQueue() as unknown as {
      getExitingKeys: () => ReadonlySet<string>;
      subscribeExiting: (fn: () => void) => () => void;
    };

    queue.add({title: "One"});
    queue.add({title: "Two"});
    queue.add({title: "Three"});

    const onExitingChange = vi.fn();

    inner.subscribeExiting(onExitingChange);

    queue.clear();

    expect(onExitingChange).toHaveBeenCalledTimes(1);
    expect(inner.getExitingKeys().size).toBe(3);
  });

  it("exposes stacked toasts with newest frontmost and indexed", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "First"});
    });
    act(() => {
      queue.add({title: "Second"});
    });

    const toasts = screen.getAllByRole("alertdialog");

    expect(toasts).toHaveLength(2);

    const frontmost = toasts.find((t) => t.getAttribute("data-frontmost") === "true");

    expect(frontmost).toHaveTextContent("Second");
    expect(screen.getByRole("region")).toHaveAttribute("aria-label", "2 notifications.");
  });

  it("exposes data-hidden on toasts beyond maxVisibleToasts", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider maxVisibleToasts={1} queue={queue} />);

    act(() => {
      queue.add({title: "First"});
    });
    act(() => {
      queue.add({title: "Second"});
    });

    // Hidden toasts are aria-hidden, so include them in the role query.
    const toasts = screen.getAllByRole("alertdialog", {hidden: true});
    const hidden = toasts.find((t) => t.getAttribute("data-hidden") === "true");
    const visible = toasts.find((t) => !t.hasAttribute("data-hidden"));

    expect(hidden).toBeDefined();
    expect(visible).toBeDefined();
    expect(hidden).toHaveTextContent("First");
    expect(visible).toHaveTextContent("Second");
    // Hidden toasts are inert so their controls leave the tab order.
    expect(hidden).toHaveAttribute("inert");
    expect(visible).not.toHaveAttribute("inert");
  });

  it("moves keyboard focus to the remaining toast when the focused toast closes", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "First"});
    });
    act(() => {
      queue.add({title: "Second"});
    });

    await user.tab();
    expect(document.activeElement).toHaveAttribute("role", "alertdialog");

    await user.tab();
    await user.keyboard("{Enter}");

    // The frontmost toast is dismissed; keyboard focus lands on its neighbor.
    const remaining = screen.getByRole("alertdialog");

    expect(remaining).toHaveTextContent("First");
    expect(remaining).toHaveFocus();
  });

  it("supports Alt+T to focus and expand the stack and Escape to collapse it", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "First"});
    });
    act(() => {
      queue.add({title: "Second"});
    });

    await user.keyboard("{Alt>}t{/Alt}");

    const region = screen.getByRole("region");

    expect(region).toHaveFocus();
    expect(region).toHaveAttribute("data-expanded", "true");

    await user.keyboard("{Escape}");

    expect(region).not.toHaveAttribute("data-expanded");
    expect(region).not.toHaveFocus();
  });

  it("exposes the react-stately method that in-place updates notify through", () => {
    const inner = new ToastQueue().getQueue() as unknown as Record<string, unknown>;

    // update() mutates a queued toast and then calls this method so React
    // re-reads the queue. It is TypeScript-private and unstable upstream, and
    // losing it silently downgrades updates to a partial re-render, so fail on
    // the next React Aria bump rather than in a consumer's app.
    expect(typeof inner["updateVisibleToasts"]).toBe("function");
  });

  it("exposes data-swapped on the indicator after a promise-style update", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    let key = "";

    act(() => {
      key = queue.add({isLoading: true, title: "Uploading"});
    });

    const indicator = document.querySelector('[data-slot="toast-indicator"]');

    expect(indicator).not.toHaveAttribute("data-swapped");

    act(() => {
      queue.update(key, {title: "Uploaded", variant: "success"});
    });

    expect(indicator).toHaveAttribute("data-swapped", "true");
    expect(document.querySelector('[data-slot="toast-default-icon"]')).not.toBeNull();
  });

  it("supports custom render children via Toast.Provider function-as-children", () => {
    const queue = new ToastQueue();

    render(
      <Toast.Provider queue={queue}>
        {({toast: toastItem}) => (
          <Toast data-testid="custom-toast" toast={toastItem}>
            <Toast.Content>
              <Toast.Title>Custom layout</Toast.Title>
            </Toast.Content>
          </Toast>
        )}
      </Toast.Provider>,
    );

    act(() => {
      queue.add({title: "ignored"});
    });

    expect(screen.getByTestId("custom-toast")).toBeInTheDocument();
    expect(screen.getByText("Custom layout")).toBeInTheDocument();
  });

  it("merges custom styles with the toast stacking styles", () => {
    const queue = new ToastQueue();

    render(
      <Toast.Provider queue={queue}>
        {({toast: toastItem}) => (
          <Toast data-testid="custom-toast" style={{marginTop: 8}} toast={toastItem}>
            <Toast.Content>
              <Toast.Title>Custom layout</Toast.Title>
            </Toast.Content>
          </Toast>
        )}
      </Toast.Provider>,
    );

    act(() => {
      queue.add({title: "ignored"});
    });

    expect(screen.getByTestId("custom-toast")).toHaveStyle({
      "margin-top": "8px",
      opacity: "1",
      "pointer-events": "auto",
      "z-index": "1",
    });
  });

  it("exposes placement BEM modifiers on the region and toast", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider placement="top end" queue={queue} />);

    act(() => {
      queue.add({title: "Top end"});
    });

    expect(screen.getByRole("region").className).toEqual(
      expect.stringContaining("toast-region--top-end"),
    );
    expect(screen.getByRole("alertdialog").className).toEqual(
      expect.stringContaining("toast--top-end"),
    );
  });

  it("supports keyboard close of the frontmost toast", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "Keyboard close"});
    });

    await user.tab();
    expect(document.activeElement).toHaveAttribute("role", "alertdialog");

    await user.tab();
    expect(screen.getByRole("button", {name: "Close"})).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("supports a custom aria-label for the toast region", () => {
    const queue = new ToastQueue();

    render(<Toast.Provider aria-label="Notifications" queue={queue} />);

    act(() => {
      queue.add({title: "Saved"});
    });

    expect(screen.getByRole("region")).toHaveAttribute("aria-label", "Notifications");
  });

  it("supports a configurable hotkey", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider hotkey={["ctrlKey", "KeyN"]} queue={queue} />);

    act(() => {
      queue.add({title: "First"});
      queue.add({title: "Second"});
    });

    // The default hotkey is replaced, so Alt+T no longer focuses the region.
    await user.keyboard("{Alt>}t{/Alt}");
    expect(screen.getByRole("region")).not.toHaveFocus();

    await user.keyboard("{Control>}n{/Control}");
    expect(screen.getByRole("region")).toHaveFocus();
    expect(screen.getByRole("region")).toHaveAttribute("data-expanded", "true");
  });

  it("does not focus the region when extra modifiers are held", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider queue={queue} />);

    act(() => {
      queue.add({title: "First"});
      queue.add({title: "Second"});
    });

    await user.keyboard("{Control>}{Alt>}t{/Alt}{/Control}");
    expect(screen.getByRole("region")).not.toHaveFocus();

    await user.keyboard("{Shift>}{Alt>}t{/Alt}{/Shift}");
    expect(screen.getByRole("region")).not.toHaveFocus();

    await user.keyboard("{Alt>}t{/Alt}");
    expect(screen.getByRole("region")).toHaveFocus();
  });

  it("does not focus the region when the hotkey is disabled", async () => {
    const queue = new ToastQueue();

    render(<Toast.Provider hotkey={[]} queue={queue} />);

    act(() => {
      queue.add({title: "First"});
      queue.add({title: "Second"});
    });

    await user.keyboard("{Alt>}t{/Alt}");
    expect(screen.getByRole("region")).not.toHaveFocus();
  });
});
