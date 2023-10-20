const ChevronDownIcon = `export const ChevronDownIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);`;

const App = `import {Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {ChevronDownIcon} from "./ChevronDownIcon";

export default function App() {
  return (
    <Breadcrumbs
      itemClasses={{
        item: "px-2",
        separator: "px-0",
      }}
    >
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#music">Music</BreadcrumbItem>
      <BreadcrumbItem href="#artist">Artist</BreadcrumbItem>
      <BreadcrumbItem href="#album">Album</BreadcrumbItem>
      <BreadcrumbItem
        classNames={{
          item: "px-0",
        }}
      >
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="h-6 pr-2 text-small"
              endContent={<ChevronDownIcon className="text-default-500" />}
              radius="full"
              size="sm"
              variant="light"
            >
              Songs
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Routes">
            <DropdownItem href="#song-1">
              Song 1
            </DropdownItem>
            <DropdownItem href="#song2">
              Song 2
            </DropdownItem>
            <DropdownItem href="#song3">
              Song 3
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}`;

const react = {
  "/App.jsx": App,
  "/ChevronDownIcon.jsx": ChevronDownIcon,
};

export default {
  ...react,
};
