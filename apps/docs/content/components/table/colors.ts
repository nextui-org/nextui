const App = `import React from "react";
import { Table, Grid, Radio } from "@nextui-org/react";

export default function App() {
  const [selectedColor, setSelectedColor] = React.useState("primary");
  const colors = ["primary", "secondary", "success", "warning", "error"];
  const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "status",
      label: "Status",
    },
  ];
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
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Table
          aria-label="Example dynamic collection table"
          color={selectedColor}
          selectionMode="multiple"
          defaultSelectedKeys={["2"]}
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={rows}>
            {(item) => (
              <Table.Row key={item.key}>
                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
      <Grid xs={12}>
        <Radio.Group
          row
          size="sm"
          value={selectedColor}
          onChange={setSelectedColor}
        >
          {colors.map((color) => (
            <Radio key={color} value={color} color={selectedColor}>
              {capitalize(color)}
            </Radio>
          ))}
        </Radio.Group>
      </Grid>
    </Grid.Container>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
