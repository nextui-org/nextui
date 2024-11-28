import {Listbox, ListboxItem} from "@nextui-org/react";

export const ListboxWrapper = ({children}) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox
          disallowEmptySelection
          aria-label="Multiple selection example"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
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
}
