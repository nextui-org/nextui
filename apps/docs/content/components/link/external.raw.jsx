import {Link} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link isExternal href="https://github.com/nextui-org/nextui">
        External Link
      </Link>
      <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
        External Link Anchor
      </Link>
    </div>
  );
}
