import React from "react";
import {cva, linkVariants, type VariantProps, ExtendVariantProps} from "@nextui-org/theme";

import {Link, LinkProps} from "../src";

export default {
  title: "Navigation/Link",
  component: Link,
};

const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

export const Default = () => <Link href="#">{text}</Link>;

export const isDisabled = () => (
  <Link isDisabled href="#">
    {text}
  </Link>
);

const customLink = cva(null, {
  variants: {
    color: {
      ...linkVariants.color,
      teal: "text-teal-600",
    },
    link: {
      true: "before:content-['👉'] before:mr-1",
    },
  },
});

type MyLinkProps = ExtendVariantProps<LinkProps, VariantProps<typeof customLink>>;

const MyLink = (props: MyLinkProps) => {
  const {link, color, ...otherProps} = props;

  return <Link {...otherProps} className={customLink({color, link})} isExternal={!!link} />;
};

export const CustomVariant = () => {
  return (
    <MyLink link color="teal" href="#">
      Visit out new Store
    </MyLink>
  );
};

export const Sizes = () => (
  <div className="flex flex-col space-y-2">
    <Link color="primary" href="#" size="xs">
      {text}
    </Link>
    <Link color="secondary" href="#" size="sm">
      {text}
    </Link>
    <Link color="success" href="#" size="md">
      {text}
    </Link>
    <Link color="warning" href="#" size="xl">
      {text}
    </Link>
    <Link className="text-2xl" color="error" href="#">
      {text}
    </Link>
    <Link className="text-2xl text-pink-500" href="#">
      {text}
    </Link>
  </div>
);

export const Colors = () => (
  <div className="flex flex-col space-y-2">
    <Link color="foreground" href="#">
      {text}
    </Link>
    <Link color="primary" href="#">
      {text}
    </Link>
    <Link color="secondary" href="#">
      {text}
    </Link>
    <Link color="success" href="#">
      {text}
    </Link>
    <Link color="warning" href="#">
      {text}
    </Link>
    <Link color="error" href="#">
      {text}
    </Link>
    <Link className="text-teal-600" href="#">
      {text}
    </Link>
  </div>
);

export const isUnderline = () => (
  <Link isUnderline color="primary" href="#">
    {text}
  </Link>
);

export const isExternal = () => {
  const CustomLink = () => {
    return (
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
  };

  return (
    <div className="flex flex-col space-y-2">
      <Link isExternal showAnchorIcon href="#">
        {text}
      </Link>
      <Link isExternal showAnchorIcon color="secondary" href="#">
        {text}
      </Link>
      <Link isExternal showAnchorIcon anchorIcon={<CustomLink />} color="success" href="#">
        {text}
      </Link>
    </div>
  );
};

export const isBlock = () => (
  <div className="flex flex-col space-y-2">
    <Link isBlock color="foreground" href="#">
      {text}
    </Link>
    <Link isBlock color="primary" href="#">
      {text}
    </Link>
    <Link isBlock color="secondary" href="#">
      {text}
    </Link>
    <Link isBlock color="success" href="#">
      {text}
    </Link>
    <Link isBlock color="warning" href="#">
      {text}
    </Link>
    <Link isBlock color="error" href="#">
      {text}
    </Link>
    <Link isBlock className="text-pink-500 hover:after:bg-pink-500/25" href="#">
      {text}
    </Link>
  </div>
);
