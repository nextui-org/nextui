import {get} from "lodash";

import {FileCode} from "./types";

const importRegex = /^(import)\s(?!type(of\s|\s)(?!from)).*?$/gm;

const exportDefaultRegex = /export\s+default\s+function\s+\w+\s*\(\s*\)\s*\{/;

export const transformCode = (code: string, imports = {}, compName = "App") => {
  let cleanedCode = code
    .replace(importRegex, (match) => {
      // get component name from the match ex. "import { Table } from '@nextui-org/react'"
      const componentName = match.match(/\w+/g)?.[1] || "";
      const matchingImport = get(imports, componentName);

      if (matchingImport) {
        // remove the matching import
        return "";
      }

      // if match includes './' or '../' then remove it
      if (match.includes("./") || match.includes("../")) {
        return "";
      }

      return match;
    })
    .replace(exportDefaultRegex, () => {
      // replace match with const Name = () => (
      return `const ${compName} = () => {`;
    })
    .replace("export", "");

  // add render(<App/>) to cleanedCode if has const App = () => {
  if (cleanedCode.includes(`const App = () => {`)) {
    cleanedCode = `${cleanedCode}\nrender(<${compName}/>);`;
  }
  // delete comments from the code
  cleanedCode = cleanedCode.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");

  return cleanedCode;
};

export const joinCode = (filesCode: FileCode[]) => {
  // join all the code
  const code = filesCode.reduce((acc, {code}) => {
    return `${acc}${code}`;
  }, "");

  return code;
};

export const getFileName = (filePath: string) => {
  return filePath?.split(".")?.[0]?.replace(/\W/g, "");
};
