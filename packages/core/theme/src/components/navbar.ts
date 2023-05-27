import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {
 *  base,
 *  wrapper,
 *  toggle,
 *  srOnly,
 *  toggleIcon,
 *  brand,
 *  content,
 *  item,
 *  menu,
 *  menuItem
 * } = navbar({...})
 *
 * <nav className={base()} style={{ "--navbar-height": "4rem" }}>
 *    <header className={wrapper()}>
 *      <button className={toggle()}>
 *        <span className={srOnly()}>Open/Close menu</span>
 *        <span className={toggleIcon()} aria-hidden="true"/>
 *      </button>
 *      <div className={brand()}>Brand</div>
 *      <ul className={content()}>
 *        <li className={item()}>Item 1</li>
 *        <li className={item()}>Item 2</li>
 *        <li className={item()}>Item 3</li>
 *      </ul>
 *      <ul className={content()}>
 *        <li className={item()}>Login</li>
 *        <li className={item()}>Sign Up</li>
 *      </ul>
 *    </header>
 *    <ul className={menu()}>
 *      <li className={menuItem()}>Item 1</li>
 *      <li className={menuItem()}>Item 2</li>
 *      <li className={menuItem()}>Item 3</li>
 *   </ul>
 * </nav>
 * ```
 */
const navbar = tv({
  slots: {
    base: [
      "relative",
      "z-50",
      "w-full",
      "h-auto",
      "flex",
      "items-center",
      "justify-center",
      "border-b",
      "border-default-200",
      "dark:border-default-100",
    ],
    wrapper: [
      "flex",
      "flex-row",
      "relative",
      "flex-nowrap",
      "items-center",
      "justify-between",
      "w-full",
      "h-[var(--navbar-height)]",
      "px-6",
    ],
    toggle: [
      "group",
      "flex",
      "items-center",
      "justify-center",
      "w-6",
      "h-10",
      "outline-none",
      "rounded-sm",
      // focus ring
      "data-[focus-visible=true]:outline-none",
      "data-[focus-visible=true]:ring-2",
      "data-[focus-visible=true]:ring-primary",
      "data-[focus-visible=true]:ring-offset-2",
      "data-[focus-visible=true]:ring-offset-background",
      "data-[focus-visible=true]:dark:ring-offset-background-dark",
    ],
    srOnly: ["sr-only"],
    toggleIcon: [
      "w-full",
      "h-full",
      "pointer-events-none",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-foreground",
      "group-data-[pressed=true]:opacity-70",
      "transition-opacity",
      // before - first line
      "before:content-['']",
      "before:block",
      "before:h-px",
      "before:w-6",
      "before:bg-current",
      "before:transition-transform",
      "before:duration-150",
      "before:-translate-y-1",
      "before:rotate-0",
      "group-data-[open=true]:before:translate-y-px",
      "group-data-[open=true]:before:rotate-45",
      // after - second line
      "after:content-['']",
      "after:block",
      "after:h-px",
      "after:w-6",
      "after:bg-current",
      "after:transition-transform",
      "after:duration-150",
      "after:translate-y-1",
      "after:rotate-0",
      "group-data-[open=true]:after:translate-y-0",
      "group-data-[open=true]:after:-rotate-45",
    ],
    brand: [
      "w-full",
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
    content: [
      "flex",
      "w-full",
      "h-full",
      "flex-row",
      "flex-nowrap",
      "items-center",
      "gap-4",
      "data-[justify=start]:justify-start",
      "data-[justify=center]:justify-center",
      "data-[justify=end]:justify-end",
    ],
    item: [
      "text-base",
      "whitespace-nowrap",
      "box-border",
      // active
      "data-[active=true]:font-semibold",
    ],
    menu: [
      "z-50",
      "hidden",
      "px-6",
      "pt-4",
      "absolute",
      "max-w-full",
      "top-[calc(var(--navbar-height)_+_1px)]",
      "h-[calc(100vh_-_var(--navbar-height)_-_1px)]",
      "inset-x-0",
      "bottom-0",
      "w-screen",
      "bg-background",
      "data-[open=true]:flex",
      "flex-col",
      "gap-3",
      "overflow-y-auto",
    ],
    menuItem: ["text-lg"],
  },
  variants: {
    position: {
      static: {
        base: "static",
      },
      sticky: {},
      floating: {
        base: "shadow-none border-b-0",
        wrapper: "mt-4 mx-8 shadow-md border border-default-200 dark:border-default-100 rounded-xl",
        menu:
          "mt-5 mx-8 border border-default-200 dark:border-default-100 rounded-xl max-w-[calc(100%_-_4rem)]",
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
    hideOnScroll: {
      true: {
        base: ["sticky", "top-0", "inset-x-0"],
      },
    },
    isBordered: {
      true: {},
    },
    isBlurred: {
      false: {
        base: "bg-background",
      },
      true: {},
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
    {
      isBlurred: true,
      position: ["static", "sticky"],
      class: {
        base: [
          "before:content-['']",
          "before:block",
          "before:z-[-1]",
          "before:absolute",
          "before:-top-px",
          "before:inset-0",
          "before:backdrop-blur",
          "before:backdrop-saturate-150",
          "before:bg-background/80",
          "dark:before:bg-background/50",
          "data-[menu-open=true]:before:bg-background",
        ],
      },
    },
    {
      isBlurred: true,
      position: "floating",
      class: {
        base: "bg-gradient-to-b from-background to-transparent",
        wrapper: [
          "before:content-['']",
          "before:block",
          "before:z-[-1]",
          "before:absolute",
          "before:-top-px",
          "before:inset-0",
          "before:backdrop-blur",
          "before:backdrop-saturate-150",
          "before:bg-background/50",
          "data-[menu-open=true]:before:bg-background",
        ],
      },
    },
  ],
});

export type NavbarVariantProps = VariantProps<typeof navbar>;
export type NavbarSlots = keyof ReturnType<typeof navbar>;

export {navbar};
