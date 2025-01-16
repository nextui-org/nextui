import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";

export default function App() {
  return (
    <Breadcrumbs itemsAfterCollapse={2} itemsBeforeCollapse={1} maxItems={3}>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#music">Music</BreadcrumbItem>
      <BreadcrumbItem href="#artist">Artist</BreadcrumbItem>
      <BreadcrumbItem href="#album">Album</BreadcrumbItem>
      <BreadcrumbItem href="#song">Song</BreadcrumbItem>
    </Breadcrumbs>
  );
}
