const App = `import {Autocomplete, AutocompleteItem, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <Autocomplete
      className="max-w-xs"
      label="Select country"
    >
      <AutocompleteItem
        key="argentina"
        startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
      >
        Argentina
      </AutocompleteItem>
      <AutocompleteItem
        key="venezuela"
        startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
      >
        Venezuela
      </AutocompleteItem>
      <AutocompleteItem
        key="brazil"
        startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
      >
        Brazil
      </AutocompleteItem>
      <AutocompleteItem
        key="switzerland"
        startContent={
          <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
        }
      >
        Switzerland
      </AutocompleteItem>
      <AutocompleteItem
        key="germany"
        startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
      >
        Germany
      </AutocompleteItem>
      <AutocompleteItem
        key="spain"
        startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
      >
        Spain
      </AutocompleteItem>
      <AutocompleteItem
        key="france"
        startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
      >
        France
      </AutocompleteItem>
      <AutocompleteItem
        key="italy"
        startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
      >
        Italy
      </AutocompleteItem>
      <AutocompleteItem
        key="mexico"
        startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
      >
        Mexico
      </AutocompleteItem>
    </Autocomplete>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
