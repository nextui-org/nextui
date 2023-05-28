const App = `import {Link} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link isExternal href="https://github.com/nextui-org/nextui">
        External Link
      </Link>
      <Link
        isExternal
        href="https://github.com/nextui-org/nextui"
        showAnchorIcon
      >
        External Link Anchor
      </Link>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
