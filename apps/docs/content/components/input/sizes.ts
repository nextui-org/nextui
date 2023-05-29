const App = `import {Input} from "@nextui-org/react";

export default function App() {

  const sizes = ["xs", "sm", "md", "lg", "xl"];

  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input size={size} type="email" label="Email" />
          <Input size={size} type="email" label="Email" placeholder="Enter your email" />
        </div>
      ))}  
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
