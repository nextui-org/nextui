const App = `import {Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Breadcrumbs
      maxItems={3}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={2}
      renderEllipsis={({items, ellipsisIcon, separator}) => (
        <div className="flex items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className="min-w-6 w-6 h-6"
                size="sm"
                variant="flat"
              >
                {ellipsisIcon}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Routes">
              {items.map((item, index) => (
                <DropdownItem key={index} href={item.href}>
                  {item.children}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {separator}
        </div>
      )}
    >
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#music">Music</BreadcrumbItem>
      <BreadcrumbItem href="#artist">Artist</BreadcrumbItem>
      <BreadcrumbItem href="#album">Album</BreadcrumbItem>
      <BreadcrumbItem href="#featured">Featured</BreadcrumbItem>
      <BreadcrumbItem href="#song">Song</BreadcrumbItem>
    </Breadcrumbs>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
