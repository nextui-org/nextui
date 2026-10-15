import type {Key} from "../rac";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {useAsyncList} from "@react-stately/data";
import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";
import {Button} from "../button";
import {Chip} from "../chip";
import {Description} from "../description";
import {EmptyState} from "../empty-state";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Header} from "../header";
import {Input} from "../input";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {Collection, ListBoxLoadMoreItem} from "../rac";
import {Separator} from "../separator";
import {Spinner} from "../spinner";

import {ComboBox} from "./index";

const meta: Meta<typeof ComboBox> = {
  component: ComboBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Pickers/ComboBox",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ComboBox className="w-[256px]">
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <ComboBox fullWidth>
        <Label>Favorite Animal</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search animals..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            <ListBox.Item id="aardvark" textValue="Aardvark">
              Aardvark
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="cat" textValue="Cat">
              Cat
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="dog" textValue="Dog">
              Dog
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
      <ComboBox fullWidth isRequired>
        <Label>Favorite Animal</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search animals..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            <ListBox.Item id="aardvark" textValue="Aardvark">
              Aardvark
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="cat" textValue="Cat">
              Cat
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </ComboBox.Popover>
        <FieldError />
      </ComboBox>
    </div>
  ),
};

export const DefaultSelectedKey: Story = {
  render: () => (
    <ComboBox className="w-[256px]" defaultSelectedKey="cat">
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ComboBox className="w-[256px]">
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
      <Description>Search and select your favorite animal</Description>
    </ComboBox>
  ),
};

export const WithSections: Story = {
  render: () => (
    <ComboBox className="w-[256px]">
      <Label>Country</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search countries..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
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
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <ComboBox className="w-[256px]" disabledKeys={["cat", "kangaroo"]}>
      <Label>Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
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
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const CustomIndicator: Story = {
  render: () => (
    <ComboBox className="w-[256px]">
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger>
          <Icon className="size-3" icon="gravity-ui:chevrons-expand-vertical" />
        </ComboBox.Trigger>
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const Required: Story = {
  render: () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      alert("Form submitted successfully!");
    };

    return (
      <Form className="flex w-[256px] flex-col gap-4" onSubmit={onSubmit}>
        <ComboBox isRequired className="w-full" name="animal">
          <Label>Favorite Animal</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Search animals..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              <ListBox.Item id="aardvark" textValue="Aardvark">
                Aardvark
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cat" textValue="Cat">
                Cat
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="dog" textValue="Dog">
                Dog
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="kangaroo" textValue="Kangaroo">
                Kangaroo
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="panda" textValue="Panda">
                Panda
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="snake" textValue="Snake">
                Snake
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </ComboBox.Popover>
          <FieldError />
        </ComboBox>
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
      <ComboBox className="w-[256px]">
        <Label>User</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search users..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
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
        </ComboBox.Popover>
      </ComboBox>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const animals = [
      {
        id: "cat",
        name: "Cat",
      },
      {
        id: "dog",
        name: "Dog",
      },
      {
        id: "bird",
        name: "Bird",
      },
      {
        id: "fish",
        name: "Fish",
      },
      {
        id: "hamster",
        name: "Hamster",
      },
    ];

    const [selectedKey, setSelectedKey] = React.useState<Key | null>("cat");

    const selectedAnimal = animals.find((a) => a.id === selectedKey);

    return (
      <div className="space-y-2">
        <ComboBox
          className="w-[256px]"
          selectedKey={selectedKey}
          onSelectionChange={(key) => setSelectedKey(key)}
        >
          <Label>Animal (controlled)</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Search animals..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              {animals.map((animal) => (
                <ListBox.Item key={animal.id} id={animal.id} textValue={animal.name}>
                  {animal.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>
        <p className="text-sm text-muted">Selected: {selectedAnimal?.name || "None"}</p>
      </div>
    );
  },
};

export const ControlledInputValue: Story = {
  render: () => {
    const [inputValue, setInputValue] = React.useState("");

    return (
      <div className="space-y-2">
        <ComboBox className="w-[256px]" inputValue={inputValue} onInputChange={setInputValue}>
          <Label>Search (controlled input)</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Type to search..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              <ListBox.Item id="aardvark" textValue="Aardvark">
                Aardvark
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cat" textValue="Cat">
                Cat
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="dog" textValue="Dog">
                Dog
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="kangaroo" textValue="Kangaroo">
                Kangaroo
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="panda" textValue="Panda">
                Panda
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="snake" textValue="Snake">
                Snake
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>
        <p className="text-sm text-muted">Input value: {inputValue || "(empty)"}</p>
      </div>
    );
  },
};

interface Character {
  name: string;
}

export const AsynchronousLoading: Story = {
  render: () => {
    const list = useAsyncList<Character>({
      async load({cursor, filterText, signal}) {
        if (cursor) {
          cursor = cursor.replace(/^http:\/\//i, "https://");
        }

        const res = await fetch(
          cursor || `https://swapi.py4e.com/api/people/?search=${filterText}`,
          {
            signal,
          },
        );
        const json = await res.json();

        return {
          items: json.results,
          cursor: json.next,
        };
      },
    });

    return (
      <ComboBox
        allowsEmptyCollection
        className="w-[256px]"
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
      >
        <Label>Pick a Character</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Star Wars characters..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox renderEmptyState={() => <EmptyState />}>
            <Collection items={list.items}>
              {(item) => (
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
                <span className="muted text-sm">Loading more...</span>
              </div>
            </ListBoxLoadMoreItem>
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
    );
  },
};

export const CustomFiltering: Story = {
  render: () => {
    const animals = [
      {id: "cat", name: "Cat"},
      {id: "dog", name: "Dog"},
      {id: "bird", name: "Bird"},
      {id: "fish", name: "Fish"},
      {id: "hamster", name: "Hamster"},
    ];

    return (
      <ComboBox
        className="w-[256px]"
        defaultFilter={(text, inputValue) => {
          if (!inputValue) return true;

          return text.toLowerCase().includes(inputValue.toLowerCase());
        }}
      >
        <Label>Animal (custom filter)</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search animals..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            {animals.map((animal) => (
              <ListBox.Item key={animal.id} id={animal.id} textValue={animal.name}>
                {animal.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
    );
  },
};

export const AllowsCustomValue: Story = {
  render: () => (
    <ComboBox allowsCustomValue className="w-[256px]">
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search or type an animal..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
      <Description>You can type any animal name, even if it's not in the list</Description>
    </ComboBox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ComboBox isDisabled className="w-[256px]" defaultSelectedKey="cat">
      <Label>Favorite Animal</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const MenuTrigger: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Focus (default)</p>
        <ComboBox className="w-[256px]" menuTrigger="focus">
          <Label>Favorite Animal</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Search animals..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              <ListBox.Item id="aardvark" textValue="Aardvark">
                Aardvark
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cat" textValue="Cat">
                Cat
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="dog" textValue="Dog">
                Dog
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="kangaroo" textValue="Kangaroo">
                Kangaroo
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="panda" textValue="Panda">
                Panda
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="snake" textValue="Snake">
                Snake
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </ComboBox.Popover>
          <Description>Popover opens when the input is focused</Description>
        </ComboBox>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Input</p>
        <ComboBox className="w-[256px]" menuTrigger="input">
          <Label>Favorite Animal</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Search animals..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              <ListBox.Item id="aardvark" textValue="Aardvark">
                Aardvark
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cat" textValue="Cat">
                Cat
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="dog" textValue="Dog">
                Dog
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="kangaroo" textValue="Kangaroo">
                Kangaroo
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="panda" textValue="Panda">
                Panda
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="snake" textValue="Snake">
                Snake
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </ComboBox.Popover>
          <Description>Popover opens when the user edits the input text</Description>
        </ComboBox>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Manual</p>
        <ComboBox className="w-[256px]" menuTrigger="manual">
          <Label>Favorite Animal</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Search animals..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              <ListBox.Item id="aardvark" textValue="Aardvark">
                Aardvark
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cat" textValue="Cat">
                Cat
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="dog" textValue="Dog">
                Dog
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="kangaroo" textValue="Kangaroo">
                Kangaroo
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="panda" textValue="Panda">
                Panda
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="snake" textValue="Snake">
                Snake
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </ComboBox.Popover>
          <Description>
            Popover only opens when the trigger button is pressed or arrow keys are used
          </Description>
        </ComboBox>
      </div>
    </div>
  ),
};

export const MultipleSelection: Story = {
  render: () => (
    <ComboBox className="w-[256px]" selectionMode="multiple">
      <Label>Favorite Animals</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Value placeholder="No animals selected" />
      <ComboBox.Popover>
        <ListBox selectionMode="multiple">
          <ListBox.Item id="aardvark" textValue="Aardvark">
            Aardvark
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="Panda">
            Panda
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Snake
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  ),
};

export const MultipleSelectionControlled: Story = {
  render: () => {
    const animals = [
      {id: "cat", name: "Cat"},
      {id: "dog", name: "Dog"},
      {id: "bird", name: "Bird"},
      {id: "fish", name: "Fish"},
      {id: "hamster", name: "Hamster"},
    ];

    const [value, setValue] = React.useState<Key[]>(["cat", "dog"]);

    return (
      <div className="space-y-2">
        <ComboBox
          className="w-[256px]"
          selectionMode="multiple"
          value={value}
          onChange={(keys) => setValue(keys as Key[])}
        >
          <Label>Animals (controlled)</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Search animals..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Value placeholder="No animals selected" />
          <ComboBox.Popover>
            <ListBox selectionMode="multiple">
              {animals.map((animal) => (
                <ListBox.Item key={animal.id} id={animal.id} textValue={animal.name}>
                  {animal.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>
        <p className="text-sm text-muted">Selected: {value.join(", ") || "None"}</p>
      </div>
    );
  },
};

export const MultipleSelectionWithTags: Story = {
  render: () => {
    const animals = [
      {id: "cat", name: "Cat"},
      {id: "dog", name: "Dog"},
      {id: "bird", name: "Bird"},
      {id: "fish", name: "Fish"},
      {id: "hamster", name: "Hamster"},
    ];

    return (
      <ComboBox<(typeof animals)[number], "multiple">
        className="w-[256px]"
        defaultValue={["cat", "dog"]}
        items={animals}
        selectionMode="multiple"
      >
        <Label>Favorite Animals</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search animals..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Value className="flex flex-wrap gap-2">
          {({isPlaceholder, selectedItems}) => {
            if (isPlaceholder || selectedItems.length === 0) {
              return <span className="text-sm text-muted">No animals selected</span>;
            }

            return selectedItems.map((item) =>
              item ? (
                <Chip key={item.id} variant="soft">
                  <Chip.Label>{item.name}</Chip.Label>
                </Chip>
              ) : null,
            );
          }}
        </ComboBox.Value>
        <ComboBox.Popover>
          <ListBox selectionMode="multiple">
            {(animal: (typeof animals)[number]) => (
              <ListBox.Item id={animal.id} textValue={animal.name}>
                {animal.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
    );
  },
};
