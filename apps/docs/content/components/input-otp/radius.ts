const App = `import {InputOtp} from "@nextui-org/react";

export default function App() {
   const radiusValues = ["none", "sm", "md", "lg", "full"];  
   return (
    <div className="w-full flex flex-wrap gap-6">
      {radiusValues.map((radius) => (
        <div key={radius} className="inline-flex flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="text-foreground/60">radius: {radius}</div>
          <InputOtp radius={radius} />
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
