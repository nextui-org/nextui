import {Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar className="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar
        className="w-20 h-20 text-large"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      />
    </div>
  );
}
