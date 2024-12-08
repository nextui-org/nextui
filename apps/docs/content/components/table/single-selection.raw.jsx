import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

export default function App() {
  const [selectedColor, setSelectedColor] = React.useState("default");

  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Example static collection table"
        color={selectedColor}
        defaultSelectedKeys={["2"]}
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <RadioGroup
        label="Selection color"
        orientation="horizontal"
        value={selectedColor}
        onValueChange={setSelectedColor}
      >
        {colors.map((color) => (
          <Radio key={color} className="capitalize" color={color} value={color}>
            {color}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
