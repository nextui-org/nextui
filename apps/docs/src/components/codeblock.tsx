import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";

import {highlight} from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import {CodeBlock as CodeBlockClient} from "./codeblock-client";

export async function CodeBlock({
  className,
  code,
  collapsible,
  isIsolated = false,
  lang,
  showLineNumbers,
  title,
  ...props
}: {
  code: string;
  lang: string;
  // Means the code block is rendered directly in the MDX file using <CollapsibleCode>
  isIsolated?: boolean;
  showLineNumbers?: boolean;
  title: string | undefined;
  collapsible?: boolean;
} & CodeBlockProps) {
  let rendered;
  let renderedPreview;
  let highlightFailed = false;
  const components = {
    pre: (props: React.ComponentProps<typeof Base.Pre>) => <Base.Pre {...props} />,
  };

  // Trim the code to avoid issues with leading/trailing whitespace
  const trimmedCode = code?.trim() || "";

  // Skip highlighting for empty code blocks
  if (trimmedCode) {
    try {
      const lines = trimmedCode.split("\n");

      if (lines.length > 10) {
        const previewCode = lines.slice(0, 5).join("\n");

        renderedPreview = await highlight(previewCode, {
          components,
          lang: lang || "text",
        });
      }

      rendered = await highlight(trimmedCode, {
        components,
        lang: lang || "text",
        // other Shiki options
      });
    } catch (error) {
      console.error("Syntax highlighting error:", error);
      highlightFailed = true;
    }
  }

  if (!trimmedCode || highlightFailed) {
    // Fallback to plain code block without syntax highlighting
    rendered = (
      <Base.Pre>
        <code>{highlightFailed ? code : undefined}</code>
      </Base.Pre>
    );
  }

  return (
    <CodeBlockClient
      className={className}
      code={code?.trim() || ""}
      collapsible={collapsible}
      isIsolated={isIsolated}
      lang={lang}
      preview={renderedPreview}
      showLineNumbers={showLineNumbers}
      title={title}
      {...props}
    >
      {rendered}
    </CodeBlockClient>
  );
}
