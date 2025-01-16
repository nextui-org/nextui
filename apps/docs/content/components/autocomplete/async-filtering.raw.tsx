import {Autocomplete, AutocompleteItem} from "@heroui/react";
import {useAsyncList} from "@react-stately/data";

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

export default function App() {
  let list = useAsyncList<SWCharacter>({
    async load({signal, filterText}) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, {signal});
      let json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Select a character"
      placeholder="Type to search..."
      variant="bordered"
      onInputChange={list.setFilterText}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
