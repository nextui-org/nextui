import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * Keyboard Key wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const { base, abbr, content } = kbd()
 *
 * <kbd className={base()} >
 *    <abbr title="Command" className={abbr()}>⌘</abbr>
 *    <abbr title="Shift" className={abbr()}>⇧</abbr>
 *    <abbr title="Control" className={abbr()}>⌃</abbr>
 *    <abbr title="Option" className={abbr()}>⌥</abbr>
 *    <abbr title="Enter" className={abbr()}>↵</abbr>
 *    <abbr title="Delete" className={abbr()}>⌫</abbr>
 *    <abbr title="Escape" className={abbr()}>⎋</abbr>
 *    <abbr title="Tab" className={abbr()}>⇥</abbr>
 *    <abbr title="Caps Lock" className={abbr()}>⇪</abbr>
 *    <abbr title="Up" className={abbr()}>↑</abbr>
 *    <abbr title="Right" className={abbr()}>→</abbr>
 *    <abbr title="Down" className={abbr()}>↓</abbr>
 *    <abbr title="Left" className={abbr()}>←</abbr>
 *    <abbr title="Page Up" className={abbr()}>⇞</abbr>
 *    <abbr title="Page Down" className={abbr()}>⇟</abbr>
 *    <abbr title="Home" className={abbr()}>↖</abbr>
 *    <abbr title="End" className={abbr()}>↘</abbr>
 *    <abbr title="Help" className={abbr()}>?</abbr>
 *    <abbr title="Space" className={abbr()}>␣</abbr>
 *    <span className={content()}>A</span>
 * </kbd>
 */
const kbd = tv({
  slots: {
    base: [
      "px-1.5",
      "py-0.5",
      "inline-flex",
      "space-x-0.5",
      "items-center",
      "font-sans",
      "font-normal",
      "text-center",
      "text-small",
      "shadow-small",
      "bg-default-100",
      "text-foreground-600",
      "rounded-small",
    ],
    abbr: "no-underline",
    content: "",
  },
  variants: {},
  defaultVariants: {},
});

export type KbdVariantProps = VariantProps<typeof kbd>;
export type KbdSlots = keyof ReturnType<typeof kbd>;

export {kbd};
