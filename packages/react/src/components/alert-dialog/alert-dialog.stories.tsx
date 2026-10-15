import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useCallback, useRef, useState} from "react";

import {useOverlayState} from "../../hooks/use-overlay-state";
import {Button} from "../button";

import {AlertDialog} from "./index";

export default {
  argTypes: {},
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Overlays/AlertDialog",
} as Meta<typeof AlertDialog>;

export const Default = () => {
  return (
    <AlertDialog>
      <Button variant="danger">Delete Project</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export const Statuses = () => {
  const examples = [
    {
      actions: {
        cancel: "Stay Signed In",
        confirm: "Sign Out",
      },
      body: "You'll need to sign in again to access your account. Any unsaved changes will be lost.",
      classNames: "bg-accent-soft text-accent-soft-foreground",
      header: "Sign out of your account?",
      status: "accent",
      trigger: "Sign Out",
    },
    {
      actions: {
        cancel: "Not Yet",
        confirm: "Mark Complete",
      },
      body: "This will mark the task as complete and notify all team members. The task will be moved to your completed list.",
      classNames: "bg-success-soft text-success-soft-foreground",
      header: "Complete this task?",
      status: "success",
      trigger: "Complete Task",
    },
    {
      actions: {
        cancel: "Keep Editing",
        confirm: "Discard",
      },
      body: "You have unsaved changes that will be permanently lost. Are you sure you want to discard them?",
      classNames: "bg-warning-soft text-warning-soft-foreground",
      header: "Discard unsaved changes?",
      status: "warning",
      trigger: "Discard Changes",
    },
    {
      actions: {
        cancel: "Cancel",
        confirm: "Delete Account",
      },
      body: "This will permanently delete your account and remove all your data from our servers. This action is irreversible.",
      classNames: "bg-danger-soft text-danger-soft-foreground",
      header: "Delete your account?",
      status: "danger",
      trigger: "Delete Account",
    },
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {examples.map(({actions, body, classNames, header, status, trigger}) => (
        <AlertDialog key={status}>
          <Button className={classNames}>{trigger}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status={status} />
                  <AlertDialog.Heading>{header}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>{body}</p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    {actions.cancel}
                  </Button>
                  <Button slot="close" variant={status === "danger" ? "danger" : "primary"}>
                    {actions.confirm}
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
};

export const Placements = () => {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <AlertDialog key={placement}>
          <Button variant="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container placement={placement}>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent" />
                  <AlertDialog.Heading>
                    {placement === "auto"
                      ? "Auto Placement"
                      : `${placement.charAt(0).toUpperCase() + placement.slice(1)} Position`}
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    {placement === "auto"
                      ? "Automatically positions at the bottom on mobile and center on desktop for optimal user experience."
                      : `This dialog is positioned at the ${placement} of the viewport. Critical confirmations are typically centered for maximum attention.`}
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button slot="close">Confirm</Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
};

export const Sizes = () => {
  const sizes = ["xs", "sm", "md", "lg", "cover"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <AlertDialog key={size}>
          <Button variant="secondary">{size.charAt(0).toUpperCase() + size.slice(1)}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container size={size}>
              <AlertDialog.Dialog>
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:rocket" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>
                    Size: {size.charAt(0).toUpperCase() + size.slice(1)}
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    {size === "cover" ? (
                      <>
                        This alert dialog uses the <code>cover</code> size variant. It spans the
                        full screen with margins: 16px on mobile and 40px on desktop. Maintains
                        rounded corners and standard padding. Perfect for critical confirmations
                        that need maximum width while preserving alert dialog aesthetics.
                      </>
                    ) : (
                      <>
                        This alert dialog uses the <code>{size}</code> size variant. On mobile
                        devices, all sizes adapt to near full-width for optimal viewing. On desktop,
                        each size provides a different maximum width to suit various content needs.
                      </>
                    )}
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button slot="close">Confirm</Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
};

export const BackdropVariants = () => {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <AlertDialog key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <AlertDialog.Backdrop variant={variant}>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent" />
                  <AlertDialog.Heading>
                    Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    {variant === "opaque"
                      ? "An opaque dark backdrop that completely obscures the background, providing maximum focus on the dialog."
                      : variant === "blur"
                        ? "A blurred backdrop that softly obscures the background while maintaining visual context."
                        : "A transparent backdrop that keeps the background fully visible, useful for less critical confirmations."}
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button slot="close">Confirm</Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
};

export const CustomIcon = () => (
  <AlertDialog>
    <Button variant="secondary">Reset Password</Button>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="warning">
              <Icon className="size-5" icon="gravity-ui:lock-open" />
            </AlertDialog.Icon>
            <AlertDialog.Heading>Reset your password?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p>
              We'll send a password reset link to your email address. You'll need to create a new
              password to regain access to your account.
            </p>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              Cancel
            </Button>
            <Button slot="close">Send Reset Link</Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
);

export const CustomBackdrop = () => (
  <AlertDialog>
    <Button variant="danger">Delete Account</Button>
    <AlertDialog.Backdrop
      className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
      variant="blur"
    >
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[420px]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header className="items-center text-center">
            <AlertDialog.Icon status="danger">
              <Icon className="size-5" icon="gravity-ui:triangle-exclamation" />
            </AlertDialog.Icon>
            <AlertDialog.Heading>Permanently delete your account?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p>
              This action cannot be undone. All your data, settings, and content will be permanently
              removed from our servers. The dramatic red backdrop emphasizes the severity and
              irreversibility of this decision.
            </p>
          </AlertDialog.Body>
          <AlertDialog.Footer className="flex-col-reverse">
            <Button className="w-full" slot="close">
              Keep Account
            </Button>
            <Button className="w-full" slot="close" variant="danger">
              Delete Forever
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
);

export const DismissBehavior = () => (
  <div className="flex max-w-sm flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isDismissable</h3>
      <p className="text-sm text-muted">
        Controls whether the alert dialog can be dismissed by clicking the overlay backdrop. Alert
        dialogs typically require explicit action, so this defaults to <code>false</code>. Set to{" "}
        <code>true</code> for less critical confirmations.
      </p>
      <AlertDialog>
        <Button variant="secondary">Open Alert Dialog</Button>
        <AlertDialog.Backdrop isDismissable={false}>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </AlertDialog.Icon>
                <AlertDialog.Heading>isDismissable = false</AlertDialog.Heading>
                <p className="text-sm leading-5 text-muted">
                  Clicking the backdrop won't close this alert dialog
                </p>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  Try clicking outside this alert dialog on the overlay - it won't close. You must
                  use the action buttons to dismiss it.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
      <p className="text-sm text-muted">
        Controls whether the ESC key can dismiss the alert dialog. Alert dialogs typically require
        explicit action, so this defaults to <code>true</code>. When set to <code>false</code>, the
        ESC key will be enabled.
      </p>
      <AlertDialog>
        <Button variant="secondary">Open Alert Dialog</Button>
        <AlertDialog.Backdrop isKeyboardDismissDisabled>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="accent">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </AlertDialog.Icon>
                <AlertDialog.Heading>isKeyboardDismissDisabled = true</AlertDialog.Heading>
                <p className="text-sm leading-5 text-muted">ESC key is disabled</p>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  Press ESC - nothing happens. You must use the action buttons to dismiss this alert
                  dialog.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  </div>
);

export const CloseMethods = () => (
  <div className="flex max-w-2xl flex-col gap-8">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Using slot="close"</h3>
      <p className="text-sm text-muted">
        The simplest way to close a dialog. Add <code>slot="close"</code> to any Button component
        within the dialog. When clicked, it will automatically close the dialog.
      </p>
      <AlertDialog>
        <Button variant="secondary">Open Dialog</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.Header>
                <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Using slot="close"</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  Click either button below - both have <code>slot="close"</code> and will close the
                  dialog automatically.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Using Dialog render props</h3>
      <p className="text-sm text-muted">
        Access the <code>close</code> method from the Dialog's render props. This gives you full
        control over when and how to close the dialog, allowing you to add custom logic before
        closing.
      </p>
      <AlertDialog>
        <Button variant="secondary">Open Dialog</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {(renderProps) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="success" />
                    <AlertDialog.Heading>Using Dialog render props</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      The buttons below use the <code>close</code> method from render props. You can
                      add validation or other logic before calling <code>renderProps.close()</code>.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={() => renderProps.close()}>
                      Cancel
                    </Button>
                    <Button onPress={() => renderProps.close()}>Confirm</Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  </div>
);

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const state = useOverlayState();

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">With React.useState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Control the alert dialog using React's <code className="text-foreground">useState</code>{" "}
          hook for simple state management. Perfect for basic use cases.
        </p>
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-muted">
              Status:{" "}
              <span className="font-mono font-medium text-foreground">
                {isOpen ? "open" : "closed"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
              Open Dialog
            </Button>
            <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
              Toggle
            </Button>
          </div>
        </div>

        <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Controlled with useState()</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This alert dialog is controlled by React's <code>useState</code> hook. Pass{" "}
                  <code>isOpen</code> and <code>onOpenChange</code> props to manage the dialog state
                  externally.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">With useOverlayState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Use the <code className="text-foreground">useOverlayState</code> hook for a cleaner API
          with convenient methods like <code>open()</code>, <code>close()</code>, and{" "}
          <code>toggle()</code>.
        </p>
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-muted">
              Status:{" "}
              <span className="font-mono font-medium text-foreground">
                {state.isOpen ? "open" : "closed"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={state.open}>
              Open Dialog
            </Button>
            <Button size="sm" variant="tertiary" onPress={state.toggle}>
              Toggle
            </Button>
          </div>
        </div>

        <AlertDialog.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="success" />
                <AlertDialog.Heading>Controlled with useOverlayState()</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  The <code>useOverlayState</code> hook provides dedicated methods for common
                  operations. No need to manually create callbacks—just use{" "}
                  <code>state.open()</code>, <code>state.close()</code>, or{" "}
                  <code>state.toggle()</code>.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </div>
    </div>
  );
};

export const CustomTrigger = () => (
  <AlertDialog>
    <AlertDialog.Trigger className="group flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-xs select-none hover:bg-surface-secondary">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger-soft-foreground">
        <Icon className="size-6" icon="gravity-ui:trash-bin" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm font-semibold">Delete Item</p>
        <p className="text-xs text-muted">Permanently remove this item</p>
      </div>
    </AlertDialog.Trigger>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger">
              <Icon className="size-5" icon="gravity-ui:trash-bin" />
            </AlertDialog.Icon>
            <AlertDialog.Heading>Delete this item?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p>
              Use <code>AlertDialog.Trigger</code> to create custom trigger elements beyond standard
              buttons. This example shows a card-style trigger with icons and descriptive text.
            </p>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              Cancel
            </Button>
            <Button slot="close" variant="danger">
              Delete Item
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
);

export const CustomAnimations = () => {
  const animations = [
    {
      name: "Kinematic Scale",
      description:
        "Physics-based elastic scaling. Simulates a high-damping spring system with fast transient response and prolonged settling time. Ideal for Alert Dialogs and Modals.",
      icon: "gravity-ui:sparkles",
      classNames: {
        backdrop: [
          "data-[entering]:duration-400",
          "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:zoom-in-95",
          "data-[entering]:duration-400",
          "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:zoom-out-95",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
        ].join(" "),
      },
    },
    {
      name: "Fluid Slide",
      description:
        "Simulates movement through a medium with fluid resistance. Eliminates mechanical linearity for a natural, grounded feel. Perfect for Bottom Sheets or Toasts.",
      icon: "gravity-ui:arrow-up-from-line",
      classNames: {
        backdrop: [
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:slide-in-from-bottom-4",
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:slide-out-to-bottom-2",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
      },
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {animations.map(({classNames, description, icon, name}) => (
        <AlertDialog key={name}>
          <Button variant="secondary">{name}</Button>
          <AlertDialog.Backdrop className={classNames.backdrop}>
            <AlertDialog.Container className={classNames.container}>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent">
                    <Icon className="size-5" icon={icon} />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>{name} Animation</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p className="mt-1">{description}</p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Close
                  </Button>
                  <Button slot="close">Try Again</Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
};

export const CustomPortal = () => {
  const portalRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const setPortalRef = useCallback((node: HTMLDivElement | null) => {
    portalRef.current = node;
    setPortalContainer(node);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm">
          Render alert dialogs inside a custom container instead of <code>document.body</code>
        </p>
        <p className="text-sm text-muted">
          Apply <code className="rounded px-1 py-0.5 text-xs">transform: translateZ(0)</code> to the
          container to create a new stacking context.
        </p>
      </div>
      <div
        ref={setPortalRef}
        className="relative flex h-[380px] items-center justify-center overflow-hidden rounded bg-muted/20"
        // new stacking context
        style={{transform: "translate(0)"}}
      >
        {!!portalContainer && (
          <AlertDialog>
            <Button>Open Alert Dialog</Button>
            <AlertDialog.Backdrop className="h-full" UNSTABLE_portalContainer={portalContainer}>
              <AlertDialog.Container className="h-full max-h-full">
                <AlertDialog.Dialog className="h-full max-h-full sm:max-w-md">
                  <AlertDialog.CloseTrigger />
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent" />
                    <AlertDialog.Heading>Custom Portal</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body tabIndex={0}>
                    <p className="text-sm text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-sm text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-sm text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button slot="close" variant="tertiary">
                      Cancel
                    </Button>
                    <Button slot="close">Confirm</Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
