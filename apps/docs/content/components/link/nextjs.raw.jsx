import {Link} from "@nextui-org/react";
import NextLink from "next/link";

export default function App() {
  return (
    <Link as={NextLink} href="/route">
      Next.js Link
    </Link>
  );
}
