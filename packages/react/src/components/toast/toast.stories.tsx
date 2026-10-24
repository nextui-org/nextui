import type {ToastContentValue, ToastVariants} from "./index";
import type {HeroUIToastOptions} from "./toast-queue";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Modal} from "../modal";

import {
  DEFAULT_TOAST_TIMEOUT,
  Toast,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastQueue,
  ToastTitle,
  toast,
} from "./index";

type Placement = NonNullable<ToastVariants["placement"]>;

interface ToastStoryProps extends Omit<HeroUIToastOptions, "variant"> {
  placement?: Placement;
}

const meta: Meta<ToastStoryProps> = {
  argTypes: {
    placement: {
      control: "radio",
      options: ["top start", "top", "top end", "bottom start", "bottom", "bottom end"],
    },
    timeout: {
      control: "number",
    },
  },
  args: {
    placement: "bottom",
    timeout: undefined,
  },
  parameters: {
    layout: "centered",
  },
  title: "Components/Feedback/Toast",
};

export default meta;

const Template = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          className="text-muted"
          size="sm"
          variant="tertiary"
          onPress={() => {
            const id = toast("You have been invited to join a team", {
              actionProps: {
                children: "Dismiss",
                onPress: () => toast.close(id),
                variant: "tertiary",
              },
              description: "Bob sent you an invitation to join HeroUI team",
              indicator: <Icon icon="gravity-ui:persons" />,
              variant: "default",
            });
          }}
        >
          Default toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const id = toast.info("You have 2 credits left", {
              actionProps: {children: "Upgrade", onPress: () => toast.close(id)},
              description: "Get a paid plan for more credits",
            });
          }}
        >
          Accent toast
        </Button>
        <Button
          className="text-success"
          size="sm"
          variant="tertiary"
          onPress={() => {
            const id = toast.success("You have upgraded your plan", {
              actionProps: {
                children: "Billing",
                className: "bg-success text-success-foreground",
                onPress: () => toast.close(id),
              },
              description: "You can continue using HeroUI Chat",
            });
          }}
        >
          Success toast
        </Button>
        <Button
          className="text-warning"
          size="sm"
          variant="tertiary"
          onPress={() => {
            const id = toast.warning("You have no credits left", {
              actionProps: {
                children: "Upgrade",
                className: "bg-warning text-warning-foreground",
                onPress: () => toast.close(id),
              },
              description: "Upgrade to a paid plan to continue",
            });
          }}
        >
          Warning toast
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() => {
            const id = toast.danger("Storage is full", {
              actionProps: {children: "Remove", onPress: () => toast.close(id), variant: "danger"},
              description:
                "Remove files to release space. Adding more text to demonstrate longer content display",
              indicator: <Icon icon="gravity-ui:hard-drive" />,
            });
          }}
        >
          Danger toast
        </Button>
      </div>
    </div>
  );
};

export const Default = {
  args: {},
  render: Template,
};

const placements = ["top start", "top", "top end", "bottom start", "bottom", "bottom end"] as const;

// Create a separate queue for each placement
const placementQueues = Object.fromEntries(
  placements.map((p) => [p, new ToastQueue({maxVisibleToasts: 3})]),
) as Record<Placement, ToastQueue>;

const PlacementsTemplate = () => {
  const showToast = (placement: Placement) => {
    placementQueues[placement].add({
      description: "Event has been created",
      title: "Event created",
      variant: "default",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      {/* Render a ToastProvider for each placement */}
      {placements.map((p) => (
        <Toast.Provider
          key={p}
          aria-label={`${p} notifications`}
          placement={p}
          queue={placementQueues[p]}
        />
      ))}
      <div className="flex max-w-xs flex-wrap justify-center gap-2">
        {placements.map((p) => (
          <Button key={p} size="sm" variant="secondary" onPress={() => showToast(p)}>
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Placements = {
  render: PlacementsTemplate,
};

// Expanded - Keep the stack open at natural height
const expandedQueue = new ToastQueue();

const ExpandedTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider
        isExpanded
        aria-label="Expanded notifications"
        placement="bottom"
        queue={expandedQueue}
      />
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          expandedQueue.add({
            title: "Simple message",
            variant: "default",
          });
          setTimeout(() => {
            expandedQueue.add({
              title: "Operation completed",
              variant: "success",
            });
          }, 400);
          setTimeout(() => {
            expandedQueue.add({
              title: "New update available",
              variant: "accent",
            });
          }, 800);
        }}
      >
        Show 3 toasts
      </Button>
    </div>
  );
};

export const Expanded = {
  render: ExpandedTemplate,
};

// Simple Toast - Title only, minimal examples
const SimpleToastTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button size="sm" variant="secondary" onPress={() => toast("Simple message")}>
          Default
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.success("Operation completed")}>
          Success
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.info("New update available")}>
          Info
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => toast.warning("Please check your settings")}
        >
          Warning
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.danger("Something went wrong")}>
          Error
        </Button>
      </div>
    </div>
  );
};

export const SimpleToast = {
  render: SimpleToastTemplate,
};

// Promise Toast - Async operations with loading/success/error states
const PromiseToastTemplate = () => {
  const uploadFile = (): Promise<{filename: string; size: number}> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({filename: "document.pdf", size: 1024}), 2000);
    });
  };

  const createEvent = (): Promise<never> => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Network error. Please try again.")), 2000);
    });
  };

  const saveData = (): Promise<{count: number}> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({count: 42});
        } else {
          reject(new Error("Failed to save data"));
        }
      }, 2000);
    });
  };

  const fetchUser = (): Promise<{name: string; email: string}> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({name: "John Doe", email: "john@example.com"}), 2000);
    });
  };

  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(uploadFile(), {
              error: "Failed to upload file",
              loading: "Uploading file...",
              success: (data) => `File ${data.filename} uploaded (${data.size}KB)`,
            });
          }}
        >
          Upload file
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(createEvent(), {
              error: (err) => err.message,
              loading: "Creating event...",
              success: "Event created",
            });
          }}
        >
          Create event (error)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(saveData(), {
              error: (err) => err.message,
              loading: "Saving changes...",
              success: (data) => `Saved ${data.count} items`,
            });
          }}
        >
          Save data (random)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(fetchUser(), {
              error: "Failed to fetch user",
              loading: "Loading user...",
              success: (data) => `Welcome back, ${data.name}!`,
            });
          }}
        >
          Fetch user
        </Button>
      </div>
    </div>
  );
};

export const PromiseToast = {
  render: PromiseToastTemplate,
};

// Custom Indicator - Custom or no indicators
const CustomIndicatorTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <Button
        size="sm"
        variant="secondary"
        onPress={() =>
          toast("Custom icon indicator", {
            indicator: <Icon icon="gravity-ui:star" />,
          })
        }
      >
        Custom indicator
      </Button>
    </div>
  );
};

export const CustomIndicator = {
  render: CustomIndicatorTemplate,
};

// Loading State - Manual loading toasts
const LoadingStateTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const loadingId = toast("Uploading file...", {
              description: "Please wait while we upload your file",
              isLoading: true,
              timeout: 0,
            });

            setTimeout(() => {
              toast.update(loadingId, "File uploaded", {
                description: "Your file has been uploaded successfully",
                timeout: DEFAULT_TOAST_TIMEOUT,
                variant: "success",
              });
            }, 3000);
          }}
        >
          Upload with loading
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const loadingId = toast("Processing payment...", {
              isLoading: true,
              timeout: 0,
            });

            setTimeout(() => {
              toast.update(loadingId, "Payment processed", {
                description: "Your payment has been processed successfully",
                timeout: DEFAULT_TOAST_TIMEOUT,
                variant: "success",
              });
            }, 2500);
          }}
        >
          Payment processing
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const loadingId = toast("Saving changes...", {
              isLoading: true,
              timeout: 0,
            });

            setTimeout(() => {
              toast.update(loadingId, "Failed to save", {
                description: "Please try again",
                timeout: DEFAULT_TOAST_TIMEOUT,
                variant: "danger",
              });
            }, 2000);
          }}
        >
          Loading to error
        </Button>
      </div>
    </div>
  );
};

export const LoadingState = {
  render: LoadingStateTemplate,
};

// With Callbacks - Timeout and onClose
const WithCallbacksTemplate = () => {
  const [closedHistory, setClosedHistory] = React.useState<Array<{message: string; time: string}>>(
    [],
  );

  const addToHistory = (message: string) => {
    const time = new Date().toLocaleTimeString();

    setClosedHistory((prev) => [{message, time}, ...prev].slice(0, 5));
  };

  return (
    <div className="flex h-full max-w-2xl flex-col items-center justify-center gap-6">
      <Toast.Provider placement="bottom" />

      {/* Toast Buttons */}
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("File saved", {
              onClose: () => {
                addToHistory("File saved (closed after 3 seconds)");
              },
              timeout: 3000,
            })
          }
        >
          Custom timeout (3s)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("Changes saved", {
              onClose: () => {
                addToHistory("Changes saved (closed after 10 seconds)");
              },
              timeout: 10000,
            })
          }
        >
          Custom timeout (10s)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.success("Event created", {
              onClose: () => {
                addToHistory("Event created (closed after default timeout)");
              },
            })
          }
        >
          With onClose callback
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("Important notification", {
              description: "This toast will stay until dismissed",
              onClose: () => {
                addToHistory("Important notification (manually closed)");
              },
              timeout: 0,
            })
          }
        >
          Persistent toast
        </Button>
      </div>

      {/* Closed History Panel */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Closed History</h3>
          {closedHistory.length > 0 && (
            <Button
              className="h-6 text-xs"
              size="sm"
              variant="tertiary"
              onPress={() => setClosedHistory([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="min-h-[120px] space-y-2 rounded-lg border border-border bg-surface p-4">
          {closedHistory.length === 0 ? (
            <p className="text-sm text-muted">No toasts closed yet. Try closing one above!</p>
          ) : (
            closedHistory.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="flex animate-in items-start justify-between gap-3 rounded-md border border-border bg-default px-3 py-2 text-sm duration-200 fade-in slide-in-from-top-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex-1">
                  <span className="font-medium">{item.message}</span>
                  <span className="ms-2 text-xs text-muted">({item.time})</span>
                </div>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const WithCallbacks = {
  render: WithCallbacksTemplate,
};

// Custom Toast - Custom rendering with children
const CustomToastTemplate = () => {
  const customQueue = new ToastQueue();

  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" queue={customQueue}>
        {({toast: toastItem}) => {
          const content = toastItem.content as ToastContentValue;

          return (
            <Toast
              className="rounded-xl border border-border"
              toast={toastItem}
              variant={content.variant}
            >
              <ToastContent>
                <div className="flex items-center gap-2">
                  <ToastIndicator className="text-accent" variant={content.variant} />
                  <div className="flex flex-col pe-6">
                    {content.title ? (
                      <ToastTitle className="text-accent">{content.title}</ToastTitle>
                    ) : null}
                    {content.description ? (
                      <ToastDescription>{content.description}</ToastDescription>
                    ) : null}
                  </div>
                </div>
              </ToastContent>
              <Toast.CloseButton className="absolute end-2 top-1/2 -translate-y-1/2 border-none bg-transparent opacity-100 [&>svg]:size-4" />
            </Toast>
          );
        }}
      </Toast.Provider>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          customQueue.add({
            description: "This uses a custom render function",
            title: "Custom layout toast",
            variant: "default",
          });
        }}
      >
        Custom toast
      </Button>
    </div>
  );
};

export const CustomToast = {
  render: CustomToastTemplate,
};

// Custom Queue - Multiple queue instances
const CustomQueueTemplate = () => {
  const notificationQueue = new ToastQueue({maxVisibleToasts: 2});
  const errorQueue = new ToastQueue({maxVisibleToasts: 3});
  const successQueue = new ToastQueue({maxVisibleToasts: 1});

  return (
    <div className="flex h-full max-w-4xl items-center justify-center gap-4">
      {/* Notification Queue */}
      <Toast.Provider
        aria-label="General notifications"
        placement="bottom"
        queue={notificationQueue}
      />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            notificationQueue.add({
              description: "You have a new message",
              title: "New notification",
              variant: "default",
            });
          }}
        >
          Add notification (max 2)
        </Button>
      </div>

      {/* Error Queue */}
      <Toast.Provider aria-label="Error notifications" placement="top" queue={errorQueue} />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() => {
            errorQueue.add({
              description: "Failed to save changes",
              title: "Error occurred",
              variant: "danger",
            });
          }}
        >
          Add error (max 3)
        </Button>
      </div>

      {/* Success Queue */}
      <Toast.Provider
        aria-label="Success notifications"
        placement="bottom end"
        queue={successQueue}
      />
      <div className="flex justify-center gap-2">
        <Button
          className="text-success"
          size="sm"
          variant="secondary"
          onPress={() => {
            successQueue.add({
              description: `Operation ${Date.now()}`,
              title: "Success!",
              variant: "success",
            });
          }}
        >
          Add success (max 1)
        </Button>
      </div>
    </div>
  );
};

export const CustomQueue = {
  render: CustomQueueTemplate,
};

// Toast in Modal - toasts stay visible above a full-screen overlay (modal)
const ToastInModalTemplate = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <Modal>
        <Button size="sm" variant="secondary">
          Open modal
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Icon className="size-5" icon="gravity-ui:bell" />
                </Modal.Icon>
                <Modal.Heading>Notifications</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>Trigger a toast from inside the modal to see it render above the backdrop.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="w-full"
                  variant="secondary"
                  onPress={() =>
                    toast.success("Settings saved", {
                      description: "Your changes have been applied",
                    })
                  }
                >
                  Show toast
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export const ToastInModal = {
  render: ToastInModalTemplate,
};
