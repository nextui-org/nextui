const ExampleBlock = `import { useTheme } from '@nextui-org/react';
import React from 'react';

export const ExampleBlock = ({
  children,
  plain,
  width,
  height,
  radius,
  ...props
}) => {
  const { theme } = useTheme();
  const blockWidth = React.useMemo(() => {
    return width ? \`\${width}px\` : "100%";
  }, [width]);
  const bg = "#0070F3";

  return (
    <div className="block" {...props}>
      {children}
      <style jsx>{\`
        .block {
          min-width: \${blockWidth};
          min-height: 30px;
          background: \${bg};
          border-radius: 10px;
          font-size: 0.75rem;
          padding: 0.75rem;
        }
      \`}</style>
    </div>
  );
};`;

const AppJs = `import { Spacer } from "@nextui-org/react";
import { ExampleBlock } from "./ExampleBlock";

export default function App() {
  return (
    <>
  <ExampleBlock>
    <Spacer y={1}/>
  </ExampleBlock>
  <Spacer y={1}/>
  <ExampleBlock>
    <Spacer y={2}/>
  </ExampleBlock>
  <Spacer y={1}/>
  <ExampleBlock>
    <Spacer y={3}/>
  </ExampleBlock>
</>
  );
}`;

const react = {
  '/ExampleBlock.js': ExampleBlock,
  '/App.js': AppJs
};

export default {
  ...react
};
