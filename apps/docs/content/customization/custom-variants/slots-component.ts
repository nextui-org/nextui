const App = `import {extendVariants, Input} from "@nextui-org/react";

const MyInput = extendVariants(Input, {
  variants: {
    color: {
      slate: {
        inputWrapper: [
          "bg-slate-100",
          "border",
          "shadow",
          "hover:bg-slate-200",
          "focus-within:!bg-slate-100",
          "dark:bg-slate-900",
          "dark:hover:bg-slate-800",
          "dark:border-slate-800",
          "dark:focus-within:!bg-slate-900",
        ],
        input: [
          "text-slate-500",
          "placeholder:text-slate-500",
          "dark:text-slate-400",
          "dark:placeholder:text-slate-400",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-unit-6 min-h-unit-6 px-1",
        input: "text-tiny",
        clearButton: "text-tiny",
      },
      xl: {
        inputWrapper: "h-unit-14 min-h-unit-14",
        input: "text-medium",
        clearButton: "text-large",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded-sm",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "slate",
    textSize: "base",
    removeLabel: true,
  },
});

export default function App() {
  return (
    <MyInput isClearable placeholder="Search..." radius="xs" size="xl" />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
