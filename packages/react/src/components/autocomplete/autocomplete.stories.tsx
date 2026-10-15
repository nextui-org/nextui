import type {Key} from "@heroui/react";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {useAsyncList} from "@react-stately/data";
import React, {useState} from "react";
import {useFilter} from "react-aria-components/Autocomplete";
import {ListLayout, Virtualizer} from "react-aria-components/Virtualizer";
import {cn} from "tailwind-variants";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";
import {Button} from "../button";
import {Description} from "../description";
import {EmptyState} from "../empty-state";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Header} from "../header";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {SearchField} from "../search-field";
import {Separator} from "../separator";
import {Spinner} from "../spinner";
import {Surface} from "../surface";
import {Tag} from "../tag";
import {TagGroup} from "../tag-group";

import {Autocomplete} from "./index";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Pickers/Autocomplete",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "cat", name: "Cat"},
      {id: "dog", name: "Dog"},
      {id: "elephant", name: "Elephant"},
      {id: "lion", name: "Lion"},
      {id: "tiger", name: "Tiger"},
      {id: "giraffe", name: "Giraffe"},
    ];

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select an animal"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>Favorite Animal</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search animals..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "cat", name: "Cat"},
      {id: "dog", name: "Dog"},
      {id: "elephant", name: "Elephant"},
      {id: "lion", name: "Lion"},
      {id: "tiger", name: "Tiger"},
      {id: "giraffe", name: "Giraffe"},
    ];

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select an animal"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>Favorite Animal</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search animals..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const WithOnClearCallback: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const [clearCount, setClearCount] = useState(0);
    const [lastClearedAt, setLastClearedAt] = useState<string | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "cat", name: "Cat"},
      {id: "dog", name: "Dog"},
      {id: "elephant", name: "Elephant"},
      {id: "lion", name: "Lion"},
      {id: "tiger", name: "Tiger"},
      {id: "giraffe", name: "Giraffe"},
    ];

    const handleClear = () => {
      setClearCount((prev) => prev + 1);
      setLastClearedAt(new Date().toLocaleTimeString());
      // eslint-disable-next-line no-console
      console.log("onClear callback triggered!");
    };

    const selectedItem = items.find((item) => item.id === selectedKey);

    return (
      <div className="w-full space-y-4">
        <Autocomplete
          className="w-[256px]"
          placeholder="Select an animal"
          selectionMode="single"
          value={selectedKey}
          onChange={setSelectedKey}
          onClear={handleClear}
        >
          <Label>Favorite Animal</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search animals..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {items.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
        <div className="space-y-2 rounded-xl border border-border p-4">
          <p className="text-sm font-medium">onClear Callback Info:</p>
          <div className="space-y-1 text-sm text-muted">
            <p>Clear button clicked: {clearCount} time(s)</p>
            {!!lastClearedAt && <p>Last cleared at: {lastClearedAt}</p>}
            {!!selectedItem && (
              <p className="text-success">
                Currently selected: <strong>{selectedItem.name}</strong>
              </p>
            )}
            {!selectedItem && (
              <p className="text-muted">No selection (click clear to see the callback)</p>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [selectedKey1, setSelectedKey1] = useState<Key | null>(null);
    const [selectedKey2, setSelectedKey2] = useState<Key | null>(null);
    const [selectedKeys1, setSelectedKeys1] = useState<Key[]>([]);
    const [selectedKeys2, setSelectedKeys2] = useState<Key[]>([]);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "option1", name: "Option 1"},
      {id: "option2", name: "Option 2"},
      {id: "option3", name: "Option 3"},
      {id: "option4", name: "Option 4"},
    ];

    const onRemoveTags1 = (keys: Set<Key>) => {
      setSelectedKeys1((prev) => prev.filter((key) => !keys.has(key)));
    };

    const onRemoveTags2 = (keys: Set<Key>) => {
      setSelectedKeys2((prev) => prev.filter((key) => !keys.has(key)));
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Single Select Variants</h3>
          <div className="flex flex-col gap-4">
            <Autocomplete
              className="w-[256px]"
              placeholder="Select one"
              selectionMode="single"
              value={selectedKey1}
              variant="primary"
              onChange={setSelectedKey1}
            >
              <Label>Primary variant</Label>
              <Autocomplete.Trigger>
                <Autocomplete.Value />
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
              </Autocomplete.Trigger>
              <Autocomplete.Popover>
                <Autocomplete.Filter filter={contains}>
                  <SearchField
                    autoFocus
                    aria-label="Search options"
                    name="search"
                    variant="secondary"
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search..." />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                  <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                    {items.map((item) => (
                      <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                        {item.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Autocomplete.Filter>
              </Autocomplete.Popover>
            </Autocomplete>
            <Autocomplete
              className="w-[256px]"
              placeholder="Select one"
              selectionMode="single"
              value={selectedKey2}
              variant="secondary"
              onChange={setSelectedKey2}
            >
              <Label>Secondary variant</Label>
              <Autocomplete.Trigger>
                <Autocomplete.Value />
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
              </Autocomplete.Trigger>
              <Autocomplete.Popover>
                <Autocomplete.Filter filter={contains}>
                  <SearchField
                    autoFocus
                    aria-label="Search options"
                    name="search"
                    variant="secondary"
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search..." />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                  <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                    {items.map((item) => (
                      <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                        {item.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Autocomplete.Filter>
              </Autocomplete.Popover>
            </Autocomplete>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Multiple Select Variants</h3>
          <div className="flex flex-col gap-4">
            <Autocomplete
              className="w-[256px]"
              placeholder="Select multiple"
              selectionMode="multiple"
              value={selectedKeys1}
              variant="primary"
              onChange={(keys) => setSelectedKeys1(keys as Key[])}
            >
              <Label>Primary variant</Label>
              <Autocomplete.Trigger>
                <Autocomplete.Value>
                  {({defaultChildren, isPlaceholder, state}) => {
                    if (isPlaceholder || state.selectedItems.length === 0) {
                      return defaultChildren;
                    }

                    const selectedItemsKeys = state.selectedItems.map((item) => item.key);

                    return (
                      <TagGroup size="sm" onRemove={onRemoveTags1}>
                        <TagGroup.List>
                          {selectedItemsKeys.map((selectedItemKey) => {
                            const item = items.find((s) => s.id === selectedItemKey);

                            if (!item) return null;

                            return (
                              <Tag key={item.id} id={item.id}>
                                {item.name}
                              </Tag>
                            );
                          })}
                        </TagGroup.List>
                      </TagGroup>
                    );
                  }}
                </Autocomplete.Value>
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
              </Autocomplete.Trigger>
              <Autocomplete.Popover>
                <Autocomplete.Filter filter={contains}>
                  <SearchField
                    autoFocus
                    aria-label="Search options"
                    name="search"
                    variant="secondary"
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search..." />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                  <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                    {items.map((item) => (
                      <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                        {item.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Autocomplete.Filter>
              </Autocomplete.Popover>
            </Autocomplete>
            <Autocomplete
              className="w-[256px]"
              placeholder="Select multiple"
              selectionMode="multiple"
              value={selectedKeys2}
              variant="secondary"
              onChange={(keys) => setSelectedKeys2(keys as Key[])}
            >
              <Label>Secondary variant</Label>
              <Autocomplete.Trigger>
                <Autocomplete.Value>
                  {({defaultChildren, isPlaceholder, state}) => {
                    if (isPlaceholder || state.selectedItems.length === 0) {
                      return defaultChildren;
                    }

                    const selectedItemsKeys = state.selectedItems.map((item) => item.key);

                    return (
                      <TagGroup size="sm" variant="surface" onRemove={onRemoveTags2}>
                        <TagGroup.List>
                          {selectedItemsKeys.map((selectedItemKey) => {
                            const item = items.find((s) => s.id === selectedItemKey);

                            if (!item) return null;

                            return (
                              <Tag key={item.id} id={item.id}>
                                {item.name}
                              </Tag>
                            );
                          })}
                        </TagGroup.List>
                      </TagGroup>
                    );
                  }}
                </Autocomplete.Value>
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
              </Autocomplete.Trigger>
              <Autocomplete.Popover>
                <Autocomplete.Filter filter={contains}>
                  <SearchField
                    autoFocus
                    aria-label="Search options"
                    name="search"
                    variant="secondary"
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search..." />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                  <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                    {items.map((item) => (
                      <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                        {item.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Autocomplete.Filter>
              </Autocomplete.Popover>
            </Autocomplete>
          </div>
        </div>
      </div>
    );
  },
};

export const MultipleSelect: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "florida", name: "Florida"},
      {id: "new-york", name: "New York"},
      {id: "illinois", name: "Illinois"},
      {id: "pennsylvania", name: "Pennsylvania"},
    ];

    const onRemoveTags = (keys: Set<Key>) => {
      setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
    };

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select states"
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setSelectedKeys(keys as Key[])}
      >
        <Label>States</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value>
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItemsKeys = state.selectedItems.map((item) => item.key);

              return (
                <TagGroup size="sm" onRemove={onRemoveTags}>
                  <TagGroup.List>
                    {selectedItemsKeys.map((selectedItemKey) => {
                      const item = items.find((s) => s.id === selectedItemKey);

                      if (!item) return null;

                      return (
                        <Tag key={item.id} id={item.id}>
                          {item.name}
                        </Tag>
                      );
                    })}
                  </TagGroup.List>
                </TagGroup>
              );
            }}
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search options" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "florida", name: "Florida"},
      {id: "delaware", name: "Delaware"},
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "new-york", name: "New York"},
      {id: "washington", name: "Washington"},
    ];

    return (
      <Surface className="w-[380px] space-y-4 rounded-3xl p-6">
        <Autocomplete
          fullWidth
          placeholder="Select one"
          selectionMode="single"
          value={selectedKey}
          variant="secondary"
          onChange={setSelectedKey}
        >
          <Label>State</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search states..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {items.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
      </Surface>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "florida", name: "Florida"},
      {id: "delaware", name: "Delaware"},
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "new-york", name: "New York"},
      {id: "washington", name: "Washington"},
    ];

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select one"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>State</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search states..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
        <Description>Select your state of residence</Description>
      </Autocomplete>
    );
  },
};

export const WithSections: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select a country"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>Country</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search countries" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search countries..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
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
              <Separator />
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
              <Separator />
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
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    return (
      <Autocomplete
        className="w-[256px]"
        disabledKeys={["cat", "kangaroo"]}
        placeholder="Select an animal"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>Animal</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search animals..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
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
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const CustomIndicator: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "florida", name: "Florida"},
      {id: "delaware", name: "Delaware"},
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "new-york", name: "New York"},
      {id: "washington", name: "Washington"},
    ];

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select one"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>State</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator className="size-3">
            <Icon icon="gravity-ui:chevrons-expand-vertical" />
          </Autocomplete.Indicator>
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search states..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
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

    const {contains} = useFilter({sensitivity: "base"});

    const states = [
      {id: "florida", name: "Florida"},
      {id: "delaware", name: "Delaware"},
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "new-york", name: "New York"},
      {id: "washington", name: "Washington"},
    ];

    const countries = [
      {id: "usa", name: "United States"},
      {id: "canada", name: "Canada"},
      {id: "mexico", name: "Mexico"},
      {id: "uk", name: "United Kingdom"},
      {id: "france", name: "France"},
      {id: "germany", name: "Germany"},
    ];

    return (
      <Form className="flex w-[256px] flex-col gap-4" onSubmit={onSubmit}>
        <Autocomplete
          isRequired
          className="w-full"
          name="state"
          placeholder="Select one"
          selectionMode="single"
        >
          <Label>State</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search states..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {states.map((state) => (
                  <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                    {state.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
          <FieldError />
        </Autocomplete>
        <Autocomplete
          isRequired
          className="w-full"
          name="country"
          placeholder="Select a country"
          selectionMode="single"
        >
          <Label>Country</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField
                autoFocus
                aria-label="Search countries"
                name="search"
                variant="secondary"
              >
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search countries..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {countries.map((country) => (
                  <ListBox.Item key={country.id} id={country.id} textValue={country.name}>
                    {country.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
          <FieldError />
        </Autocomplete>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const states = [
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "florida", name: "Florida"},
      {id: "new-york", name: "New York"},
      {id: "illinois", name: "Illinois"},
      {id: "pennsylvania", name: "Pennsylvania"},
    ];

    const [state, setState] = React.useState<Key | null>("california");
    const {contains} = useFilter({sensitivity: "base"});

    const selectedState = states.find((s) => s.id === state);

    return (
      <div className="space-y-2">
        <Autocomplete
          className="w-[256px]"
          placeholder="Select a state"
          selectionMode="single"
          value={state}
          onChange={setState}
        >
          <Label>State (controlled)</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search states..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {states.map((state) => (
                  <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                    {state.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
        <p className="text-sm text-muted">Selected: {selectedState?.name || "None"}</p>
      </div>
    );
  },
};

export const ControlledOpenState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "florida", name: "Florida"},
      {id: "delaware", name: "Delaware"},
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "new-york", name: "New York"},
      {id: "washington", name: "Washington"},
    ];

    return (
      <div className="space-y-4">
        <Autocomplete
          className="w-[256px]"
          isOpen={isOpen}
          placeholder="Select one"
          selectionMode="single"
          onOpenChange={setIsOpen}
        >
          <Label>State</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search states..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {items.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
        <Button onPress={() => setIsOpen(!isOpen)}>{isOpen ? "Close" : "Open"} Autocomplete</Button>
        <p className="text-sm text-muted">Autocomplete is {isOpen ? "open" : "closed"}</p>
      </div>
    );
  },
};

interface Pokemon {
  name: string;
}

export const AsynchronousFiltering: Story = {
  render: () => {
    const list = useAsyncList<Pokemon>({
      async load({filterText, signal}) {
        const res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, {
          signal,
        });

        const json = await res.json();

        return {
          items: json.results,
        };
      },
    });

    return (
      <Autocomplete
        allowsEmptyCollection
        className="w-[256px]"
        placeholder="Search..."
        selectionMode="single"
      >
        <Label>Search a Star Wars characters</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter inputValue={list.filterText} onInputChange={list.setFilterText}>
            <SearchField
              autoFocus
              aria-label="Search characters"
              className="sticky top-0 z-10"
              name="search"
              variant="secondary"
            >
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search characters..." />
                <Spinner
                  size="sm"
                  className={cn("absolute end-2 top-1/2 -translate-y-1/2", {
                    "pointer-events-none opacity-0": !list.isLoading,
                  })}
                />
                <SearchField.ClearButton
                  className={cn({"pointer-events-none opacity-0": !!list.isLoading})}
                />
              </SearchField.Group>
            </SearchField>
            <ListBox
              className="max-h-[420px] overflow-y-auto"
              items={list.items}
              renderEmptyState={() => <EmptyState>No results found</EmptyState>}
            >
              {(item: Pokemon) => (
                <ListBox.Item id={item.name} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

interface User {
  email: string;
  id: number;
  name: string;
}

function generateUsers(n: number): User[] {
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
  const users: User[] = [];

  for (let i = 0; i < n; i++) {
    const firstName = firstNames[i % firstNames.length]!;
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length]!;
    const name = `${firstName} ${lastName}`;

    users.push({
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acme.com`,
      id: i + 1,
      name,
    });
  }

  return users;
}

export const Virtualization: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const {contains} = useFilter({sensitivity: "base"});

    const allUsers = React.useMemo(() => generateUsers(1000), []);

    const filteredUsers = React.useMemo(() => {
      if (!searchQuery) return allUsers;

      return allUsers.filter(
        (user) => contains(user.name, searchQuery) || contains(user.email, searchQuery),
      );
    }, [allUsers, contains, searchQuery]);

    return (
      <Autocomplete
        allowsEmptyCollection
        className="w-[300px]"
        placeholder="Select a user"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>User</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter inputValue={searchQuery} onInputChange={setSearchQuery}>
            <SearchField
              autoFocus
              aria-label="Search users"
              className="sticky top-0 z-10"
              name="search"
              variant="secondary"
            >
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search users..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <Virtualizer layout={ListLayout} layoutOptions={{rowHeight: 50}}>
              <ListBox
                items={filteredUsers}
                renderEmptyState={() => <EmptyState>No results found</EmptyState>}
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
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const {contains} = useFilter({sensitivity: "base"});

    const items = [
      {id: "florida", name: "Florida"},
      {id: "delaware", name: "Delaware"},
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "new-york", name: "New York"},
      {id: "washington", name: "Washington"},
    ];

    const countries = [
      {id: "argentina", name: "Argentina"},
      {id: "venezuela", name: "Venezuela"},
      {id: "japan", name: "Japan"},
      {id: "france", name: "France"},
      {id: "italy", name: "Italy"},
      {id: "spain", name: "Spain"},
    ];

    return (
      <div className="flex flex-col gap-4">
        <Autocomplete
          isDisabled
          className="w-[256px]"
          defaultValue="california"
          placeholder="Select one"
          selectionMode="single"
        >
          <Label>State</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField autoFocus aria-label="Search states" name="search" variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search states..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {items.map((item) => (
                  <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                    {item.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
        <Autocomplete
          isDisabled
          className="w-[256px]"
          defaultValue={["argentina", "japan", "france"]}
          placeholder="Select countries"
          selectionMode="multiple"
        >
          <Label>Countries to Visit</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter filter={contains}>
              <SearchField
                autoFocus
                aria-label="Search countries"
                name="search"
                variant="secondary"
              >
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search countries..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                {countries.map((country) => (
                  <ListBox.Item key={country.id} id={country.id} textValue={country.name}>
                    {country.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
      </div>
    );
  },
};

export const UserSelection: Story = {
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

    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const {contains} = useFilter({sensitivity: "base"});

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select a user"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>User</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value>
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
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search users" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search users..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
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
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const UserSelectionMultiple: Story = {
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

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const {contains} = useFilter({sensitivity: "base"});

    const onRemoveTags = (keys: Set<Key>) => {
      setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
    };

    return (
      <Autocomplete
        className="w-[256px]"
        defaultValue={["1", "2"]}
        placeholder="Select your teammates"
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setSelectedKeys(keys as Key[])}
      >
        <Label>Users</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value>
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItemsKeys = state.selectedItems.map((item) => item.key);

              return (
                <TagGroup size="sm" onRemove={onRemoveTags}>
                  <TagGroup.List>
                    {selectedItemsKeys.map((selectedItemKey) => {
                      const selectedItem = users.find((user) => user.id === selectedItemKey);

                      if (!selectedItem) {
                        return null;
                      }

                      return (
                        <Tag key={selectedItem.id} id={selectedItem.id}>
                          <Avatar className="size-4" size="sm">
                            <AvatarImage alt="" src={selectedItem.avatarUrl} />
                            <AvatarFallback>{selectedItem.fallback}</AvatarFallback>
                          </Avatar>
                          <span>{selectedItem.name}</span>
                        </Tag>
                      );
                    })}
                  </TagGroup.List>
                </TagGroup>
              );
            }}
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search users" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search users..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
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
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

interface City {
  name: string;
  country: string;
}

export const LocationSearch: Story = {
  render: () => {
    const allCities: City[] = [
      {name: "New York", country: "USA"},
      {name: "Los Angeles", country: "USA"},
      {name: "Chicago", country: "USA"},
      {name: "London", country: "UK"},
      {name: "Paris", country: "France"},
      {name: "Tokyo", country: "Japan"},
      {name: "Sydney", country: "Australia"},
      {name: "Toronto", country: "Canada"},
      {name: "Berlin", country: "Germany"},
      {name: "Madrid", country: "Spain"},
    ];

    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {contains} = useFilter({sensitivity: "base"});

    // Simulate async filtering
    const customFilter = (text: string, inputValue: string) => {
      if (!inputValue) return true;
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);

      return contains(text, inputValue);
    };

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Search for a city"
        selectionMode="single"
        value={selectedKey}
        onChange={setSelectedKey}
      >
        <Label>City</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={customFilter}>
            <SearchField autoFocus aria-label="Search cities" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search cities..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox
              renderEmptyState={() => (
                <EmptyState>{isLoading ? "Searching..." : "No cities found"}</EmptyState>
              )}
            >
              {allCities.map((city) => (
                <ListBox.Item key={city.name} id={city.name} textValue={city.name}>
                  <div className="flex flex-col">
                    <Label>{city.name}</Label>
                    <Description>{city.country}</Description>
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const TagGroupSelection: Story = {
  render: () => {
    const tags = [
      {id: "react", name: "React"},
      {id: "typescript", name: "TypeScript"},
      {id: "javascript", name: "JavaScript"},
      {id: "nodejs", name: "Node.js"},
      {id: "python", name: "Python"},
      {id: "vue", name: "Vue"},
      {id: "angular", name: "Angular"},
      {id: "nextjs", name: "Next.js"},
    ];

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const {contains} = useFilter({sensitivity: "base"});

    const onRemoveTags = (keys: Set<Key>) => {
      setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
    };

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select tags"
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setSelectedKeys(keys as Key[])}
      >
        <Label>Tags</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value>
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItemsKeys = state.selectedItems.map((item) => item.key);

              return (
                <TagGroup size="sm" onRemove={onRemoveTags}>
                  <TagGroup.List>
                    {selectedItemsKeys.map((selectedItemKey) => {
                      const tag = tags.find((t) => t.id === selectedItemKey);

                      if (!tag) return null;

                      return (
                        <Tag key={tag.id} id={tag.id}>
                          {tag.name}
                        </Tag>
                      );
                    })}
                  </TagGroup.List>
                </TagGroup>
              );
            }}
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search tags" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search tags..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No tags found</EmptyState>}>
              {tags.map((tag) => (
                <ListBox.Item key={tag.id} id={tag.id} textValue={tag.name}>
                  {tag.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};

export const EmailRecipients: Story = {
  render: () => {
    const emails = [
      {id: "alice@example.com", name: "Alice Johnson", email: "alice@example.com"},
      {id: "bob@example.com", name: "Bob Smith", email: "bob@example.com"},
      {id: "charlie@example.com", name: "Charlie Brown", email: "charlie@example.com"},
      {id: "diana@example.com", name: "Diana Prince", email: "diana@example.com"},
      {id: "eve@example.com", name: "Eve Wilson", email: "eve@example.com"},
    ];

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const {contains} = useFilter({sensitivity: "base"});

    const onRemoveTags = (keys: Set<Key>) => {
      setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
    };

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Add recipients"
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setSelectedKeys(keys as Key[])}
      >
        <Label>To</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value>
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItemsKeys = state.selectedItems.map((item) => item.key);

              return (
                <TagGroup size="sm" onRemove={onRemoveTags}>
                  <TagGroup.List>
                    {selectedItemsKeys.map((selectedItemKey) => {
                      const email = emails.find((e) => e.id === selectedItemKey);

                      if (!email) return null;

                      return (
                        <Tag key={email.id} id={email.id}>
                          {email.email}
                        </Tag>
                      );
                    })}
                  </TagGroup.List>
                </TagGroup>
              );
            }}
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus aria-label="Search emails" name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search emails..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No recipients found</EmptyState>}>
              {emails.map((email) => (
                <ListBox.Item key={email.id} id={email.id} textValue={email.email}>
                  <div className="flex flex-col">
                    <Label>{email.name}</Label>
                    <Description>{email.email}</Description>
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    );
  },
};
