import React from "react";
import {Grid} from "@nextui-org/grid";
import {cva, linkVariants, type VariantProps, ExtendVariantProps} from "@nextui-org/theme";

import {Link, LinkProps} from "../src";

export default {
  title: "Navigation/Link",
  component: Link,
};

const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

export const Default = () => <Link href="#">{text}</Link>;

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
  <Grid.Container gap={1}>
    <Grid xs={12}>
      <Link color="primary" href="#" size="xs">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="secondary" href="#" size="sm">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="success" href="#" size="md">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="warning" href="#" size="xl">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link className="text-2xl" color="error" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link className="text-2xl text-pink-500" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
);

export const Colors = () => (
  <Grid.Container gap={1}>
    <Grid xs={12}>
      <Link color="foreground" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="primary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="secondary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="success" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="warning" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link color="error" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link className="text-teal-600" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
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
    <Grid.Container gap={1}>
      <Grid xs={12}>
        <Link isExternal href="#">
          {text}
        </Link>
      </Grid>
      <Grid xs={12}>
        <Link isExternal color="secondary" href="#">
          {text}
        </Link>
      </Grid>
      <Grid xs={12}>
        <Link isExternal color="success" externalIcon={<CustomLink />} href="#">
          {text}
        </Link>
      </Grid>
    </Grid.Container>
  );
};

export const isBlock = () => (
  <Grid.Container gap={1}>
    <Grid xs={12}>
      <Link isBlock color="foreground" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isBlock color="primary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isBlock color="secondary" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isBlock color="success" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isBlock color="warning" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isBlock color="error" href="#">
        {text}
      </Link>
    </Grid>
    <Grid xs={12}>
      <Link isBlock className="text-pink-600 hover:after:bg-pink-600/25" href="#">
        {text}
      </Link>
    </Grid>
  </Grid.Container>
);
