const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const placements = [
    "inside",
    "outside",
    "outside-left",
    "outside-top"
  ];

  return (
    <div className="flex flex-col gap-4">
     <div className="flex flex-col gap-3">
        <h3>Without placeholder</h3>
        <div className="w-full max-w-xl flex flex-row items-end gap-4">
          <Input type={"email"} label={"email"} description="inside" />
          <Input type={"email"} label={"email"} description="outside" labelPlacement="outside" />
        </div>
        <div className="w-full max-w-xl flex flex-row items-end gap-4">
          <Input type={"email"} label={"email"} description="outside-left" labelPlacement="outside-left" />
          <Input type={"email"} label={"email"} description="outside-top" labelPlacement="outside-top" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3>With placeholder</h3>
        <div className="w-full max-w-xl flex flex-row items-end gap-4">
          <Input type={"email"} label={"email"} description="inside" placeholder="Enter your email" />
          <Input
            type={"email"}
            label={"email"}
            description="outside"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full max-w-xl flex flex-row items-end gap-4">
          <Input
            type={"email"}
            label={"email"
            description="outside-left"
            labelPlacement="outside-left"
            placeholder="Enter your email"
          />
          <Input
             type={"email"}
            label={"email"
            description="outside-top"
            labelPlacement="outside-top"
            placeholder="Enter your email"
          />
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
