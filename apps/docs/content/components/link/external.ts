const App = `import { Link, StyledLinkIcon, Spacer, Badge } from "@nextui-org/react";

const CustomLink = () => {
  return (
    <StyledLinkIcon
      className="custom-link-icon" 
      width="1em" 
      height="1em"
      fill="none" 
      viewBox="0 0 24 24"
      shapeRendering="geometricPrecision"
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </StyledLinkIcon>
  )
}

export default function App() {
  return (
    <>
      <Link href="#">
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
      <Spacer />
      <Link href="#" isExternal color="success">
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
      <Spacer />
      <Link href="#" isExternal externalIcon={<CustomLink />} color="success">
        "First solve the problem. Then, write the code." - Jon Johnson.
      </Link>
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
