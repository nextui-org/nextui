import {Link} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link href="#" size="sm">
        Small
      </Link>
      <Link href="#" size="md">
        Medium
      </Link>
      <Link href="#" size="lg">
        Large
      </Link>
    </div>
  );
}
