import {cva, linkVariants, type ExtendVariantProps, type VariantProps} from "@nextui-org/theme";
import {Link, LinkProps} from "@nextui-org/link";
const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

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

function App() {
  return (
    <div className="flex flex-col space-y-3">
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
      <MyLink link color="teal" href="#">
        Visit out new Store
      </MyLink>
    </div>
  );
}

export default App;
