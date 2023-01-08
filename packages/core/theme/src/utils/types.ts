import type {VariantProps} from "class-variance-authority";

/**
 *  This is a utility type that allows you to extend the props of a component and add variant props.
 * @example
 *
 * import {cva, VariantProps, ExtendVariantProps} from "@nextui-org/theme";
 *
 * type ComponentProps = {
 *  foo: string;
 *  bar: string;
 * }
 *
 * const myComponent = cva(["text-blue-500", "font-bold"], {
 *  variants: {
 *    isFoo: {
 *      true: "text-red-500",
 *      false: "text-green-500"
 *    }
 *  }
 * })
 *
 * type MyVariantProps = VariantProps<typeof myComponent>;
 *
 * type MyComponentProps = ExtendVariantProps<ComponentProps, MyVariantProps>;
 */
export type ExtendVariantProps<P, T extends VariantProps<any>> = Omit<P, keyof T> & T;
