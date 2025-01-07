import {Link} from "@heroui/react";
import NextLink from "next/link";

export default function App() {
  return (
    <Link as={NextLink} href="/route">
      Next.js Link
    </Link>
  );
}
