const App = `import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function App() {
  return (
    <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#music">Music</BreadcrumbItem>
      <BreadcrumbItem href="#artist">Artist</BreadcrumbItem>
      <BreadcrumbItem href="#album">Album</BreadcrumbItem>
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
