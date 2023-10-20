const App = `import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function App() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/docs/components/button">Button</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/breadcrumbs">Breadcrumbs</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/card">Card</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/checkbox">Checkbox</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/code">Code</BreadcrumbItem>
    </Breadcrumbs>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
