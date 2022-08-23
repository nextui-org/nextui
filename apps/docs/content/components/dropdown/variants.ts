const App = `import React from "react";
import { Grid, Dropdown, Radio } from "@nextui-org/react";

export default function App() {
  const [selectedColor, setSelectedColor] = React.useState("default");
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
  ];

  const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <Grid.Container gap={1.5} justify="flex-start">
      <Grid xs={12}>
        <Grid>
          <Dropdown>
            <Dropdown.Button color={selectedColor} light>
              Light
            </Dropdown.Button>
            <Dropdown.Menu
              color={selectedColor}
              variant="light"
              aria-label="Actions"
            >
              <Dropdown.Item key="new">New file</Dropdown.Item>
              <Dropdown.Item key="copy">Copy link</Dropdown.Item>
              <Dropdown.Item key="edit">Edit file</Dropdown.Item>
              <Dropdown.Item key="delete" color="error" withDivider>
                Delete file
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button flat color={selectedColor}>
              Flat
            </Dropdown.Button>
            <Dropdown.Menu color={selectedColor} aria-label="Actions">
              <Dropdown.Item key="new">New file</Dropdown.Item>
              <Dropdown.Item key="copy">Copy link</Dropdown.Item>
              <Dropdown.Item key="edit">Edit file</Dropdown.Item>
              <Dropdown.Item key="delete" color="error" withDivider>
                Delete file
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button color={selectedColor}>Solid</Dropdown.Button>
            <Dropdown.Menu
              color={selectedColor}
              variant="solid"
              aria-label="Actions"
            >
              <Dropdown.Item key="new">New file</Dropdown.Item>
              <Dropdown.Item key="copy">Copy link</Dropdown.Item>
              <Dropdown.Item key="edit">Edit file</Dropdown.Item>
              <Dropdown.Item key="delete" color="error" withDivider>
                Delete file
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button color={selectedColor} shadow>
              Shadow
            </Dropdown.Button>
            <Dropdown.Menu
              color={selectedColor}
              variant="shadow"
              aria-label="Actions"
            >
              <Dropdown.Item key="new">New file</Dropdown.Item>
              <Dropdown.Item key="copy">Copy link</Dropdown.Item>
              <Dropdown.Item key="edit">Edit file</Dropdown.Item>
              <Dropdown.Item key="delete" color="error" withDivider>
                Delete file
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Radio.Group
          size="sm"
          orientation="horizontal"
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
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
