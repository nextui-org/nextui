const App = `import {extendVariants, Button} from "@nextui-org/react";

const MyButton = extendVariants(Button, {
  variants: {
    color: { 
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: { 
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small",
      xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium",
    },
  },
  defaultVariants: {
    color: "olive",
    size: "xl",
  },
  componentVariants: [
    {
      isDisabled: true,
      color: "olive",
      class: "bg-[#84cc16]/80 opacity-100"
    }
  ],
});

export default function App() {
  return (
    <MyButton fullWidth color="olive" size="xl">
      Press Me
    </MyButton>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
