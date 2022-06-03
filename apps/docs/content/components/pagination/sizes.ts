const App = `import React from "react";
import { Pagination, Grid, Radio } from "@nextui-org/react";

export default function App() {
  const [selectedSize, setSelectedSize] = React.useState("md");
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Pagination color="secondary" size={selectedSize} total={10} />
      </Grid>
      <Grid xs={12}>
        <Radio.Group
          size="sm"
          orientation="horizontal"
          value={selectedSize}
          onChange={setSelectedSize}
        >
          {sizes.map((size) => (
            <Radio color="secondary" key={size} value={size}>
              {capitalize(size)}
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
