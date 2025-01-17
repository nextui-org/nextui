import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";

export default function App() {
  const variants = ["solid", "bordered", "light"];

  return (
    <div className="flex flex-col flex-wrap gap-4">
      {variants.map((variant) => (
        <Breadcrumbs key={variant} variant={variant}>
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
