const App = `import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function App() {
  const underlines = ["none", "hover", "always", "active", "focus"];

  return (
    <div className="flex flex-col flex-wrap gap-4">
      {underlines.map((u) => (
        <Breadcrumbs key={u} underline={u}>
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
