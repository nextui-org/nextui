import type {Key} from "@react-types/shared";

import {useState} from "react";
import {useFilter} from "react-aria-components/Autocomplete";

import {Autocomplete} from "@/components/autocomplete";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {SearchField} from "@/components/search-field";
import {Tag} from "@/components/tag";
import {TagGroup} from "@/components/tag-group";

const animals = [
  {id: "cat", name: "Cat"},
  {id: "dog", name: "Dog"},
  {id: "panda", name: "Panda"},
];

export type AutocompleteMultipleFixtureProps = {
  defaultOpen?: boolean;
  onRemove?: (keys: Set<Key>) => void;
};

/** Multiple selection, where the selected items render as tags inside the trigger. */
export const AutocompleteMultipleFixture = (props: AutocompleteMultipleFixtureProps = {}) => {
  const {contains} = useFilter({sensitivity: "base"});
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(["cat", "dog", "panda"]);

  const onRemove = (keys: Set<Key>) => {
    props.onRemove?.(keys);
    setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
  };

  return (
    <Autocomplete
      data-testid="autocomplete"
      defaultOpen={props.defaultOpen}
      placeholder="Select animals"
      selectionMode="multiple"
      value={selectedKeys}
      onChange={(keys) => setSelectedKeys(keys as Key[])}
    >
      <Label>Favorite Animals</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value>
          {({defaultChildren, isPlaceholder, state}) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }

            return (
              <TagGroup aria-label="Selected animals" size="sm" onRemove={onRemove}>
                <TagGroup.List>
                  {state.selectedItems.map((selectedItem) => {
                    const item = animals.find((animal) => animal.id === selectedItem.key);

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
          <ListBox>
            {animals.map((item) => (
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
};
