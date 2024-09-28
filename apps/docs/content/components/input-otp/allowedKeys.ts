const App = `import {InputOtp} from "@nextui-org/react";

export default function App() {
  const exps = [
    {name: "For below InputOtp, only lower-case alphabets (a to z) are allowed:", value: "^[a-z]*$"} , 
    {name: "For below InputOtp, only upper-case alphabets(A to Z) are allowed:", value: "^[A-Z]*$"}
  ];

  return (
    <div className="w-full flex flex-wrap gap-6">
      {exps.map((exp, idx) => (
        <div key={idx} className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="text-foreground/60">{exp.name}</div>
          <InputOtp allowedKeys={exp.value} />
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
