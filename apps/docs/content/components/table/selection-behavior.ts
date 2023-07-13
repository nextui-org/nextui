const App = `import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function App() {
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");

  return (
    <div className="flex flex-col gap-3">
      <Table 
        aria-label="Selection behavior table example with dynamic content"
        selectionMode="multiple"
        selectionBehavior={selectionBehavior}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RadioGroup 
        label="Selection Behavior"
        orientation="horizontal"
        value={selectionBehavior}
        onValueChange={setSelectionBehavior}
      >
        <Radio value="toggle">Toggle</Radio>
        <Radio value="replace">Replace</Radio>
      </RadioGroup>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
