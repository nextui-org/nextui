import {Badge, Avatar} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-3 items-center">
      <Badge color="warning" content="5" variant="solid">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
      </Badge>
      <Badge color="warning" content="5" variant="flat">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Badge>
      <Badge color="warning" content="5" variant="faded">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </Badge>
      <Badge color="warning" content="5" variant="shadow">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      </Badge>
    </div>
  );
}
