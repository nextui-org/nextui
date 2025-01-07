import {Link, Button} from "@heroui/react";

export default function App() {
  return (
    <Button
      showAnchorIcon
      as={Link}
      color="primary"
      href="https://github.com/nextui-org/nextui"
      variant="solid"
    >
      Button Link
    </Button>
  );
}
