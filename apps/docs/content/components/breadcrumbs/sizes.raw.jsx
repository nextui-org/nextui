import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";

export default function App() {
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="flex flex-col flex-wrap gap-4">
      {sizes.map((size) => (
        <Breadcrumbs key={size} size={size}>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Music</BreadcrumbItem>
          <BreadcrumbItem>Artist</BreadcrumbItem>
          <BreadcrumbItem>Album</BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
      ))}
    </div>
  );
}
