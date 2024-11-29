import {Avatar, AvatarGroup} from "@nextui-org/react";

export default function App() {
  return (
    <AvatarGroup
      isBordered
      max={3}
      renderCount={(count) => (
        <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
      )}
      total={10}
    >
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </AvatarGroup>
  );
}
