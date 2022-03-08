import { get } from 'lodash';

const importRegex =
  /import(?:["'\s]*([\w*{}\n, ]+)from\s*)["'\s]*([@\w/_-]+)["'\s]*;?/gm;

// regex for 'export default function App() {'
const exportDefaultRegex = /export\s+default\s+function\s+\w+\s*\(\s*\)\s*\{/;

export const transformCode = (code: string, imports = {}) => {
  let cleanedCode = code
    .replace(importRegex, (match, p1) => {
      const [p1Clean] = p1.match(/\w+/g);
      const matchingImport = get(imports, p1Clean);
      if (!matchingImport) {
        // leave it alone if we don't have a matching import
        return match;
      }
      return '';
    })
    .replace(exportDefaultRegex, () => {
      // replace match with const Name = () => (
      return `const App = () => {`;
    });
  // add render(<App/>) to cleanedClode if has const App = () => {
  if (cleanedCode.includes('const App = () => {')) {
    cleanedCode = `${cleanedCode}\nrender(<App/>);`;
  }
  return cleanedCode;
};
