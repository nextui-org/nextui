import {tv, VariantProps} from "tailwind-variants";

export const codeWindowStyles = tv({
  slots: {
    container: [
      "relative",
      "overflow-hidden",
      "shadow-xl",
      "flex",
      "bg-slate-800",
      "h-[31.625rem]",
      "max-h-[60vh]",
      "sm:max-h-[none]",
      "sm:rounded-xl",
      "lg:h-[34.6875rem]",
      "xl:h-[31.625rem]",
      "dark:bg-slate-900/70",
      "dark:backdrop-blur",
      "dark:ring-1",
      "dark:ring-inset",
      "dark:ring-white/10",
    ],
    code: ["w-full", "flex-auto", "flex", "min-h-0", "overflow-auto"],
    lineNumbers: [
      "hidden",
      "md:block",
      "text-slate-600",
      "flex-none",
      "py-4",
      "pr-4",
      "text-right",
      "select-none",
    ],
  },
});

export type CodeWindowProps = VariantProps<typeof codeWindowStyles>;
