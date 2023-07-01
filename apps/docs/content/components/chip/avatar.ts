const App = `import {Chip, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip
        variant="flat"
        avatar={
          <Avatar
            name="JW"
            src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
          />
        }
      >
        Avatar
      </Chip>
      <Chip
        variant="flat"
        avatar={
          <Avatar name="JW" size="sm" getInitials={(name) => name.charAt(0)} />
        }
      >
        Avatar
      </Chip>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
