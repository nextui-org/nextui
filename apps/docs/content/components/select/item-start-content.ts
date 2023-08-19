const App = `import {Select, SelectItem, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <Select
      className="max-w-xs"
      label="Select country"
    >
      <SelectItem
        key="argentina"
        startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
      >
        Argentina
      </SelectItem>
      <SelectItem
        key="venezuela"
        startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
      >
        Venezuela
      </SelectItem>
      <SelectItem
        key="brazil"
        startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
      >
        Brazil
      </SelectItem>
      <SelectItem
        key="switzerland"
        startContent={
          <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
        }
      >
        Switzerland
      </SelectItem>
      <SelectItem
        key="germany"
        startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
      >
        Germany
      </SelectItem>
      <SelectItem
        key="spain"
        startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
      >
        Spain
      </SelectItem>
      <SelectItem
        key="france"
        startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
      >
        France
      </SelectItem>
      <SelectItem
        key="italy"
        startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
      >
        Italy
      </SelectItem>
      <SelectItem
        key="mexico"
        startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
      >
        Mexico
      </SelectItem>
    </Select>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
