const App = `import { Divider } from "@nextui-org/react";

export default function App() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-base font-medium">NextUI Components</h4>
        <p className="text-sm text-default-400">Beautiful, fast and modern React UI library.</p>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Divider orientation="vertical" />
        <div>Docs</div>
        <Divider orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
