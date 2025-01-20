import {Disclosure} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const classNames = {
    content: "ease-soft-spring",
  };

  return (
    <Disclosure classNames={classNames} title="Custom Motion">
      {defaultContent}
    </Disclosure>
  );
}
