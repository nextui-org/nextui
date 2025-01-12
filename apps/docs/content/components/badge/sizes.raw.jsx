import {Badge, Avatar} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-3 items-center">
      <Badge color="primary" content="5" size="sm">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Badge>
      <Badge color="primary" content="5" size="md">
        <Avatar radius="md" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
      </Badge>
      <Badge color="primary" content="5" size="lg">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      </Badge>
    </div>
  );
}
