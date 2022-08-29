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

const NotificationIcon = `export const NotificationIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
        fill={fill}
      />
      <path
        d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z"
        fill={fill}
      />
    </svg>
  );
};`;

const App = `import { Badge, Avatar, Grid } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon"
import { CheckIcon } from "./CheckIcon";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge color="error" content={5}>
          <Avatar
            bordered
            squared
            color="secondary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e29026707d"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge
          content=""
          color="success"
          placement="bottom-right"
          shape="circle"
          variant="dot"
          size="md"
        >
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge
          content=""
          isSquared
          color="primary"
          placement="bottom-right"
          variant="points"
          size="md"
        >
          <Avatar
            squared
            size="lg"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge content="new" color="error" placement="top-right" size="xs">
          <Avatar
            bordered
            squared
            size="lg"
            color="error"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge
          content={<CheckIcon />}
          color="success"
          css={{ p: 0 }}
          placement="bottom-right"
          size="xs"
        >
          <Avatar
            bordered
            squared
            size="lg"
            color="success"
            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge
          content={<NotificationIcon fill="currentColor" size={12} />}
          css={{p: "$2"}}
          color="error"
          placement="top-right"
          shape="circle"
          size="md"
        >
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e29026704f"
          />
        </Badge>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/App.js": App,
  "/CheckIcon.js": CheckIcon,
  "/NotificationIcon.js": NotificationIcon,
};

export default {
  ...react,
};
