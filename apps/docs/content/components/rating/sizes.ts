const App = `import {Rating} from "@nextui-org/react";
export default function App() {
  const sizes = ["sm" , "md", "lg"];
  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="text-foreground/60">size: {size}</div>
          <Rating length={5} size={size} />
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
