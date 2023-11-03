const App = `import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function App() {
  const radius = [ "full", "lg", "md", "sm", "none"];

  return (
    <div className="flex flex-col flex-wrap gap-4">
      {radius.map((r) => (
        <Breadcrumbs key={r} radius={r} variant="solid">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Music</BreadcrumbItem>
          <BreadcrumbItem>Artist</BreadcrumbItem>
          <BreadcrumbItem>Album</BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
