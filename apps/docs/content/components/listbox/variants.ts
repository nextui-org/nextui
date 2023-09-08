const ListboxWrapper = `const ListboxWrapper = ({children}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);`;

const App = `import {Listbox, ListboxItem, RadioGroup, Radio} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";

export default function App() {
  const [selectedVariant, setSelectedVariant] = React.useState("solid")
  const [selectedColor, setSelectedColor] = React.useState("default")

  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-col gap-4">
      <ListboxWrapper>
        <Listbox
          aria-label="Listbox Variants"
          color={selectedColor} 
          variant={selectedVariant}
        >
          <ListboxItem key="new">New file</ListboxItem>
          <ListboxItem key="copy">Copy link</ListboxItem>
          <ListboxItem key="edit">Edit file</ListboxItem>
          <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>  
      <div className="flex flex-col gap-2">
        <RadioGroup
          label="Select listbox item variant"
          orientation="horizontal"
          color={selectedVariant}
          defaultValue="solid"
          onValueChange={setSelectedVariant}
        >
          {variants.map((variant) => (
            <Radio key={variant} value={variant} className="capitalize">
              {variant}
            </Radio>
          ))}
        </RadioGroup>
        <RadioGroup
          label="Select listbox item color"
          orientation="horizontal"
          color={selectedColor}
          defaultValue="default"
          onValueChange={setSelectedColor}
        >
          {colors.map((color) => (
            <Radio key={color} value={color} className="capitalize">
              {color}
            </Radio>
          ))}
        </RadioGroup>
      </div> 
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/ListboxWrapper.jsx": ListboxWrapper,
};

export default {
  ...react,
};
