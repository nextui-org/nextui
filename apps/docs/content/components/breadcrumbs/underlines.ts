const App = `import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function App() {
  const underlines = ["none", "hover", "always", "active", "focus"];
  const descriptions = {
    none: "No underline",
    hover: "Underline on hover",
    always: "Always underline",
    active: "Underline on active",
    focus: "Underline on focus",
  }

  return (
    <div className="flex flex-col flex-wrap gap-4">
      {underlines.map((u) => (
        <div key={u}>
          <p className="mb-1 text-small text-default-600 capitalize">
            {descriptions[u]} ({u})
          </p>
          <Breadcrumbs underline={u}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Music</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Album</BreadcrumbItem>
            <BreadcrumbItem>Song</BreadcrumbItem>
          </Breadcrumbs>
        </div>
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
