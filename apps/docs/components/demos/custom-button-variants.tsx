/* eslint-disable react/display-name */
"use client";
// import {Button, button, tv, VariantProps} from "@nextui-org/react";
// import {ReactNode} from "react";
import React from "react";
import {MyButton2} from "@nextui-org/react";

// import {extendStyles} from "./styled";

// const MyButton = ({isScalable, ...otherProps}: MyButtonProps) => {
//   // let variants = {};

//   // if (isScalable) {
//   //   variants = {
//   //     isScalable: {
//   //       true: "scale-125",
//   //     },
//   //   };
//   // }

//   return (
//     <Button
//       isScalable={isScalable}
//       variants={{
//         isScalable: {
//           true: "scale-125",
//           false: "",
//         },
//       }}
//       {...otherProps}
//     >
//       Press me
//     </Button>
//   );
// };

export const CustomButtonVariants = () => {
  return <MyButton2 size="md">Press me</MyButton2>;
};

// const uiButton = tv({
//   base: "",
//   variants: {
//     isPressed: {
//       true: {},
//       false: {},
//     },
//   },
// });

// type UIButtonTV = typeof uiButton;

// type Compare<F extends (...args: any[]) => any, G extends (...args: any[]) => any> = F extends G
//   ? G extends F
//     ? "true"
//     : "false"
//   : "false";

// // type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// function UIButton<
//   T = UIButtonTV,
//   //@ts-expect-error
//   VP = VariantProps<Compare<T["extend"], UIButtonTV> extends "true" ? T : UIButtonTV>,
// >(props: {children?: ReactNode; tv?: T} & VP) {
//   const {children, tv, ...variants} = props;

//   const vars = variants as any;

//   const styleRender = tv ?? uiButton;

//   return <button className={styleRender(variants)}>{children}</button>;
// }

// const customButton = tv({
//   extend: uiButton,
//   variants: {
//     isScalable: {
//       true: [
//         "relative",
//         "px-12",
//         "shadow-xl",
//         "overflow-visible",
//         "rounded-full",
//         "hover:-translate-y-1",
//         "bg-background/30",
//         "after:content-['']",
//         "after:absolute",
//         "after:rounded-full",
//         "after:inset-0",
//         "after:bg-background/40",
//         "after:z-[-1]",
//         "after:transition",
//         "after:!duration-500",
//         "hover:after:scale-150",
//         "hover:after:opacity-0",
//       ],
//     },
//   },
// });

// type CustomButtonTV = typeof customButton;

// type Variants = CustomButtonTV["variants"] & UIButtonTV["variants"];
// type Extend = CustomButtonTV["extend"];

// type Result = Compare<UIButtonTV, Extend>;

// const App = () => {
//   return (
//     <UIButton isScalable={true} tv={customButton}>
//       Press me
//     </UIButton>
//   );
// };

// type VProps = VariantProps<typeof customButton>;
