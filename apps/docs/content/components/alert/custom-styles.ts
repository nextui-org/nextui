const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description ="You will get a reply soon";
  return (
    <div className="flex items-center justify-center w-screen">
      <Alert
        title={title}
        description={description}
        classNames={{
          base: [
            "bg-slate-100",
            "border",
            "shadow",
            "hover:bg-slate-200",
            "focus-within:!bg-slate-100",
            "dark:bg-slate-900",
            "dark:hover:bg-slate-800",
            "dark:border-slate-800",
            "dark:focus-within:!bg-slate-900",
            "cursor-pointer"
          ],
          title: [
            "text-base",
            "text-slate-500",
            "font-bold"
          ],
          description: [
            "text-base",
            "text-slate-500",
          ],
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
