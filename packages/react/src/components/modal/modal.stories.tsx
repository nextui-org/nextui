import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useCallback, useRef, useState} from "react";

import {useOverlayState} from "../../hooks/use-overlay-state";
import {Button} from "../button";
import {Input} from "../input";
import {Label} from "../label";
import {Radio} from "../radio";
import {RadioGroup} from "../radio-group";
import {Surface} from "../surface";
import {TextField} from "../textfield";

import {Modal} from "./index";

export default {
  argTypes: {},
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Overlays/Modal",
} as Meta<typeof Modal>;

export const Default = () => {
  return (
    <Modal>
      <Button variant="secondary">Open Modal</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Icon className="size-5" icon="gravity-ui:rocket" />
              </Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export const Placements = () => {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Modal key={placement}>
          <Button variant="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
          <Modal.Backdrop>
            <Modal.Container placement={placement}>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:rocket" />
                  </Modal.Icon>
                  <Modal.Heading>
                    Placement: {placement.charAt(0).toUpperCase() + placement.slice(1)}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    This modal uses the <code>{placement}</code> placement option. Try different
                    placements to see how the modal positions itself on the screen.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    Continue
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
};

export const BackdropVariants = () => {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Backdrop variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:rocket" />
                  </Modal.Icon>
                  <Modal.Heading>
                    Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    This modal uses the <code>{variant}</code> backdrop variant. Compare the
                    different visual effects: opaque provides full opacity, blur adds a backdrop
                    filter, and transparent removes the background.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    Continue
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
};

export const Sizes = () => {
  const sizes = ["xs", "sm", "md", "lg", "cover", "full"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Modal key={size}>
          <Button variant="secondary">{size.charAt(0).toUpperCase() + size.slice(1)}</Button>
          <Modal.Backdrop>
            <Modal.Container size={size}>
              <Modal.Dialog>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:rocket" />
                  </Modal.Icon>
                  <Modal.Heading>
                    Size: {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    {size === "cover" ? (
                      <>
                        This modal uses the <code>cover</code> size variant. It spans the full
                        screen with margins: 16px on mobile and 40px on desktop. Maintains rounded
                        corners and standard padding. Perfect for cover-style content that needs
                        maximum width while preserving modal aesthetics.
                      </>
                    ) : size === "full" ? (
                      <>
                        This modal uses the <code>full</code> size variant. It occupies the entire
                        viewport without any margins, rounded corners, or shadows, creating a true
                        fullscreen experience. Ideal for immersive content or full-page
                        interactions.
                      </>
                    ) : (
                      <>
                        This modal uses the <code>{size}</code> size variant. On mobile devices, all
                        sizes adapt to near full-width for optimal viewing. On desktop, each size
                        provides a different maximum width to suit various content needs.
                      </>
                    )}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button slot="close">Confirm</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
};

export const CustomBackdrop = () => (
  <Modal>
    <Button variant="secondary">Custom Backdrop</Button>
    <Modal.Backdrop
      className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
      variant="blur"
    >
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[360px]">
          <Modal.Header className="items-center text-center">
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <Icon className="size-5" icon="gravity-ui:sparkles" />
            </Modal.Icon>
            <Modal.Heading>Premium Backdrop</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p>
              This backdrop features a sophisticated gradient that transitions from a dark color at
              the bottom to complete transparency at the top, combined with a smooth blur effect.
              The gradient automatically adapts its intensity for optimal contrast in both light and
              dark modes.
            </p>
          </Modal.Body>
          <Modal.Footer className="flex-col-reverse">
            <Button className="w-full" slot="close">
              Amazing!
            </Button>
            <Button className="w-full" slot="close" variant="secondary">
              Close
            </Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export const DismissBehavior = () => (
  <div className="flex max-w-sm flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isDismissable</h3>
      <p className="text-sm text-muted">
        Controls whether the modal can be dismissed by clicking the overlay backdrop. Defaults to{" "}
        <code>true</code>. Set to <code>false</code> to require explicit close action.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Backdrop isDismissable={false}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </Modal.Icon>
                <Modal.Heading>isDismissable = false</Modal.Heading>
                <p className="text-sm leading-5 text-muted">
                  Clicking the backdrop won't close this modal
                </p>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Try clicking outside this modal on the overlay - it won't close. You must use the
                  close button or press ESC to dismiss it.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
      <p className="text-sm text-muted">
        Controls whether the ESC key can dismiss the modal. When set to <code>true</code>, the ESC
        key will be disabled and users must use explicit close actions.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Backdrop isKeyboardDismissDisabled>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </Modal.Icon>
                <Modal.Heading>isKeyboardDismissDisabled = true</Modal.Heading>
                <p className="text-sm leading-5 text-muted">ESC key is disabled</p>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Press ESC - nothing happens. You must use the close button or click the overlay
                  backdrop to dismiss this modal.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  </div>
);

export const CloseMethods = () => (
  <div className="flex max-w-2xl flex-col gap-8">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Using slot="close"</h3>
      <p className="text-sm text-muted">
        The simplest way to close a modal. Add <code>slot="close"</code> to any Button component
        within the modal. When clicked, it will automatically close the modal.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </Modal.Icon>
                <Modal.Heading>Using slot="close"</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Click either button below - both have <code>slot="close"</code> and will close the
                  modal automatically.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Using Dialog render props</h3>
      <p className="text-sm text-muted">
        Access the <code>close</code> method from the Dialog's render props. This gives you full
        control over when and how to close the modal, allowing you to add custom logic before
        closing.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              {(renderProps) => (
                <>
                  <Modal.Header>
                    <Modal.Icon className="bg-success-soft text-success-soft-foreground">
                      <Icon className="size-5" icon="gravity-ui:circle-check" />
                    </Modal.Icon>
                    <Modal.Heading>Using Dialog render props</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      The buttons below use the <code>close</code> method from render props. You can
                      add validation or other logic before calling <code>renderProps.close()</code>.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onPress={() => renderProps.close()}>
                      Cancel
                    </Button>
                    <Button onPress={() => renderProps.close()}>Confirm</Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  </div>
);

export const ScrollComparison = () => {
  const [scroll, setScroll] = useState<"inside" | "outside">("inside");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        orientation="horizontal"
        value={scroll}
        onChange={(value) => setScroll(value as "inside" | "outside")}
      >
        <Radio value="inside">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Inside</Label>
          </Radio.Content>
        </Radio>
        <Radio value="outside">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Outside</Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <Modal>
        <Button variant="secondary">
          Open Modal ({scroll.charAt(0).toUpperCase() + scroll.slice(1)})
        </Button>
        <Modal.Backdrop>
          <Modal.Container scroll={scroll}>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.Header>
                <Modal.Heading>
                  Scroll: {scroll.charAt(0).toUpperCase() + scroll.slice(1)}
                </Modal.Heading>
                <p className="text-sm leading-5 text-muted">
                  Compare scroll behaviors - inside keeps content scrollable within the modal,
                  outside allows page scrolling
                </p>
              </Modal.Header>
              <Modal.Body tabIndex={0}>
                {Array.from({length: 30}).map((_, i) => (
                  <p key={i} className="mb-3">
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                  </p>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const state = useOverlayState();

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">With React.useState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Control the modal using React's <code className="text-foreground">useState</code> hook for
          simple state management. Perfect for basic use cases.
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
              Open Modal
            </Button>
            <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
              Toggle
            </Button>
          </div>
        </div>

        <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Icon className="size-5" icon="gravity-ui:circle-check" />
                </Modal.Icon>
                <Modal.Heading>Controlled with useState()</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  This modal is controlled by React's <code>useState</code> hook. Pass{" "}
                  <code>isOpen</code> and <code>onOpenChange</code> props to manage the modal state
                  externally.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
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
              Open Modal
            </Button>
            <Button size="sm" variant="tertiary" onPress={state.toggle}>
              Toggle
            </Button>
          </div>
        </div>

        <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-success-soft text-success-soft-foreground">
                  <Icon className="size-5" icon="gravity-ui:circle-check" />
                </Modal.Icon>
                <Modal.Heading>Controlled with useOverlayState()</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  The <code>useOverlayState</code> hook provides dedicated methods for common
                  operations. No need to manually create callbacks—just use{" "}
                  <code>state.open()</code>, <code>state.close()</code>, or{" "}
                  <code>state.toggle()</code>.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </div>
    </div>
  );
};

export const WithForm = () => (
  <Modal>
    <Button variant="secondary">Open Contact Form</Button>
    <Modal.Backdrop>
      <Modal.Container placement="auto">
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <Icon className="size-5" icon="gravity-ui:envelope" />
            </Modal.Icon>
            <Modal.Heading>Contact Us</Modal.Heading>
            <p className="mt-1.5 text-sm leading-5 text-muted">
              Fill out the form below and we'll get back to you. The modal adapts automatically when
              the keyboard appears on mobile.
            </p>
          </Modal.Header>
          <Modal.Body>
            <Surface variant="default">
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>Name</Label>
                  <Input placeholder="Enter your name" />
                </TextField>
                <TextField className="w-full" name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="Enter your email" />
                </TextField>
                <TextField className="w-full" name="phone" type="tel">
                  <Label>Phone</Label>
                  <Input placeholder="Enter your phone number" />
                </TextField>
                <TextField className="w-full" name="company">
                  <Label>Company</Label>
                  <Input placeholder="Enter your company name" />
                </TextField>
                <TextField className="w-full" name="message">
                  <Label>Message</Label>
                  <Input placeholder="Enter your message" />
                </TextField>
              </form>
            </Surface>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close">Send Message</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export const CustomTrigger = () => (
  <Modal>
    <Modal.Trigger className="group flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-xs select-none hover:bg-surface-secondary">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-foreground">
        <Icon className="size-6" icon="gravity-ui:gear" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm font-semibold">Settings</p>
        <p className="text-xs text-muted">Manage your preferences</p>
      </div>
    </Modal.Trigger>
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[360px]">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <Icon className="size-5" icon="gravity-ui:gear" />
            </Modal.Icon>
            <Modal.Heading>Settings</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p>
              Use <code>Modal.Trigger</code> to create custom trigger elements beyond standard
              buttons. This example shows a card-style trigger with icons and descriptive text.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close">Save</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export const CustomAnimations = () => {
  const animations = [
    {
      name: "Kinematic Scale",
      description:
        "Physics-based elastic scaling. Simulates a high-damping spring system with fast transient response and prolonged settling time. Ideal for Modals and Popovers.",
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
        <Modal key={name}>
          <Button variant="secondary">{name}</Button>
          <Modal.Backdrop className={classNames.backdrop}>
            <Modal.Container className={classNames.container}>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon={icon} />
                  </Modal.Icon>
                  <Modal.Heading>{name} Animation</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p className="mt-1">{description}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="tertiary">
                    Close
                  </Button>
                  <Button slot="close">Try Again</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
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
          Render modals inside a custom container instead of <code>document.body</code>
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
          <Modal>
            <Button>Open Modal</Button>
            <Modal.Backdrop className="h-full" UNSTABLE_portalContainer={portalContainer}>
              <Modal.Container className="h-full max-h-full">
                <Modal.Dialog className="h-full max-h-full sm:max-w-md">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Heading>Custom Portal</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body tabIndex={0}>
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
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        )}
      </div>
    </div>
  );
};
