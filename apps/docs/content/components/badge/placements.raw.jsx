import {Badge, Avatar} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Badge color="danger" content="5" placement="top-right">
        <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
      </Badge>
      <Badge color="danger" content="5" placement="bottom-right">
        <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Badge>
      <Badge color="danger" content="5" placement="top-left">
        <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </Badge>
      <Badge color="danger" content="5" placement="bottom-left">
        <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      </Badge>
    </div>
  );
}
