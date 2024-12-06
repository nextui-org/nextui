import {Avatar, AvatarIcon} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex items-center">
      <Avatar
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
        icon={<AvatarIcon />}
      />
    </div>
  );
}
