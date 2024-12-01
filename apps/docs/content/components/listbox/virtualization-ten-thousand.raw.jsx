import {Listbox, ListboxItem} from "@nextui-org/react";

const generateItems = (n) => {
  const items = [
    "Cat",
    "Dog",
    "Elephant",
    "Lion",
    "Tiger",
    "Giraffe",
    "Dolphin",
    "Penguin",
    "Zebra",
    "Shark",
    "Whale",
    "Otter",
    "Crocodile",
  ];

  const dataset = [];

  for (let i = 0; i < n; i++) {
    const item = items[i % items.length];

    dataset.push({
      label: `${item}${i}`,
      value: `${item.toLowerCase()}${i}`,
      description: "Sample description",
    });
  }

  return dataset;
};

const ListboxWrapper = ({children}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function App() {
  const items = generateItems(10000);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <ListboxWrapper>
        <Listbox
          isVirtualized
          className="max-w-xs"
          label={"Select from 10000 items"}
          placeholder="Select..."
          virtualization={{
            maxListboxHeight: 400,
            itemHeight: 40,
          }}
        >
          {items.map((item, index) => (
            <ListboxItem key={index} value={item.value}>
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
