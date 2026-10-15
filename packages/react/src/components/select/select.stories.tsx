import type {Key} from "../rac";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {useAsyncList} from "@react-stately/data";
import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";
import {Button} from "../button";
import {Chip} from "../chip";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Header} from "../header";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {Collection, ListBoxLoadMoreItem} from "../rac";
import {Separator} from "../separator";
import {Spinner} from "../spinner";

import {Select} from "./index";

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Pickers/Select",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select className="w-[256px]" placeholder="Select one">
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="Delaware">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="California">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue="New York">
            New York
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue="Washington">
            Washington
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select className="w-[256px]" placeholder="Select one" variant="primary">
        <Label>Primary variant</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="option1" textValue="Option 1">
              Option 1
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="option2" textValue="Option 2">
              Option 2
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <Select className="w-[256px]" placeholder="Select one" variant="secondary">
        <Label>Secondary variant</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="option1" textValue="Option 1">
              Option 1
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="option2" textValue="Option 2">
              Option 2
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Select fullWidth placeholder="Select one">
        <Label>State</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="florida" textValue="Florida">
              Florida
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="delaware" textValue="Delaware">
              Delaware
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="california" textValue="California">
              California
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Select className="w-[256px]" placeholder="Select one">
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="Delaware">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="California">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue="New York">
            New York
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue="Washington">
            Washington
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
      <Description>Select your state of residence</Description>
    </Select>
  ),
};

export const MultipleSelect: Story = {
  render: () => (
    <Select className="w-[256px]" placeholder="Select countries" selectionMode="multiple">
      <Label>Countries to Visit</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox selectionMode="multiple">
          <ListBox.Item id="argentina" textValue="Argentina">
            Argentina
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="venezuela" textValue="Venezuela">
            Venezuela
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="japan" textValue="Japan">
            Japan
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="france" textValue="France">
            France
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="italy" textValue="Italy">
            Italy
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="spain" textValue="Spain">
            Spain
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="thailand" textValue="Thailand">
            Thailand
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-zealand" textValue="New Zealand">
            New Zealand
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="iceland" textValue="Iceland">
            Iceland
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Select className="w-[256px]" placeholder="Select a country">
      <Label>Country</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Section>
            <Header>North America</Header>
            <ListBox.Item id="usa" textValue="United States">
              United States
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="canada" textValue="Canada">
              Canada
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="mexico" textValue="Mexico">
              Mexico
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <Separator isDecorative />
          <ListBox.Section>
            <Header>Europe</Header>
            <ListBox.Item id="uk" textValue="United Kingdom">
              United Kingdom
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="france" textValue="France">
              France
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="germany" textValue="Germany">
              Germany
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="spain" textValue="Spain">
              Spain
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="italy" textValue="Italy">
              Italy
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <Separator isDecorative />
          <ListBox.Section>
            <Header>Asia</Header>
            <ListBox.Item id="japan" textValue="Japan">
              Japan
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="china" textValue="China">
              China
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="india" textValue="India">
              India
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="south-korea" textValue="South Korea">
              South Korea
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
        </ListBox>
      </Select.Popover>
    </Select>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <Select className="w-[256px]" disabledKeys={["cat", "kangaroo"]} placeholder="Select an animal">
      <Label>Animal</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="bird" textValue="Bird">
            Bird
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="elephant" textValue="Elephant">
            Elephant
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="tiger" textValue="Tiger">
            Tiger
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  ),
};

export const WithClearButton: Story = {
  render: () => (
    <Select className="w-[256px]" defaultValue="california" placeholder="Select one">
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.ClearButton />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="Delaware">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="California">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue="New York">
            New York
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue="Washington">
            Washington
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  ),
};

export const CustomIndicator: Story = {
  render: () => (
    <Select className="w-[256px]" placeholder="Select one">
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator className="size-3">
          <Icon icon="gravity-ui:chevrons-expand-vertical" />
        </Select.Indicator>
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="Delaware">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="California">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue="New York">
            New York
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue="Washington">
            Washington
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  ),
};

export const Required: Story = {
  render: () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      // Convert FormData to plain object
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      alert("Form submitted successfully!");
    };

    return (
      <Form className="flex w-[256px] flex-col gap-4" onSubmit={onSubmit}>
        <Select isRequired className="w-full" name="state" placeholder="Select one">
          <Label>State</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="florida" textValue="Florida">
                Florida
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="delaware" textValue="Delaware">
                Delaware
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="california" textValue="California">
                California
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="texas" textValue="Texas">
                Texas
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="new-york" textValue="New York">
                New York
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="washington" textValue="Washington">
                Washington
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>
        <Select isRequired className="w-full" name="country" placeholder="Select a country">
          <Label>Country</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="usa" textValue="United States">
                United States
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="canada" textValue="Canada">
                Canada
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="mexico" textValue="Mexico">
                Mexico
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="uk" textValue="United Kingdom">
                United Kingdom
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="france" textValue="France">
                France
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="germany" textValue="Germany">
                Germany
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const CustomValue: Story = {
  render: () => {
    const users = [
      {
        id: "1",
        name: "Bob",
        email: "bob@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
        fallback: "B",
      },
      {
        id: "2",
        name: "Fred",
        email: "fred@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
        fallback: "F",
      },
      {
        id: "3",
        name: "Martha",
        email: "martha@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
        fallback: "M",
      },
      {
        id: "4",
        name: "John",
        email: "john@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
        fallback: "J",
      },
      {
        id: "5",
        name: "Jane",
        email: "jane@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
        fallback: "J",
      },
    ];

    return (
      <Select className="w-[256px]" placeholder="Select a user">
        <Label>User</Label>
        <Select.Trigger>
          <Select.Value>
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItems = state.selectedItems;

              if (selectedItems.length > 1) {
                return `${selectedItems.length} users selected`;
              }

              const selectedItem = users.find((user) => user.id === selectedItems[0].key);

              if (!selectedItem) {
                return defaultChildren;
              }

              return (
                <div className="flex items-center gap-2">
                  <Avatar className="size-4" size="sm">
                    <AvatarImage alt="" src={selectedItem.avatarUrl} />
                    <AvatarFallback>{selectedItem.fallback}</AvatarFallback>
                  </Avatar>
                  <span>{selectedItem.name}</span>
                </div>
              );
            }}
          </Select.Value>
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {users.map((user) => (
              <ListBox.Item key={user.id} id={user.id} textValue={user.name}>
                <Avatar size="sm">
                  <AvatarImage alt="" src={user.avatarUrl} />
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Label>{user.name}</Label>
                  <Description>{user.email}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    );
  },
};

export const CustomValueMultiple: Story = {
  render: () => {
    const users = [
      {
        id: "1",
        name: "Bob",
        email: "bob@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
        fallback: "B",
      },
      {
        id: "2",
        name: "Fred",
        email: "fred@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
        fallback: "F",
      },
      {
        id: "3",
        name: "Martha",
        email: "martha@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
        fallback: "M",
      },
      {
        id: "4",
        name: "John",
        email: "john@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
        fallback: "J",
      },
      {
        id: "5",
        name: "Jane",
        email: "jane@heroui.com",
        avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
        fallback: "J",
      },
    ];

    return (
      <Select
        className="w-[256px]"
        defaultValue={["1", "2"]}
        placeholder="Select your teammates"
        selectionMode="multiple"
      >
        <Label>Users</Label>
        <Select.Trigger>
          <Select.Value className="no-truncate flex flex-wrap gap-2">
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItemsKeys = state.selectedItems.map((item) => item.key);

              return selectedItemsKeys.map((selectedItemKey) => {
                const selectedItem = users.find((user) => user.id === selectedItemKey);

                if (!selectedItem) {
                  return null;
                }

                return (
                  <Chip key={selectedItemKey} variant="soft">
                    <Avatar className="size-4" size="sm">
                      <AvatarImage alt="" src={selectedItem.avatarUrl} />
                      <AvatarFallback>{selectedItem.fallback}</AvatarFallback>
                    </Avatar>
                    <Chip.Label>{selectedItem.name}</Chip.Label>
                  </Chip>
                );
              });
            }}
          </Select.Value>
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {users.map((user) => (
              <ListBox.Item key={user.id} id={user.id} textValue={user.name}>
                <Avatar size="sm">
                  <AvatarImage alt="" src={user.avatarUrl} />
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Label>{user.name}</Label>
                  <Description>{user.email}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const states = [
      {
        id: "california",
        name: "California",
      },
      {
        id: "texas",
        name: "Texas",
      },
      {
        id: "florida",
        name: "Florida",
      },
      {
        id: "new-york",
        name: "New York",
      },
      {
        id: "illinois",
        name: "Illinois",
      },
      {
        id: "pennsylvania",
        name: "Pennsylvania",
      },
    ];

    const [state, setState] = React.useState<Key | null>("california");

    const selectedState = states.find((s) => s.id === state);

    return (
      <div className="space-y-2">
        <Select
          className="w-[256px]"
          placeholder="Select a state"
          value={state}
          onChange={(value) => setState(value)}
        >
          <Label>State (controlled)</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {states.map((state) => (
                <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                  {state.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <p className="text-sm text-muted">Selected: {selectedState?.name || "None"}</p>
      </div>
    );
  },
};

export const ControlledMultiple: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Key[]>(["california", "texas"]);

    return (
      <div className="space-y-4">
        <Select
          className="w-[256px]"
          placeholder="Select states"
          selectionMode="multiple"
          value={selected}
          onChange={(keys) => setSelected(keys as Key[])}
        >
          <Label>States (controlled multiple)</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox selectionMode="multiple">
              <ListBox.Item id="california" textValue="California">
                California
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="texas" textValue="Texas">
                Texas
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="florida" textValue="Florida">
                Florida
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="new-york" textValue="New York">
                New York
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="illinois" textValue="Illinois">
                Illinois
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="pennsylvania" textValue="Pennsylvania">
                Pennsylvania
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <p className="text-sm text-muted">
          Selected: {selected.length > 0 ? selected.join(", ") : "None"}
        </p>
      </div>
    );
  },
};

export const ControlledOpenState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <Select
          className="w-[256px]"
          isOpen={isOpen}
          placeholder="Select one"
          onOpenChange={setIsOpen}
        >
          <Label>State</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="florida" textValue="Florida">
                Florida
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="delaware" textValue="Delaware">
                Delaware
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="california" textValue="California">
                California
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="texas" textValue="Texas">
                Texas
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="new-york" textValue="New York">
                New York
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="washington" textValue="Washington">
                Washington
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <Button onPress={() => setIsOpen(!isOpen)}>{isOpen ? "Close" : "Open"} Select</Button>
        <p className="text-sm text-muted">Select is {isOpen ? "open" : "closed"}</p>
      </div>
    );
  },
};

interface Pokemon {
  name: string;
}

export const AsynchronousLoading: Story = {
  render: () => {
    const list = useAsyncList<Pokemon>({
      async load({cursor, signal}) {
        const res = await fetch(cursor || `https://pokeapi.co/api/v2/pokemon`, {signal});
        const json = await res.json();

        return {
          items: json.results,
          cursor: json.next,
        };
      },
    });

    return (
      <Select className="w-[256px]" placeholder="Select a Pokemon">
        <Label>Pick a Pokemon</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <Collection items={list.items}>
              {(item: Pokemon) => (
                <ListBox.Item id={item.name} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </Collection>
            <ListBoxLoadMoreItem
              isLoading={list.loadingState === "loadingMore"}
              onLoadMore={list.loadMore}
            >
              <div className="flex items-center justify-center gap-2 py-2">
                <Spinner size="sm" />
                <span className="text-sm text-muted">Loading more...</span>
              </div>
            </ListBoxLoadMoreItem>
          </ListBox>
        </Select.Popover>
      </Select>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select isDisabled className="w-[256px]" defaultValue="california" placeholder="Select one">
        <Label>State</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="florida" textValue="Florida">
              Florida
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="delaware" textValue="Delaware">
              Delaware
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="california" textValue="California">
              California
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="Texas">
              Texas
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="New York">
              New York
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="washington" textValue="Washington">
              Washington
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <Select
        isDisabled
        className="w-[256px]"
        defaultValue={["argentina", "japan", "france"]}
        placeholder="Select countries"
        selectionMode="multiple"
      >
        <Label>Countries to Visit</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="argentina" textValue="Argentina">
              Argentina
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="venezuela" textValue="Venezuela">
              Venezuela
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="japan" textValue="Japan">
              Japan
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="france" textValue="France">
              France
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="italy" textValue="Italy">
              Italy
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="spain" textValue="Spain">
              Spain
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  ),
};
