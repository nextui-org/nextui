const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {["solid", "bordered", "flat", "faded"].map((variant) => (
        <Alert key={variant} variant={variant} color="danger" title={\`This is a \${variant} variant alert\`}/>
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
