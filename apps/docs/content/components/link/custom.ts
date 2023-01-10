const App = `import { Link, cva, linkVariants } from "@nextui-org/react";

const customLink = cva(null, {
  variants: {
    color: {
      ...linkVariants.color,
      teal: "text-teal-600",
    },
    isRelevant: {
      true: "before:content-['👉'] before:mr-1",
    },
  },
});

const MyLink = (props) => {
  const {isRelevant, color, ...otherProps} = props;

  return <Link {...otherProps} className={customLink({color, isRelevant})} isExternal={!!link} />;
};


export default function App() {
  return (
    <MyLink link color="teal" href="#">
      Visit out new Store
    </MyLink>
  );
}`;

const AppTs = `import { Link, cva, linkVariants } from "@nextui-org/react";
import type { VariantProps, ExtendVariantProps } from "@nextui-org/react";

const customLink = cva(null, {
  variants: {
    color: {
      ...linkVariants.color,
      teal: "text-teal-600",
    },
    isRelevant: {
      true: "before:content-['👉'] before:mr-1",
    },
  },
});

type MyLinkProps = ExtendVariantProps<LinkProps, VariantProps<typeof customLink>>;

const MyLink = (props: MyLinkProps) => {
  const {isRelevant, color, ...otherProps} = props;

  return <Link {...otherProps} className={customLink({color, isRelevant})} isExternal={!!link} />;
};


export default function App() {
  return (
    <MyLink link color="teal" href="#">
      Visit out new Store
    </MyLink>
  );
}`;

const react = {
  "/App.js": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
