const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const positions = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">Without placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {positions.map((position) => (
            <Input
              key={position}
              type="email"
              label="Email"
              labelPlacement={position}
              description={position}
            />
          ))}
        </div>
      </div>  
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">With placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {positions.map((position) => (
            <Input
              key={position}
              type="email"
              label="Email"
              labelPlacement={position}
              placeholder="Enter your email"
              description={position}
            />
          ))}
        </div>
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
