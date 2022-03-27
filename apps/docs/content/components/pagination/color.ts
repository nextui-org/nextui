const App = `import React from "react";
import { Pagination, Grid, Radio } from "@nextui-org/react";

export default function App() {
  const [selectedColor, setSelectedColor] = React.useState("primary");
  const colors = [
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "gradient",
  ];
  const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Pagination color={selectedColor} total={10} />
      </Grid>
      <Grid xs={12}>
        <Radio.Group
          row
          size="sm"
          value={selectedColor}
          onChange={setSelectedColor}
        >
          {colors.map((color) => (
            <Radio key={color} value={color} color="primary">
              {capitalize(color)}
            </Radio>
          ))}
        </Radio.Group>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
