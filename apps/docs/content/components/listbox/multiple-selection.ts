const ListboxWrapper = `export const ListboxWrapper = ({children}) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);`;

const App = `import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox 
          aria-label="Multiple selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <ListboxItem key="text">Text</ListboxItem>
          <ListboxItem key="number">Number</ListboxItem>
          <ListboxItem key="date">Date</ListboxItem>
          <ListboxItem key="single_date">Single Date</ListboxItem>
          <ListboxItem key="iteration">Iteration</ListboxItem>
        </Listbox>
      </ListboxWrapper>
      <p className="text-small text-default-500">Selected value: {selectedValue}</p>
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
