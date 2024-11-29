import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function App() {
  return (
    <Breadcrumbs
      itemClasses={{
        separator: "px-2",
      }}
      separator="/"
    >
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Music</BreadcrumbItem>
      <BreadcrumbItem>Artist</BreadcrumbItem>
      <BreadcrumbItem>Album</BreadcrumbItem>
      <BreadcrumbItem>Song</BreadcrumbItem>
    </Breadcrumbs>
  );
}
