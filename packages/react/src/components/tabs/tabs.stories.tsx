import type {Key} from "../rac";
import type {Meta, StoryObj} from "@storybook/react";

import React from "react";
import {cn} from "tailwind-variants";

import {Tabs} from "./index";

const meta = {
  argTypes: {
    align: {
      control: {type: "select"},
      options: ["start", "center", "end"],
    },
  },
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  title: "Components/Navigation/Tabs",
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="overview">
              Overview
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="analytics">
              Analytics
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="reports">
              Reports
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="overview">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const overflowItems = [
  {id: "overview", label: "Overview"},
  {id: "analytics", label: "Analytics"},
  {id: "reports", label: "Reports"},
  {id: "performance", label: "Performance"},
  {id: "engagement", label: "Engagement"},
  {id: "audience", label: "Audience"},
  {id: "acquisition", label: "Acquisition"},
  {id: "retention", label: "Retention"},
  {id: "settings", label: "Settings"},
];

const OverflowTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[400px]">
      <Tabs {...args}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Overflow options">
            {overflowItems.map((item) => (
              <Tabs.Tab key={item.id} id={item.id}>
                {item.label}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        {overflowItems.map((item) => (
          <Tabs.Panel key={item.id} className="pt-4" id={item.id}>
            <p>{item.label} panel content.</p>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

const VerticalTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args} orientation="vertical">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Vertical tabs">
            <Tabs.Tab id="account">
              Account
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="security">
              Security
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="notifications">
              Notifications
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="billing">
              Billing
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="px-4" id="account">
          <h3 className="mb-2 font-semibold">Account Settings</h3>
          <p className="text-sm text-gray-600">Manage your account information and preferences.</p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="security">
          <h3 className="mb-2 font-semibold">Security Settings</h3>
          <p className="text-sm text-gray-600">
            Configure two-factor authentication and password settings.
          </p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="notifications">
          <h3 className="mb-2 font-semibold">Notification Preferences</h3>
          <p className="text-sm text-gray-600">
            Choose how and when you want to receive notifications.
          </p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="billing">
          <h3 className="mb-2 font-semibold">Billing Information</h3>
          <p className="text-sm text-gray-600">
            View and manage your subscription and payment methods.
          </p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const DisabledTabTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs {...args}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Tabs with disabled">
          <Tabs.Tab id="active">
            Active
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab isDisabled id="disabled">
            Disabled
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="available">
            Available
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="disabled">
        <p>This content cannot be accessed.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="available">
        <p>This tab is also available for selection.</p>
      </Tabs.Panel>
    </Tabs>
  </div>
);

const DefaultSelectedTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs defaultSelectedKey="default" {...args}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Tabs with default options">
          <Tabs.Tab id="active">
            Active
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="default">
            Default
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="available">
            Available
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="default">
        <p>This tab is the default selection.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="available">
        <p>This tab is available for selection as well.</p>
      </Tabs.Panel>
    </Tabs>
  </div>
);

const ControlledSelectionTemplate = (args: Story["args"]) => {
  const [selectedKey, setSelectedKey] = React.useState<Key>("controlled");

  return (
    <div className="w-[600px]">
      <p className="my-2">Selected: {selectedKey}</p>
      <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} {...args}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Tabs with controlled options">
            <Tabs.Tab id="active">
              Active
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="controlled">
              Controlled
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="available">
              Available
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="active">
          <p>This tab is active and can be selected.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="controlled">
          <p>This tab is the controlled selection.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="available">
          <p>This tab is available for selection as well.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const CustomStyleTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[380px]">
      <Tabs {...args}>
        <Tabs.ListContainer>
          <Tabs.List
            aria-label="Options"
            className="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
          >
            <Tabs.Tab id="daily">
              Daily
              <Tabs.Indicator className="bg-accent" />
            </Tabs.Tab>
            <Tabs.Tab id="weekly">
              Weekly
              <Tabs.Indicator className="bg-accent" />
            </Tabs.Tab>
            <Tabs.Tab id="bi-weekly">
              Bi-Weekly
              <Tabs.Indicator className="bg-accent" />
            </Tabs.Tab>
            <Tabs.Tab id="monthly">
              Monthly
              <Tabs.Indicator className="bg-accent" />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        {[
          ["daily", "Daily activity"],
          ["weekly", "Weekly activity"],
          ["bi-weekly", "Bi-weekly activity"],
          ["monthly", "Monthly activity"],
        ].map(([id, label]) => (
          <Tabs.Panel key={id} className="pt-4" id={id}>
            {label}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

const WithSeparatorTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="overview">
              Overview
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="analytics">
              <Tabs.Separator />
              Analytics
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="reports">
              <Tabs.Separator />
              Reports
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="overview">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const SecondaryTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args} variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="overview">
              Overview
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="analytics">
              Analytics
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="reports">
              Reports
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="overview">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const SecondaryVerticalTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args} orientation="vertical" variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Vertical tabs">
            <Tabs.Tab id="account">
              Account
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="security">
              Security
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="notifications">
              Notifications
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="billing">
              Billing
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="px-4" id="account">
          <h3 className="mb-2 font-semibold">Account Settings</h3>
          <p className="text-sm text-gray-600">Manage your account information and preferences.</p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="security">
          <h3 className="mb-2 font-semibold">Security Settings</h3>
          <p className="text-sm text-gray-600">
            Configure two-factor authentication and password settings.
          </p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="notifications">
          <h3 className="mb-2 font-semibold">Notification Preferences</h3>
          <p className="text-sm text-gray-600">
            Choose how and when you want to receive notifications.
          </p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="billing">
          <h3 className="mb-2 font-semibold">Billing Information</h3>
          <p className="text-sm text-gray-600">
            View and manage your subscription and payment methods.
          </p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const Showcase1Template = (args: Story["args"]) => {
  const DEFAULT_ZOOM = "200";
  const [selectedZoom, setSelectedZoom] = React.useState<Key>(DEFAULT_ZOOM);

  const zoomLevels = [200, 100, 48, 35, 28, 24, 13, "macro"];

  const zoomXMap: Record<number | "macro", string> = {
    [200]: "8x",
    [100]: "4x",
    [48]: "2x",
    [35]: "1.5x",
    [28]: "1.2x",
    [24]: "1x",
    [13]: "0.5x",
    ["macro"]: "0.2x",
  };

  const zoomImgMap: Record<number | "macro", string> = {
    [200]:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/200mm__c8kya18imsqe_large_2x.jpg",
    [100]:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/100mm__cykxcenbhvue_large_2x.jpg",
    [48]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/48mm__bmrwps1q6w76_large_2x.jpg",
    [35]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/35mm__k375wbkrjp2e_large_2x.jpg",
    [28]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/28mm__fylmxo06jq6i_large_2x.jpg",
    [24]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/24mm__e54cxtdkdrwy_large_2x.jpg",
    [13]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/13mm__dzafu9h1kaye_large_2x.jpg",
    ["macro"]:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/macro__bb7oud7ri2o2_large_2x.jpg",
  };

  return (
    <div className="w-full">
      <Tabs
        {...args}
        className="flex flex-col items-center gap-0"
        selectedKey={selectedZoom}
        onSelectionChange={setSelectedZoom}
      >
        <Tabs.ListContainer className="scrollbar-hide my-4 w-fit max-w-full overflow-x-auto bg-transparent sm:my-6">
          <Tabs.List
            aria-label="Options"
            className="w-fit min-w-min rounded-full bg-[#333336] *:h-8 *:w-fit *:px-3 *:text-xs *:font-normal *:text-white *:opacity-80 *:hover:opacity-100 *:data-[selected=true]:text-black sm:*:h-9 sm:*:px-4 sm:*:text-sm"
          >
            {zoomLevels.map((zoom) => (
              <Tabs.Tab
                key={zoom}
                className={zoom === "macro" ? "capitalize" : ""}
                id={zoom.toString()}
              >
                {zoom} {zoom === "macro" ? "" : "mm"}
                <Tabs.Indicator className="rounded-full bg-white shadow-none duration-[320ms]" />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        <div className="relative order-first aspect-[7/5] w-full max-w-[840px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          {Object.keys(zoomImgMap).map((key) => (
            <Tabs.Panel key={key} shouldForceMount className="absolute inset-0" id={key}>
              <img
                alt={`Camera sample at ${zoomXMap[key]} zoom`}
                aria-hidden={selectedZoom !== key}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity delay-200 duration-[800ms] ease-in-out data-[selected=true]:opacity-100 data-[selected=true]:delay-0"
                data-selected={selectedZoom === key}
                src={zoomImgMap[key]}
              />
            </Tabs.Panel>
          ))}
        </div>
        <div className="relative h-10 w-10">
          {Object.keys(zoomXMap).map((key) => (
            <p
              key={key}
              aria-hidden={selectedZoom !== key}
              data-selected={selectedZoom === key}
              className={cn(
                "absolute start-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-75 text-[21px] font-medium text-foreground opacity-0 transition-[scale,opacity] duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] ease-in-out-quad data-[selected=true]:scale-100 data-[selected=true]:opacity-100 data-[selected=true]:delay-200",
                {
                  "sr-only": selectedZoom !== key,
                },
              )}
            >
              {zoomXMap[key]}
            </p>
          ))}
        </div>
        <footer className="mt-4 w-full px-4 text-center text-xs text-muted/30 sm:text-sm">
          <a href="https://www.apple.com/iphone-17-pro/" rel="noopener noreferrer" target="_blank">
            Showcase based on Apple&apos;s iPhone 17 Pro camera zoom showcase
          </a>
        </footer>
      </Tabs>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: null,
  },
  render: DefaultTemplate,
};

export const Overflow: Story = {
  args: {
    children: null,
  },
  render: OverflowTemplate,
};

export const Vertical: Story = {
  args: {
    children: null,
    orientation: "vertical",
  },
  render: VerticalTemplate,
};

export const VerticalAlign: Story = {
  args: {
    align: "end",
    children: null,
    orientation: "vertical",
    variant: "secondary",
  },
  render: VerticalTemplate,
};

export const WithDisabledTab: Story = {
  args: {
    children: null,
  },
  render: DisabledTabTemplate,
};

export const WithDefaultSelectedTab: Story = {
  args: {
    children: null,
  },
  render: DefaultSelectedTemplate,
};

export const WithControlledSelectionTab: Story = {
  args: {
    children: null,
  },
  render: ControlledSelectionTemplate,
};

export const WithCustomStyle: Story = {
  args: {
    children: null,
  },
  render: CustomStyleTemplate,
};

export const WithSeparator: Story = {
  args: {
    children: null,
  },
  render: WithSeparatorTemplate,
};

export const Showcase1: Story = {
  args: {
    children: null,
  },
  render: Showcase1Template,
  name: "Showcases/Apple iPhone 17 Pro cameras",
};

export const Secondary: Story = {
  args: {
    children: null,
    variant: "secondary",
  },
  render: SecondaryTemplate,
};

export const SecondaryVertical: Story = {
  args: {
    children: null,
    orientation: "vertical",
    variant: "secondary",
  },
  render: SecondaryVerticalTemplate,
};
