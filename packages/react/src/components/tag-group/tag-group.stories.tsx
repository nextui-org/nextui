import type {Key} from "../";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useMemo, useState} from "react";

import {Avatar, Description, EmptyState, ErrorMessage, Label, Tag} from "../";
import {useListData} from "../../";

import {TagGroup} from "./";

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Collections/TagGroup",
};

export default meta;

type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  render: () => (
    <TagGroup aria-label="Tags" selectionMode="single">
      <TagGroup.List>
        <Tag id="default-news">
          <Icon icon="gravity-ui:square-article" />
          News
        </Tag>
        <Tag id="default-travel">
          <Icon icon="gravity-ui:planet-earth" />
          Travel
        </Tag>
        <Tag id="default-gaming">
          <Icon icon="gravity-ui:rocket" />
          Gaming
        </Tag>
        <Tag id="default-shopping">
          <Icon icon="gravity-ui:shopping-bag" />
          Shopping
        </Tag>
      </TagGroup.List>
    </TagGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TagGroup selectionMode="single" size="sm">
        <Label>Small</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
      <TagGroup selectionMode="single" size="md">
        <Label>Medium</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
      <TagGroup selectionMode="single" size="lg">
        <Label>Large</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <TagGroup selectionMode="single" variant="default">
          <Label>Default</Label>
          <TagGroup.List>
            <Tag>News</Tag>
            <Tag>Travel</Tag>
            <Tag>Gaming</Tag>
          </TagGroup.List>
        </TagGroup>

        <TagGroup selectionMode="single" variant="surface">
          <Label>Surface</Label>
          <TagGroup.List>
            <Tag>News</Tag>
            <Tag>Travel</Tag>
            <Tag>Gaming</Tag>
          </TagGroup.List>
        </TagGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TagGroup selectionMode="single">
        <Label>Disabled Tags</Label>
        <TagGroup.List>
          <Tag isDisabled>News</Tag>
          <Tag>Travel</Tag>
          <Tag isDisabled>Gaming</Tag>
        </TagGroup.List>
        <Description>Some tags are disabled</Description>
      </TagGroup>

      <TagGroup disabledKeys={["disabled-travel"]} selectionMode="single">
        <Label>Disabled Keys</Label>
        <TagGroup.List>
          <Tag id="disabled-news">News</Tag>
          <Tag id="disabled-travel">Travel</Tag>
          <Tag id="disabled-gaming">Gaming</Tag>
        </TagGroup.List>
        <Description>Tags disabled via disabledKeys prop</Description>
      </TagGroup>
    </div>
  ),
};

export const SelectionModes: Story = {
  render: () => {
    const [singleSelected, setSingleSelected] = useState<Iterable<Key>>(new Set(["news"]));
    const [multipleSelected, setMultipleSelected] = useState<Iterable<Key>>(
      new Set(["news", "travel"]),
    );

    return (
      <div className="flex flex-col gap-8">
        <TagGroup
          selectedKeys={singleSelected}
          selectionMode="single"
          onSelectionChange={(keys) => setSingleSelected(keys)}
        >
          <Label>Single Selection</Label>
          <TagGroup.List>
            <Tag>News</Tag>
            <Tag>Travel</Tag>
            <Tag>Gaming</Tag>
            <Tag>Shopping</Tag>
          </TagGroup.List>
          <Description>Choose one category</Description>
        </TagGroup>

        <TagGroup
          selectedKeys={multipleSelected}
          selectionMode="multiple"
          onSelectionChange={(keys) => setMultipleSelected(keys)}
        >
          <Label>Multiple Selection</Label>
          <TagGroup.List>
            <Tag>News</Tag>
            <Tag>Travel</Tag>
            <Tag>Gaming</Tag>
            <Tag>Shopping</Tag>
          </TagGroup.List>
          <Description>Choose multiple categories</Description>
        </TagGroup>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Iterable<Key>>(new Set(["news", "travel"]));

    return (
      <div className="flex flex-col gap-3">
        <TagGroup
          selectedKeys={selected}
          selectionMode="multiple"
          onSelectionChange={(keys) => setSelected(keys)}
        >
          <Label>Categories (controlled)</Label>
          <TagGroup.List>
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
            <Tag id="shopping">Shopping</Tag>
          </TagGroup.List>
          <Description>
            Selected: {Array.from(selected).length > 0 ? Array.from(selected).join(", ") : "None"}
          </Description>
        </TagGroup>
      </div>
    );
  },
};

export const WithErrorMessage: Story = {
  render: () => {
    const [selected, setSelected] = useState<Iterable<Key>>(new Set());

    const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

    return (
      <TagGroup
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelected(keys)}
      >
        <Label>Amenities</Label>
        <TagGroup.List>
          <Tag id="laundry">Laundry</Tag>
          <Tag id="fitness">Fitness center</Tag>
          <Tag id="parking">Parking</Tag>
          <Tag id="pool">Swimming pool</Tag>
          <Tag id="breakfast">Breakfast</Tag>
        </TagGroup.List>
        <Description>
          {isInvalid
            ? "Select at least one category"
            : "Selected: " + Array.from(selected).join(", ")}
        </Description>
        {!!isInvalid && <ErrorMessage>Please select at least one category</ErrorMessage>}
      </TagGroup>
    );
  },
};

export const WithPrefix: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <TagGroup selectionMode="single">
        <Label>With Icons</Label>
        <TagGroup.List>
          <Tag>
            <Icon icon="gravity-ui:square-article" />
            News
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:planet-earth" />
            Travel
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:rocket" />
            Gaming
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:shopping-bag" />
            Shopping
          </Tag>
        </TagGroup.List>
        <Description>Tags with icons</Description>
      </TagGroup>

      <TagGroup selectionMode="single">
        <Label>With Avatars</Label>
        <TagGroup.List>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image
                alt=""
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback>F</Avatar.Fallback>
            </Avatar>
            Fred
          </Tag>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image
                alt=""
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
              />
              <Avatar.Fallback>M</Avatar.Fallback>
            </Avatar>
            Michael
          </Tag>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image
                alt=""
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
              />
              <Avatar.Fallback>J</Avatar.Fallback>
            </Avatar>
            Jane
          </Tag>
        </TagGroup.List>
        <Description>Tags with avatars</Description>
      </TagGroup>
    </div>
  ),
};

export const WithRemoveButton: Story = {
  render: () => {
    type Tag = {id: string; name: string};

    const [tags, setTags] = useState<Tag[]>([
      {id: "news", name: "News"},
      {id: "travel", name: "Travel"},
      {id: "gaming", name: "Gaming"},
      {id: "shopping", name: "Shopping"},
    ]);

    const [frameworks, setFrameworks] = useState<Tag[]>([
      {id: "react", name: "React"},
      {id: "vue", name: "Vue"},
      {id: "angular", name: "Angular"},
      {id: "svelte", name: "Svelte"},
    ]);

    const onRemoveTags = (keys: Set<Key>) => {
      setTags(tags.filter((tag) => !keys.has(tag.id)));
    };

    const onRemoveFrameworks = (keys: Set<Key>) => {
      setFrameworks(frameworks.filter((framework) => !keys.has(framework.id)));
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="w-sm">
          <TagGroup selectionMode="single" onRemove={onRemoveTags}>
            <Label>Default Remove Button</Label>
            <TagGroup.List
              items={tags}
              renderEmptyState={() => <EmptyState className="p-1">No categories found</EmptyState>}
            >
              {(tag) => (
                <Tag key={tag.name} id={tag.id} textValue={tag.name}>
                  {tag.name}
                </Tag>
              )}
            </TagGroup.List>
            <Description>Click the X to remove tags</Description>
          </TagGroup>
        </div>

        <div className="w-md">
          <TagGroup selectionMode="single" onRemove={onRemoveFrameworks}>
            <Label>Custom Remove Button (Render Props)</Label>
            <TagGroup.List
              items={frameworks}
              renderEmptyState={() => <EmptyState className="p-1">No frameworks found</EmptyState>}
            >
              {(tag) => (
                <Tag key={tag.id} id={tag.id} textValue={tag.name}>
                  {(renderProps) => (
                    <>
                      {tag.name}
                      {!!renderProps.allowsRemoving && (
                        <Tag.RemoveButton>
                          <Icon icon="gravity-ui:circle-xmark-fill" />
                        </Tag.RemoveButton>
                      )}
                    </>
                  )}
                </Tag>
              )}
            </TagGroup.List>
            <Description>Custom remove button with icon using render props</Description>
          </TagGroup>
        </div>

        <div className="w-md">
          <TagGroup selectionMode="single" onRemove={onRemoveFrameworks}>
            <Label>Custom Remove Button (Compound Component)</Label>
            <TagGroup.List
              items={frameworks}
              renderEmptyState={() => <EmptyState className="p-1">No frameworks found</EmptyState>}
            >
              {(tag) => (
                <Tag key={tag.id} id={tag.id} textValue={tag.name}>
                  {tag.name}
                  <Tag.RemoveButton>
                    <Icon icon="gravity-ui:circle-xmark-fill" />
                  </Tag.RemoveButton>
                </Tag>
              )}
            </TagGroup.List>
            <Description>Custom remove button using compound component pattern</Description>
          </TagGroup>
        </div>
      </div>
    );
  },
};

export const WithListData: Story = {
  render: () => {
    type User = {
      id: string;
      name: string;
      avatar: string;
      fallback: string;
    };

    const list = useListData<User>({
      initialItems: [
        {
          id: "fred",
          name: "Fred",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
          fallback: "F",
        },
        {
          id: "michael",
          name: "Michael",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
          fallback: "M",
        },
        {
          id: "jane",
          name: "Jane",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
          fallback: "J",
        },
        {
          id: "alice",
          name: "Alice",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
          fallback: "A",
        },
        {
          id: "bob",
          name: "Bob",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
          fallback: "B",
        },
        {
          id: "charlie",
          name: "Charlie",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
          fallback: "C",
        },
      ],
      initialSelectedKeys: new Set(["fred", "michael"]),
      getKey: (item) => item.id,
    });

    const onRemove = (keys: Set<Key>) => {
      list.remove(...keys);
    };

    return (
      <div className="w-sm">
        <TagGroup
          selectedKeys={list.selectedKeys}
          selectionMode="multiple"
          onRemove={onRemove}
          onSelectionChange={(keys) => list.setSelectedKeys(keys)}
        >
          <Label>Team Members</Label>
          <TagGroup.List
            items={list.items}
            renderEmptyState={() => <EmptyState className="p-1">No team members</EmptyState>}
          >
            {(user) => (
              <Tag key={user.id} id={user.id} textValue={user.name}>
                <Avatar className="size-4" size="sm">
                  <Avatar.Image alt="" src={user.avatar} />
                  <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                </Avatar>
                {user.name}
              </Tag>
            )}
          </TagGroup.List>
          <Description>Select team members for your project</Description>
        </TagGroup>
        {list.selectedKeys !== "all" && Array.from(list.selectedKeys).length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Selected:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(list.selectedKeys).map((key) => {
                const user = list.getItem(key);

                if (!user) return null;

                return (
                  <div
                    key={`${user.id}-selected`}
                    className="flex items-center gap-2 rounded-lg bg-surface-tertiary px-2 py-1"
                  >
                    <Avatar className="size-4" size="sm">
                      <Avatar.Image alt="" src={user.avatar} />
                      <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
};
