import {Link, Button} from "@nextui-org/react";

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
