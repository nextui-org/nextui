import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Chip} from "../chip";
import {Description} from "../description";
import {Dropdown} from "../dropdown";
import {Label} from "../label";

import {ButtonGroup} from "./";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Buttons/ButtonGroup",
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>First</Button>
      <Button>
        <ButtonGroup.Separator />
        Second
      </Button>
      <Button>
        <ButtonGroup.Separator />
        Third
      </Button>
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Small</p>
        <ButtonGroup size="sm">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Medium (default)</p>
        <ButtonGroup size="md">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Large</p>
        <ButtonGroup size="lg">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <ButtonGroup fullWidth>
        <Button>First</Button>
        <Button>
          <ButtonGroup.Separator />
          Second
        </Button>
        <Button>
          <ButtonGroup.Separator />
          Third
        </Button>
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button isIconOnly aria-label="Align left">
          <Icon icon="gravity-ui:text-align-left" />
        </Button>
        <Button isIconOnly aria-label="Align center">
          <ButtonGroup.Separator />
          <Icon icon="gravity-ui:text-align-center" />
        </Button>
        <Button isIconOnly aria-label="Align right">
          <ButtonGroup.Separator />
          <Icon icon="gravity-ui:text-align-right" />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Primary</p>
        <ButtonGroup variant="primary">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Secondary</p>
        <ButtonGroup variant="secondary">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Tertiary</p>
        <ButtonGroup variant="tertiary">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Outline</p>
        <ButtonGroup variant="outline">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Ghost</p>
        <ButtonGroup variant="ghost">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Danger</p>
        <ButtonGroup variant="danger">
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">All buttons disabled</p>
        <ButtonGroup isDisabled>
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Third
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Group disabled, but one button overrides</p>
        <ButtonGroup isDisabled>
          <Button>First</Button>
          <Button>
            <ButtonGroup.Separator />
            Second
          </Button>
          <Button isDisabled={false}>
            <ButtonGroup.Separator />
            Third (enabled)
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">With icons</p>
        <ButtonGroup variant="secondary">
          <Button>
            <Icon icon="gravity-ui:globe" />
            Search
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:plus" />
            Add
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:trash-bin" />
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Icon only buttons</p>
        <ButtonGroup variant="tertiary">
          <Button isIconOnly aria-label="Search">
            <Icon icon="gravity-ui:globe" />
          </Button>
          <Button isIconOnly aria-label="Add">
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:plus" />
          </Button>
          <Button isIconOnly aria-label="Delete">
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:trash-bin" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const WithoutSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ButtonGroup>
  ),
};

export const Examples: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      {/* Single button with dropdown */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Single button with dropdown</p>
        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Dropdown>
            <Button isIconOnly aria-label="More options">
              <ButtonGroup.Separator />
              <Icon icon="gravity-ui:chevron-down" />
            </Button>
            <Dropdown.Popover className="max-w-[290px]" placement="bottom end">
              <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="merge"
                  textValue="Create a merge commit"
                >
                  <Label>Create a merge commit</Label>
                  <Description>
                    All commits from this branch will be added to the base branch
                  </Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="squash-and-merge"
                  textValue="Squash and merge"
                >
                  <Label>Squash and merge</Label>
                  <Description>
                    The 14 commits from this branch will be combined into one commit in the base
                    branch
                  </Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="rebase-and-merge"
                  textValue="Rebase and merge"
                >
                  <Label>Rebase and merge</Label>
                  <Description>
                    The 14 commits from this branch will be rebased and added to the base branch
                  </Description>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </ButtonGroup>
      </div>

      {/* Individual buttons */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Individual buttons</p>
        <div className="flex gap-2">
          <ButtonGroup variant="tertiary">
            <Button>
              <Icon className="size-3.5" icon="gravity-ui:code-fork" />
              Fork
              <Chip color="accent" size="sm" variant="soft">
                24
              </Chip>
            </Button>
            <Button isIconOnly aria-label="More options">
              <ButtonGroup.Separator />
              <Icon icon="gravity-ui:chevron-down" />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button isIconOnly aria-label="Show QR code">
              <Icon icon="gravity-ui:qr-code" />
            </Button>
            <Button>
              <ButtonGroup.Separator />
              Scan to pay
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Icon icon="gravity-ui:thumbs-up" />
              <span className="text-xs font-semibold">2.4K</span>
            </Button>
            <Button isIconOnly aria-label="Dislike">
              <ButtonGroup.Separator />
              <Icon icon="gravity-ui:thumbs-down" />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Icon className="size-3.5" icon="gravity-ui:star" />
              Star
            </Button>
            <Button className="px-2">
              <ButtonGroup.Separator />
              <Chip color="accent" size="sm" variant="soft">
                104
              </Chip>
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Icon icon="gravity-ui:pin" />
              Pinned
            </Button>
            <Button isIconOnly aria-label="More options">
              <ButtonGroup.Separator />
              <Icon icon="gravity-ui:chevron-down" />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Previous/Next Button Group */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Previous/Next navigation</p>
        <ButtonGroup variant="tertiary">
          <Button>
            <Icon icon="gravity-ui:chevron-left" />
            Previous
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Next
            <Icon icon="gravity-ui:chevron-right" />
          </Button>
        </ButtonGroup>
      </div>

      {/* Content Selection Button Group */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Content selection</p>
        <ButtonGroup variant="tertiary">
          <Button>
            <Icon icon="gravity-ui:picture" />
            Photos
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:video" />
            Videos
          </Button>
          <Button isIconOnly aria-label="More options">
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:ellipsis" />
          </Button>
        </ButtonGroup>
      </div>

      {/* Text Alignment Button Group */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Text alignment</p>
        <ButtonGroup variant="tertiary">
          <Button>Left</Button>
          <Button>
            <ButtonGroup.Separator />
            Center
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Right
          </Button>
        </ButtonGroup>
      </div>

      {/* Icon-Only Alignment Button Group */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Icon-only alignment</p>
        <ButtonGroup variant="tertiary">
          <Button isIconOnly aria-label="Align left">
            <Icon icon="gravity-ui:text-align-left" />
          </Button>
          <Button isIconOnly aria-label="Align center">
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:text-align-center" />
          </Button>
          <Button isIconOnly aria-label="Align right">
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:text-align-right" />
          </Button>
          <Button isIconOnly aria-label="Justify text">
            <ButtonGroup.Separator />
            <Icon icon="gravity-ui:text-align-justify" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
