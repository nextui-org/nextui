// import {styled} from "@nextui-org/system";
// import {cssFocusVisible} from "@nextui-org/shared-css";

// export const StyledRadioText = styled("span", {
//   fontSize: "$$radioSize",
//   us: "none",
//   d: "inline-flex",
//   ai: "center",
//   variants: {
//     color: {
//       default: {
//         color: "$text",
//       },
//       primary: {
//         color: "$primary",
//       },
//       secondary: {
//         color: "$secondary",
//       },
//       success: {
//         color: "$success",
//       },
//       warning: {
//         color: "$warning",
//       },
//       error: {
//         color: "$error",
//       },
//     },
//     isDisabled: {
//       true: {
//         color: "$accents5",
//       },
//     },
//     isInvalid: {
//       true: {
//         color: "$error",
//       },
//     },
//   },
// });

// export const StyledRadioPoint = styled(
//   "span",
//   {
//     size: "$$radioSize",
//     br: "$$radioRadii",
//     position: "relative",
//     d: "inline-block",
//     mr: "calc($$radioSize * 0.375)",
//     "&:after": {
//       content: "",
//       d: "block",
//       position: "absolute",
//       size: "$$radioSize",
//       br: "$$radioRadii",
//       boxSizing: "border-box",
//       border: "2px solid $border",
//     },
//   },
//   cssFocusVisible,
// );

// export const StyledRadio = styled("label", {
//   d: "flex",
//   w: "initial",
//   ai: "flex-start",
//   position: "relative",
//   fd: "column",
//   jc: "flex-start",
//   cursor: "pointer",
//   "@motion": {
//     [`& ${StyledRadioPoint}`]: {
//       transition: "none",
//       "&:after": {
//         transition: "none",
//       },
//     },
//   },
//   variants: {
//     color: {
//       default: {
//         $$radioColor: "$colors$primary",
//         $$radioColorHover: "$colors$primarySolidHover",
//       },
//       primary: {
//         $$radioColor: "$colors$primary",
//         $$radioColorHover: "$colors$primarySolidHover",
//       },
//       secondary: {
//         $$radioColor: "$colors$secondary",
//         $$radioColorHover: "$colors$secondarySolidHover",
//       },
//       success: {
//         $$radioColor: "$colors$success",
//         $$radioColorHover: "$colors$successSolidHover",
//       },
//       warning: {
//         $$radioColor: "$colors$warning",
//         $$radioColorHover: "$colors$warningSolidHover",
//       },
//       error: {
//         $$radioColor: "$colors$error",
//         $$radioColorHover: "$colors$errorSolidHover",
//       },
//     },
//     size: {
//       xs: {
//         $$radioSize: "$space$7",
//       },
//       sm: {
//         $$radioSize: "$space$8",
//       },
//       md: {
//         $$radioSize: "$space$9",
//       },
//       lg: {
//         $$radioSize: "$space$10",
//       },
//       xl: {
//         $$radioSize: "$space$11",
//       },
//     },
//     isHovered: {
//       true: {},
//     },
//     isInvalid: {
//       true: {
//         $$radioColor: "$colors$error",
//         $$radioColorHover: "$colors$errorSolidHover",
//         [`& ${StyledRadioPoint}`]: {
//           "&:after": {
//             borderColor: "$colors$error",
//           },
//         },
//       },
//     },
//     isDisabled: {
//       true: {
//         cursor: "not-allowed",
//         $$radioColor: "$colors$accents4",
//       },
//     },
//     isSquared: {
//       true: {
//         $$radioRadii: "$radii$squared",
//       },
//       false: {
//         $$radioRadii: "$radii$rounded",
//       },
//     },
//     isChecked: {
//       true: {
//         [`& ${StyledRadioPoint}`]: {
//           "&:after": {
//             border: "calc($$radioSize * 0.34) solid $$radioColor",
//           },
//         },
//       },
//     },
//     disableAnimation: {
//       true: {
//         [`& ${StyledRadioPoint}`]: {
//           transition: "none",
//           "&:after": {
//             transition: "none",
//           },
//         },
//       },
//       false: {
//         [`& ${StyledRadioPoint}`]: {
//           transition: "$default",
//           "&:after": {
//             transition: "$default",
//           },
//         },
//       },
//     },
//   },
//   compoundVariants: [
//     // isChecked && isHovered
//     {
//       isChecked: true,
//       isHovered: true,
//       css: {
//         [`& ${StyledRadioPoint}`]: {
//           "&:after": {
//             border: "calc($$radioSize * 0.34) solid $$radioColorHover",
//           },
//         },
//       },
//     },
//     // isChecked && isDisabled & isHovered
//     {
//       isChecked: true,
//       isDisabled: true,
//       isHovered: true,
//       css: {
//         [`& ${StyledRadioPoint}`]: {
//           "&:after": {
//             border: "calc($$radioSize * 0.34) solid $$radioColor",
//           },
//         },
//       },
//     },
//     // !isChecked && !isDisabled && isHovered
//     {
//       isChecked: false,
//       isDisabled: false,
//       isHovered: true,
//       css: {
//         [`& ${StyledRadioPoint}`]: {
//           bg: "$border",
//         },
//       },
//     },
//   ],
// });

// export const StyledRadioDescription = styled("span", {
//   color: "$accents7",
//   fontSize: "calc($$radioSize * 0.85)",
//   paddingLeft: "calc($$radioSize + $$radioSize * 0.375)",
//   variants: {
//     isInvalid: {
//       true: {
//         color: "$red500",
//       },
//     },
//     isDisabled: {
//       true: {
//         color: "$accents5",
//       },
//     },
//   },
// });

// export const StyledRadioContainer = styled("div", {
//   w: "initial",
//   position: "relative",
//   d: "flex",
//   fd: "row",
//   ai: "center",
//   jc: "flex-start",
// });
