const App = `import { User, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Grid.Container gap={2}>
        <Grid>
          <User
            bordered
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            name="Ariana Wattson"
            color="primary"
          />
        </Grid>
        <Grid>
          <User
            bordered
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            name="Jane Fisher"
            color="secondary"
          />
        </Grid>
        <Grid>
          <User
            bordered
            src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
            name="William Howard"
            color="success"
          />
        </Grid>
        <Grid>
        <User
            bordered
            src="https://i.pravatar.cc/150?u=a092581d4ef9026700d"
            name="Kristen Copper"
            color="warning"
          />
        </Grid>
        <Grid>
          <User
            bordered
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            name="Tony Reichert"
            color="error"
          />
        </Grid>
      </Grid.Container>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
