import type {Selection} from "@react-types/shared";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import * as React from "react";
import {ListLayout, Virtualizer} from "react-aria-components/Virtualizer";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";
import {Description} from "../description";
import {Header} from "../header";
import {Kbd} from "../kbd";
import {Label} from "../label";
import {Separator} from "../separator";
import {Surface} from "../surface";

import {ListBox} from "./index";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  parameters: {
    layout: "centered",
  },
  title: "Components/Collections/ListBox",
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Default: Story = {
  render: () => (
    <ListBox aria-label="Users" className="w-[220px]" selectionMode="single">
      <ListBox.Item id="1" textValue="Bob">
        <Avatar size="sm">
          <AvatarImage
            alt=""
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
          />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Bob</Label>
          <Description>bob@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item id="2" textValue="Fred">
        <Avatar size="sm">
          <AvatarImage
            alt=""
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
          />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Fred</Label>
          <Description>fred@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item id="3" textValue="Martha">
        <Avatar size="sm">
          <AvatarImage
            alt=""
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
          />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Martha</Label>
          <Description>martha@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Surface className="w-[256px] rounded-3xl shadow-surface">
      <ListBox
        aria-label="File actions"
        className="w-full p-2"
        selectionMode="none"
        onAction={(key) => alert(`Selected item: ${key}`)}
      >
        <ListBox.Section>
          <Header>Actions</Header>
          <ListBox.Item id="new-file" textValue="New file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
            </div>
            <div className="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </ListBox.Item>
          <ListBox.Item id="edit-file" textValue="Edit file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:pencil" />
            </div>
            <div className="flex flex-col">
              <Label>Edit file</Label>
              <Description>Make changes</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>E</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
        <Separator isDecorative />
        <ListBox.Section>
          <Header>Danger zone</Header>
          <ListBox.Item id="delete-file" textValue="Delete file" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
            </div>
            <div className="flex flex-col">
              <Label>Delete file</Label>
              <Description>Move to trash</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </Surface>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Surface className="w-[256px] rounded-3xl shadow-surface">
      <ListBox
        aria-label="File actions"
        className="w-full p-2"
        disabledKeys={["delete-file"]}
        selectionMode="none"
        onAction={(key) => alert(`Selected item: ${key}`)}
      >
        <ListBox.Section>
          <Header>Actions</Header>
          <ListBox.Item id="new-file" textValue="New file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
            </div>
            <div className="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </ListBox.Item>
          <ListBox.Item id="edit-file" textValue="Edit file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-muted" icon="gravity-ui:pencil" />
            </div>
            <div className="flex flex-col">
              <Label>Edit file</Label>
              <Description>Make changes</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>E</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
        <Separator isDecorative />
        <ListBox.Section>
          <Header>Danger zone</Header>
          <ListBox.Item id="delete-file" textValue="Delete file" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
            </div>
            <div className="flex flex-col">
              <Label>Delete file</Label>
              <Description>Move to trash</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </Surface>
  ),
};

export const MultiSelect: Story = {
  render: () => (
    <Surface className="w-[256px] rounded-3xl shadow-surface">
      <ListBox aria-label="Users" selectionMode="multiple">
        <ListBox.Item id="1" textValue="Bob">
          <Avatar size="sm">
            <AvatarImage
              alt=""
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Bob</Label>
            <Description>bob@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="2" textValue="Fred">
          <Avatar size="sm">
            <AvatarImage
              alt=""
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
            />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Fred</Label>
            <Description>fred@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="3" textValue="Martha">
          <Avatar size="sm">
            <AvatarImage
              alt=""
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
            />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Martha</Label>
            <Description>martha@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
      </ListBox>
    </Surface>
  ),
};

export const CustomCheckIcon: Story = {
  render: () => (
    <Surface className="w-[256px] rounded-3xl shadow-surface">
      <ListBox aria-label="Users" selectionMode="multiple">
        <ListBox.Item id="1" textValue="Bob">
          <Avatar size="sm">
            <AvatarImage
              alt=""
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Bob</Label>
            <Description>bob@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator>
            {({isSelected}) =>
              isSelected ? <Icon className="size-4 text-accent" icon="gravity-ui:check" /> : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
        <ListBox.Item id="2" textValue="Fred">
          <Avatar size="sm">
            <AvatarImage
              alt=""
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
            />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Fred</Label>
            <Description>fred@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator>
            {({isSelected}) =>
              isSelected ? <Icon className="size-4 text-accent" icon="gravity-ui:check" /> : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
        <ListBox.Item id="3" textValue="Martha">
          <Avatar size="sm">
            <AvatarImage
              alt=""
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
            />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Martha</Label>
            <Description>martha@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator>
            {({isSelected}) =>
              isSelected ? <Icon className="size-4 text-accent" icon="gravity-ui:check" /> : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
      </ListBox>
    </Surface>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(["1"]));

    const selectedItems = Array.from(selected);

    return (
      <div className="space-y-4">
        <Surface className="w-[256px] rounded-3xl shadow-surface">
          <ListBox
            aria-label="Users"
            selectedKeys={selected}
            selectionMode="multiple"
            onSelectionChange={setSelected}
          >
            <ListBox.Item id="1" textValue="Bob">
              <Avatar size="sm">
                <AvatarImage
                  alt=""
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label>Bob</Label>
                <Description>bob@heroui.com</Description>
              </div>
              <ListBox.ItemIndicator>
                {({isSelected}) =>
                  isSelected ? (
                    <Icon className="size-4 text-accent" icon="gravity-ui:check" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="2" textValue="Fred">
              <Avatar size="sm">
                <AvatarImage
                  alt=""
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                />
                <AvatarFallback>F</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label>Fred</Label>
                <Description>fred@heroui.com</Description>
              </div>
              <ListBox.ItemIndicator>
                {({isSelected}) =>
                  isSelected ? (
                    <Icon className="size-4 text-accent" icon="gravity-ui:check" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="3" textValue="Martha">
              <Avatar size="sm">
                <AvatarImage
                  alt=""
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label>Martha</Label>
                <Description>martha@heroui.com</Description>
              </div>
              <ListBox.ItemIndicator>
                {({isSelected}) =>
                  isSelected ? (
                    <Icon className="size-4 text-accent" icon="gravity-ui:check" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
          </ListBox>
        </Surface>
        <p className="text-sm text-muted">
          Selected: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
        </p>
      </div>
    );
  },
};

export const Virtualization: Story = {
  render: () => {
    const firstNames = [
      "Emma",
      "Liam",
      "Olivia",
      "Noah",
      "Ava",
      "James",
      "Sophia",
      "Oliver",
      "Isabella",
      "Lucas",
      "Mia",
      "Ethan",
      "Charlotte",
      "Mason",
      "Amelia",
      "Logan",
      "Harper",
      "Alexander",
      "Ella",
      "Benjamin",
    ];

    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Anderson",
      "Taylor",
      "Thomas",
      "Jackson",
      "White",
      "Harris",
      "Clark",
      "Lewis",
      "Robinson",
      "Walker",
    ];

    interface User {
      id: number;
      name: string;
      email: string;
    }

    function generateUsers(n: number): User[] {
      const users: User[] = [];

      for (let i = 0; i < n; i++) {
        const firstName = firstNames[i % firstNames.length];
        const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
        const name = `${firstName} ${lastName}`;

        users.push({
          id: i + 1,
          name,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acme.com`,
        });
      }

      return users;
    }

    const users = generateUsers(1000);

    return (
      <Virtualizer layout={ListLayout} layoutOptions={{rowHeight: 50}}>
        <ListBox
          aria-label="Virtualized list with 1000 items"
          className="h-[400px] w-[300px] overflow-y-auto"
          items={users}
        >
          {(user) => (
            <ListBox.Item id={user.id} textValue={user.name}>
              <div className="flex flex-col">
                <Label>{user.name}</Label>
                <Description>{user.email}</Description>
              </div>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          )}
        </ListBox>
      </Virtualizer>
    );
  },
};
