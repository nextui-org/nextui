const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Success";
  const description = "Thanks for subscribing to our newsletter!";
  
  return (
    <div className="flex items-center justify-center w-full">
      <Alert
        title={title}
        description={description}
        classNames={{
           base: [
            "bg-background",
            "border",
            "border-foreground-400",
            "shadow",
            "hover:bg-slate-200",
            "cursor-pointer",
          ],
          title: ["text-base", "text-foreground", "font-semibold"],
          description: ["text-base", "text-foreground-600"],
        }}
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
