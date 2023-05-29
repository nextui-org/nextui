const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const positions = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-row items-end gap-4">
        {positions.map((position) => (
          <Input
            key={position}
            type="email"
            label="Email"
            labelPosition={position}
          />
        ))}
      </div>
      <div className="w-full flex flex-row items-end gap-4">
        {positions.map((position) => (
          <Input
            key={position}
            type="email"
            label="Email"
            labelPosition={position}
            placeholder="Enter your email"
          />
        ))}
      </div>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
