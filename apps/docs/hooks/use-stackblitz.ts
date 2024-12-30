import {Project} from "@stackblitz/sdk";
import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {mapKeys} from "@/../../packages/utilities/shared-utils/src";
import {useSandpack} from "@/components/sandpack/use-sandpack";

export interface UseSandpackProps {
  files: SandpackFiles;
  typescriptStrict?: boolean;
}

const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;

export function useStackblitz(props: UseSandpackProps) {
  const {files, typescriptStrict = false} = props;

  const {
    customSetup,
    files: filesData,
    entryFile,
  } = useSandpack({
    files,
    typescriptStrict,
  });
  const transformFiles = mapKeys(filesData, (_, key) => key.replace(/^\//, ""));

  const dependencies = {...customSetup.dependencies, ...customSetup.devDependencies};

  const packageJson = `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    ${Object.entries(dependencies)
      .map(([key, value]) => `"${key}": "${value}"`)
      .join(",\n    ")}
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.3.4",
    "vite": "6.0.6",
    "autoprefixer": "10.4.20",
    "postcss": "8.4.49",
    "tailwindcss": "3.4.17"
  },
  "main": "/index.jsx"
}`;

  const stackblitzPrefillConfig: Project = {
    files: {
      ...Object.fromEntries(
        Object.entries(transformFiles).map(([key, value]) => [key, value.code ?? value]),
      ),
      "vite.config.js": viteConfig,
      "package.json": packageJson,
    },
    dependencies,
    title: "NextUI",
    template: "node",
  };

  const findEntryFile = Object.keys(stackblitzPrefillConfig.files).find((key) =>
    key.includes("App"),
  );

  return {
    entryFile: findEntryFile ?? entryFile,
    stackblitzPrefillConfig,
  };
}
