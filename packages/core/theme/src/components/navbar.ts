import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, wrapper, brand, content, item} = navbar({...})
 *
 * <nav className={base()}>
 *    <div className={wrapper()}>
 *      <div className={brand()}>Brand</div>
 *      <ul className={content()}>
 *        <li className={item()}>Item 1</li>
 *        <li className={item()}>Item 2</li>
 *        <li className={item()}>Item 3</li>
 *      </ul>
 *    </div>
 * </nav>
 * ```
 */
const navbar = tv({
  slots: {
    base: [
      "relative",
      "z-20",
      "w-full",
      "h-auto",
      "flex",
      "items-center",
      "justify-center",
      "border-b",
      "border-neutral-100",
      "shadow-lg",
    ],
    wrapper: [
      "flex",
      "flex-row",
      "flex-nowrap",
      "items-center",
      "justify-between",
      "w-full",
      "h-16",
      "px-6",
    ],
    brand: [
      "flex",
      "flex-row",
      "flex-nowrap",
      "justify-start",
      "bg-transparent",
      "items-center",
      "no-underline",
      "text-base",
      "whitespace-nowrap",
      "box-border",
    ],
    content: ["flex", "h-full", "flex-row", "flex-nowrap", "items-center", "gap-4"],
    item: [
      "text-base",
      "whitespace-nowrap",
      "box-border",
      // active
      "data-[active=true]:font-semibold",
    ],
  },
  variants: {
    position: {
      static: {
        base: "static",
      },
      sticky: {},
      floating: {
        base: "shadow-none border-b-0",
        wrapper: "mt-4 mx-8 shadow-lg border border-neutral-100 rounded-xl",
      },
    },
    maxWidth: {
      sm: {
        wrapper: "max-w-[640px]",
      },
      md: {
        wrapper: "max-w-[768px]",
      },
      lg: {
        wrapper: "max-w-[1024px]",
      },
      xl: {
        wrapper: "max-w-[1280px]",
      },
      "2xl": {
        wrapper: "max-w-[1536px]",
      },
      full: {
        wrapper: "max-w-full",
      },
    },
    isBordered: {
      true: {},
    },
    isBlurred: {
      false: {
        base: "bg-background",
      },
      true: {
        base: "backdrop-blur-xl backdrop-saturate-200 bg-background/50",
      },
    },
  },
  defaultVariants: {
    maxWidth: "lg",
    position: "sticky",
    isBlurred: true,
  },
  compoundVariants: [
    {
      position: ["sticky", "floating"],
      class: {
        base: "sticky top-0 inset-x-0",
      },
    },
  ],
});

export type NavbarVariantProps = VariantProps<typeof navbar>;
export type NavbarSlots = keyof ReturnType<typeof navbar>;

export {navbar};
