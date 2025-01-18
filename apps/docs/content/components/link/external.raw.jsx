import {Link} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link isExternal href="https://github.com/heroui-inc/heroui">
        External Link
      </Link>
      <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
        External Link Anchor
      </Link>
    </div>
  );
}
