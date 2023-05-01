import {tv} from "tailwind-variants";

export const titleWrapper = tv({
  base: "flex flex-col gap-2 items-start justify-center w-full",
});

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#f36534] to-[#F69F27]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF4ECD] to-[#F21361]",
    },
    size: {
      sm: "text-2xl lg:text-3xl",
      md: "text-4xl lg:text-5xl",
      lg: "text-5xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: ["violet", "yellow", "blue", "cyan", "green", "pink"],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-xl font-light text-neutral-500 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
});

export const sectionWrapper = tv({
  base: "relative z-10 flex flex-col gap-2 w-full mt-56 pb-20",
});
