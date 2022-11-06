const CheckIcon = `export const CheckIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 18}
      height={size || height || 18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};`;

const App = `import { Badge, Avatar, Grid } from "@nextui-org/react";
import { CheckIcon } from "./CheckIcon";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge
          color="success"
          shape="rectangle"
          content={<CheckIcon width={24} height={24} />}
          css={{ p: "0" }}
          horizontalOffset="45%"
          verticalOffset="45%"
        >
          <Avatar
            squared
            bordered
            size="lg"
            color="success"
            src="https://i.pravatar.cc/300?u=a042581f4e290267073"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge
          content={<CheckIcon />}
          css={{ p: 0 }}
          shape="circle"
          placement="bottom-right"
          horizontalOffset="35%"
          verticalOffset="-10%"
          size="xs"
        >
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
          />
        </Badge>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/App.js": App,
  "/CheckIcon.js": CheckIcon,
};

export default {
  ...react,
};
