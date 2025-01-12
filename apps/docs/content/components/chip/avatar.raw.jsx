import {Chip, Avatar} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip
        avatar={<Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />}
        variant="flat"
      >
        Avatar
      </Chip>
      <Chip
        avatar={<Avatar getInitials={(name) => name.charAt(0)} name="JW" size="sm" />}
        variant="flat"
      >
        Avatar
      </Chip>
    </div>
  );
}
