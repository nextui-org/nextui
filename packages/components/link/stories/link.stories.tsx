import React from "react";
// import {cva, linkVariants, type VariantProps, ExtendVariantProps} from "@nextui-org/theme";

import {Link, LinkProps} from "../src";

export default {
  title: "Navigation/Link",
  component: Link,
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: ["foreground", "primary", "secondary", "success", "warning", "error"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["xs", "sm", "md", "xl"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
};

const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

const Template = (args: LinkProps) => (
  <Link {...args} href="#">
    {text}
  </Link>
);

export const Default = Template.bind({}) as any;
Default.args = {
  isDisabled: false,
  color: "foreground",
  size: "md",
};

export const isUnderline = Template.bind({}) as any;
isUnderline.args = {
  isUnderline: true,
  isDisabled: false,
  size: "md",
};

const CustomLink = () => (
  <svg
    className="custom-link-icon ml-1"
    fill="none"
    height="1em"
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="1em"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const isExternal = Template.bind({}) as any;
isExternal.args = {
  isExternal: true,
  isDisabled: false,
  showAnchorIcon: true,
  size: "md",
  anchorIcon: <CustomLink />,
};

export const isBlock = Template.bind({}) as any;

isBlock.args = {
  isBlock: true,
  isDisabled: false,
  size: "md",
  color: "secondary",
};

// const customLink = cva(null, {
//   variants: {
//     color: {
//       ...linkVariants.color,
//       teal: "text-teal-600",
//     },
//     link: {
//       true: "before:content-['👉'] before:mr-1",
//     },
//   },
// });

// type MyLinkProps = ExtendVariantProps<LinkProps, VariantProps<typeof customLink>>;

// const MyLink = (props: MyLinkProps) => {
//   const {link, color, ...otherProps} = props;

//   return <Link {...otherProps} className={customLink({color, link})} isExternal={!!link} />;
// };

// export const CustomVariant = () => {
//   return (
//     <MyLink link color="teal" href="#">
//       Visit out new Store
//     </MyLink>
//   );
// };
