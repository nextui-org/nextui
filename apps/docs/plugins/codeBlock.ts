import {visit} from "unist-util-visit";

function remarkCodePlugin() {
  return (tree: any) => {
    visit(tree, "code", (node) => {
      if (node.lang === "codeBlock") {
        const meta = node.meta || "";
        const value = node.value || "";

        if (!meta || !value) {
          return;
        }

        // Use Snippet to render code block
        Object.assign(node, {
          type: "mdxJsxFlowElement",
          name: "Snippet",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "disableTooltip",
              value: true,
            },
            {
              type: "mdxJsxAttribute",
              name: "fullWidth",
              value: true,
            },
            {
              type: "mdxJsxAttribute",
              name: "hideSymbol",
              value: true,
            },
            {
              type: "mdxJsxAttribute",
              name: "classNames",
              value: {
                type: "mdxJsxAttributeValueExpression",
                value:
                  "{base: 'bg-code-background text-code-foreground' , pre: 'font-light text-base', copyButton: 'text-lg text-zinc-500 mr-2'}",
                data: {
                  estree: {
                    type: "Program",
                    body: [
                      {
                        type: "ExpressionStatement",
                        expression: {
                          type: "ObjectExpression",
                          properties: [
                            {
                              type: "Property",
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: "Identifier",
                                name: "base",
                              },
                              value: {
                                type: "Literal",
                                value: "bg-code-background text-code-foreground",
                                raw: "'bg-code-background text-code-foreground'",
                              },
                              kind: "init",
                            },
                            {
                              type: "Property",
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: "Identifier",
                                name: "pre",
                              },
                              value: {
                                type: "Literal",
                                value: "font-light text-base",
                                raw: "'font-light text-base'",
                              },
                              kind: "init",
                            },
                            {
                              type: "Property",
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: "Identifier",
                                name: "copyButton",
                              },
                              value: {
                                type: "Literal",
                                value: "text-lg text-zinc-500 mr-2",
                                raw: "'text-lg text-zinc-500 mr-2'",
                              },
                              kind: "init",
                            },
                          ],
                        },
                      },
                    ],
                    sourceType: "module",
                    comments: [],
                  },
                },
              },
            },
          ],
          children: [
            {
              type: "mdxJsxFlowElement",
              name: "Codeblock",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "removeIndent",
                  value: true,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "language",
                  value: meta,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "codeString",
                  value: value,
                },
              ],
            },
          ],
        });
      }
    });
  };
}

export default remarkCodePlugin;
