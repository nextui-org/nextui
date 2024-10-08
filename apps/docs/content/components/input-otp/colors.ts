const App = `import {InputOtp} from "@nextui-org/react";

export default function App() {
  const colors = ["default" , "primary", "secondary", "success", "warning" ,"danger"];
  return (
    <div className="w-full flex flex-wrap gap-6">
      {colors.map((color) => (
        <div key={color} className="inline-flex flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="text-foreground/60">color: {color}</div>
          <InputOtp color={color} />
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
