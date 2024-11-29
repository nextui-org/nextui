import {Listbox, ListboxItem} from "@nextui-org/react";

export const ListboxWrapper = ({children}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function App() {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  return (
    <ListboxWrapper>
      <Listbox aria-label="Dynamic Actions" items={items} onAction={(key) => alert(key)}>
        {(item) => (
          <ListboxItem
            key={item.key}
            className={item.key === "delete" ? "text-danger" : ""}
            color={item.key === "delete" ? "danger" : "default"}
          >
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
