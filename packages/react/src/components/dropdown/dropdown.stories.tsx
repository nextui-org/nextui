import type {Selection} from "@react-types/shared";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import * as React from "react";

import {Avatar} from "../avatar";
import {Button} from "../button";
import {Description} from "../description";
import {Header} from "../header";
import {Kbd} from "../kbd";
import {Label} from "../label";
import {Separator} from "../separator";

import {Dropdown} from "./index";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Collections/Dropdown",
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Dropdown.Item id="new-file" textValue="New file">
              <Label>New file</Label>
            </Dropdown.Item>
            <Dropdown.Item id="copy-link" textValue="Copy link">
              <Label>Copy link</Label>
            </Dropdown.Item>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <Label>Edit file</Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
              <Label>Delete file</Label>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithSingleSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(["apple"]));

    return (
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          Fruit
        </Button>
        <Dropdown.Popover className="min-w-[256px]">
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="single"
            onSelectionChange={setSelected}
          >
            <Dropdown.Section>
              <Header>Select a fruit</Header>
              <Dropdown.Item id="apple" textValue="Apple">
                <Dropdown.ItemIndicator />
                <Label>Apple</Label>
              </Dropdown.Item>
              <Dropdown.Item id="banana" textValue="Banana">
                <Dropdown.ItemIndicator />
                <Label>Banana</Label>
              </Dropdown.Item>
              <Dropdown.Item id="cherry" textValue="Cherry">
                <Dropdown.ItemIndicator />
                <Label>Cherry</Label>
              </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Item id="orange" textValue="Orange">
              <Dropdown.ItemIndicator />
              <Label>Orange</Label>
            </Dropdown.Item>
            <Dropdown.Item id="pear" textValue="Pear">
              <Dropdown.ItemIndicator />
              <Label>Pear</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  },
};

export const SingleWithCustomIndicator: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(["apple"]));

    const CustomCheckmarkIcon = (
      <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
          className="text-accent"
          clipRule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m3.1-8.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );

    return (
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          Fruits
        </Button>
        <Dropdown.Popover className="min-w-[256px]">
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="single"
            onSelectionChange={setSelected}
          >
            <Dropdown.Section>
              <Header>Select a fruit</Header>
              <Dropdown.Item id="apple" textValue="Apple">
                <Dropdown.ItemIndicator>
                  {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
                </Dropdown.ItemIndicator>
                <Label>Apple</Label>
              </Dropdown.Item>
              <Dropdown.Item id="banana" textValue="Banana">
                <Dropdown.ItemIndicator>
                  {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
                </Dropdown.ItemIndicator>
                <Label>Banana</Label>
              </Dropdown.Item>
              <Dropdown.Item id="cherry" textValue="Cherry">
                <Dropdown.ItemIndicator>
                  {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
                </Dropdown.ItemIndicator>
                <Label>Cherry</Label>
              </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Item id="orange" textValue="Orange">
              <Dropdown.ItemIndicator>
                {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
              </Dropdown.ItemIndicator>
              <Label>Orange</Label>
            </Dropdown.Item>
            <Dropdown.Item id="pear" textValue="Pear">
              <Dropdown.ItemIndicator>
                {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
              </Dropdown.ItemIndicator>
              <Label>Pear</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  },
};

export const WithMultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(["apple"]));

    return (
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          Preferred Fruits
        </Button>
        <Dropdown.Popover className="min-w-[256px]">
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="multiple"
            onSelectionChange={setSelected}
          >
            <Dropdown.Section>
              <Header>Select a fruit</Header>
              <Dropdown.Item id="apple" textValue="Apple">
                <Dropdown.ItemIndicator />
                <Label>Apple</Label>
              </Dropdown.Item>
              <Dropdown.Item id="banana" textValue="Banana">
                <Dropdown.ItemIndicator />
                <Label>Banana</Label>
              </Dropdown.Item>
              <Dropdown.Item id="cherry" textValue="Cherry">
                <Dropdown.ItemIndicator />
                <Label>Cherry</Label>
              </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Item id="orange" textValue="Orange">
              <Dropdown.ItemIndicator />
              <Label>Orange</Label>
            </Dropdown.Item>
            <Dropdown.Item id="pear" textValue="Pear">
              <Dropdown.ItemIndicator />
              <Label>Pear</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  },
};

export const WithSectionLevelSelection: Story = {
  render: () => {
    const [textStyles, setTextStyles] = React.useState<Selection>(new Set(["bold", "italic"]));
    const [textAlignment, setTextAlignment] = React.useState<Selection>(new Set(["left"]));

    return (
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          Styles
        </Button>
        <Dropdown.Popover className="min-w-[256px]">
          <Dropdown.Menu>
            <Dropdown.Section>
              <Header>Actions</Header>
              <Dropdown.Item id="cut" textValue="Cut">
                <Label>Cut</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>X</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
              <Dropdown.Item id="copy" textValue="Copy">
                <Label>Copy</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>C</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
              <Dropdown.Item id="paste" textValue="Paste">
                <Label>Paste</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>U</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
            </Dropdown.Section>
            <Separator />
            <Dropdown.Section
              selectedKeys={textStyles}
              selectionMode="multiple"
              onSelectionChange={setTextStyles}
            >
              <Header>Text Style</Header>
              <Dropdown.Item id="bold" textValue="Bold">
                <Dropdown.ItemIndicator />
                <Label>Bold</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>B</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
              <Dropdown.Item id="italic" textValue="Italic">
                <Dropdown.ItemIndicator />
                <Label>Italic</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>I</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
              <Dropdown.Item id="underline" textValue="Underline">
                <Dropdown.ItemIndicator />
                <Label>Underline</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>U</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
            </Dropdown.Section>
            <Separator />
            <Dropdown.Section
              selectedKeys={textAlignment}
              selectionMode="single"
              onSelectionChange={setTextAlignment}
            >
              <Header>Text Alignment</Header>
              <Dropdown.Item id="left" textValue="Left">
                <Dropdown.ItemIndicator type="dot" />
                <Label>Left</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="alt" />
                  <Kbd.Content>A</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
              <Dropdown.Item id="center" textValue="Center">
                <Dropdown.ItemIndicator type="dot" />
                <Label>Center</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="alt" />
                  <Kbd.Content>H</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
              <Dropdown.Item id="right" textValue="Right">
                <Dropdown.ItemIndicator type="dot" />
                <Label>Right</Label>
                <Kbd className="ms-auto" slot="keyboard" variant="light">
                  <Kbd.Abbr keyValue="alt" />
                  <Kbd.Content>D</Kbd.Content>
                </Kbd>
              </Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  },
};

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new" textValue="New">
            <Label>New</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open" textValue="Open">
            <Label>Open</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save" textValue="Save">
            <Label>Save</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <Label>Delete</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="New file">
            <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
            <Label>New file</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="Open file">
            <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:folder-open" />
            <Label>Open file</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="Save file">
            <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:floppy-disk" />
            <Label>Save file</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <Icon className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
            <Label>Delete file</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const LongPressTrigger: Story = {
  render: () => (
    <Dropdown trigger="longPress">
      <Button aria-label="Menu" variant="secondary">
        Long Press
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="new-file" textValue="New file">
            <Label>New file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="Open file">
            <Label>Open file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="Save file">
            <Label>Save file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <Label>Delete file</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="New file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
            </div>
            <div className="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="Open file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:folder-open" />
            </div>
            <div className="flex flex-col">
              <Label>Open file</Label>
              <Description>Open an existing file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="Save file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:floppy-disk" />
            </div>
            <div className="flex flex-col">
              <Label>Save file</Label>
              <Description>Save the current file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
            </div>
            <div className="flex flex-col">
              <Label>Delete file</Label>
              <Description>Move to trash</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <Icon className="outline-none" icon="gravity-ui:ellipsis-vertical" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
              </div>
              <div className="flex flex-col">
                <Label>New file</Label>
                <Description>Create a new file</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>N</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:pencil" />
              </div>
              <div className="flex flex-col">
                <Label>Edit file</Label>
                <Description>Make changes</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>E</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Danger zone</Header>
            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
              </div>
              <div className="flex flex-col">
                <Label>Delete file</Label>
                <Description>Move to trash</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Abbr keyValue="shift" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <Icon className="outline-none" icon="gravity-ui:bars" />
      </Button>
      <Dropdown.Popover className="min-w-[220px]">
        <Dropdown.Menu disabledKeys={["delete-file"]} onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
              </div>
              <div className="flex flex-col">
                <Label>New file</Label>
                <Description>Create a new file</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>N</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:pencil" />
              </div>
              <div className="flex flex-col">
                <Label>Edit file</Label>
                <Description>Make changes</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>E</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Danger zone</Header>
            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
              </div>
              <div className="flex flex-col">
                <Label>Delete file</Label>
                <Description>Move to trash</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Abbr keyValue="shift" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithSubmenus: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Share
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="copy-link" textValue="Copy Link">
            <Label>Copy Link</Label>
          </Dropdown.Item>
          <Dropdown.Item id="facebook" textValue="Facebook">
            <Label>Facebook</Label>
          </Dropdown.Item>
          <Dropdown.Item id="twitter" textValue="Twitter">
            <Label>X / Twitter</Label>
          </Dropdown.Item>
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="share" textValue="Share">
              <Label>Other</Label>
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <Dropdown.Item id="whatsapp" textValue="WhatsApp">
                  <Label>WhatsApp</Label>
                </Dropdown.Item>
                <Dropdown.Item id="telegram" textValue="Telegram">
                  <Label>Telegram</Label>
                </Dropdown.Item>
                <Dropdown.Item id="discord" textValue="Discord">
                  <Label>Discord</Label>
                </Dropdown.Item>
                <Dropdown.SubmenuTrigger>
                  <Dropdown.Item id="email" textValue="Email">
                    <Label>Email</Label>
                    <Dropdown.SubmenuIndicator />
                  </Dropdown.Item>
                  <Dropdown.Popover>
                    <Dropdown.Menu>
                      <Dropdown.Item id="work" textValue="Work email">
                        <Label>Work email</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="personal" textValue="Personal email">
                        <Label>Personal email</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.SubmenuTrigger>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.SubmenuTrigger>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const WithCustomSubmenuIndicator: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Share
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="copy-link" textValue="Copy Link">
            <Label>Copy Link</Label>
          </Dropdown.Item>
          <Dropdown.Item id="facebook" textValue="Facebook">
            <Label>Facebook</Label>
          </Dropdown.Item>
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="share" textValue="Share">
              <Label>More options</Label>
              <Dropdown.SubmenuIndicator>
                <Icon className="size-3.5 text-muted" icon="gravity-ui:arrow-right" />
              </Dropdown.SubmenuIndicator>
            </Dropdown.Item>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <Dropdown.Item id="whatsapp" textValue="WhatsApp">
                  <Label>WhatsApp</Label>
                </Dropdown.Item>
                <Dropdown.Item id="telegram" textValue="Telegram">
                  <Label>Telegram</Label>
                </Dropdown.Item>
                <Dropdown.SubmenuTrigger>
                  <Dropdown.Item id="email" textValue="Email">
                    <Label>Email</Label>
                    <Dropdown.SubmenuIndicator>
                      <svg
                        className="size-3.5 text-muted"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Dropdown.SubmenuIndicator>
                  </Dropdown.Item>
                  <Dropdown.Popover>
                    <Dropdown.Menu>
                      <Dropdown.Item id="work" textValue="Work email">
                        <Label>Work email</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="personal" textValue="Personal email">
                        <Label>Personal email</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.SubmenuTrigger>
                <Dropdown.Item id="discord" textValue="Discord">
                  <Label>Discord</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.SubmenuTrigger>
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="other" textValue="Other">
              <Label>Other (default indicator)</Label>
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <Dropdown.Item id="sms" textValue="SMS">
                  <Label>SMS</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.SubmenuTrigger>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(["bold"]));

    const selectedItems = Array.from(selected);

    return (
      <div className="min-w-sm space-y-4">
        <Dropdown>
          <Button aria-label="Menu" variant="secondary">
            Actions
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              selectedKeys={selected}
              selectionMode="multiple"
              onSelectionChange={setSelected}
            >
              <Dropdown.Item id="bold" textValue="Bold">
                <Label>Bold</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="italic" textValue="Italic">
                <Label>Italic</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="underline" textValue="Underline">
                <Label>Underline</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        <p className="text-sm text-muted">
          Selected: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
        </p>
      </div>
    );
  },
};

export const ControlledOpenState: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="min-w-sm space-y-4">
        <p className="text-sm text-muted">
          Dropdown is: <strong>{open ? "open" : "closed"}</strong>
        </p>
        <Dropdown isOpen={open} onOpenChange={setOpen}>
          <Button aria-label="Menu" variant="secondary">
            Actions
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item id="new-file" textValue="New file">
                <Label>New file</Label>
              </Dropdown.Item>
              <Dropdown.Item id="open-file" textValue="Open file">
                <Label>Open file</Label>
              </Dropdown.Item>
              <Dropdown.Item id="save-file" textValue="Save file">
                <Label>Save file</Label>
              </Dropdown.Item>
              <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
                <Label>Delete file</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    );
  },
};

export const CustomTrigger: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt="Junior Garcia"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
          />
          <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt="Jane"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
              />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">Jane Doe</p>
              <p className="text-xs leading-none text-muted">jane@example.com</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile">
            <Label>Profile</Label>
          </Dropdown.Item>
          <Dropdown.Item id="settings" textValue="Settings">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Settings</Label>
              <Icon className="size-3.5 text-muted" icon="gravity-ui:gear" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="new-project" textValue="New project">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Create Team</Label>
              <Icon className="size-3.5 text-muted" icon="gravity-ui:persons" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <Icon className="size-3.5 text-danger" icon="gravity-ui:arrow-right-from-square" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ),
};
