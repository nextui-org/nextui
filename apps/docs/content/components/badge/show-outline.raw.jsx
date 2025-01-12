import {Badge, Avatar} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Badge color="danger" content="5" shape="rectangle" showOutline={false}>
        <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
      </Badge>
      <Badge color="danger" content="5" shape="circle" showOutline={false}>
        <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Badge>
    </div>
  );
}
