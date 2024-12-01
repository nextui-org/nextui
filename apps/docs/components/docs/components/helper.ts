import type Highlight from "prism-react-renderer";

export type TransformTokens = Parameters<Highlight["props"]["children"]>[0]["tokens"];

export type TransformTokensTypes = TransformTokens[0][0] & {
  folderContent?: TransformTokens;
  summaryContent?: TransformTokens[0];
  class?: string;
  index?: number;
  open?: boolean;
};

const startFlag = ["{", "["];
const endFlag = ["}", "]"];
const isElementStartRegex = /^\s*</;
const isElementEndRegex = /^\s*<\//;

/**
 * Transform tokens from `prism-react-renderer` to wrap them in folder structure
 *
 * @example
 * transformTokens(tokens) -> wrap tokens in folder structure
 */
export function transformTokens(tokens: TransformTokens, folderLine = 10) {
  const result: TransformTokens = [];
  let lastIndex = 0;
  let startElementName = "";

  tokens.forEach((token, index) => {
    if (index < lastIndex) {
      return;
    }
    token.forEach((t) => {
      (t as TransformTokensTypes).index = index;
    });
    result.push(token);

    const lineContent = getLineContent(token);
    const {isStartTag, isEndTag} = checkIsElement(lineContent);

    // If it has startElementName means it is within the element range
    if (startElementName) {
      if (isEndTag) {
        // Judge whether it is the end tag of the element then reset startElementName
        const {endElementName} = getElementName(lineContent);

        if (endElementName === startElementName) {
          startElementName = "";
        }
      }

      return;
    } else if (isStartTag) {
      const {startElementName: elementName, endElementName} = getElementName(lineContent);

      if (!endElementName) {
        startElementName = elementName;

        return;
      }
    }

    let startToken: TransformTokens[0][0] = null as any;

    token.forEach((t) => {
      if (startFlag.includes(t.content)) {
        startToken = t;
      }
    });

    const isFolder = checkIsFolder(token);

    if (isFolder && startToken) {
      const nextLineContent = tokens.slice(index + 1, index + 2).reduce((acc, line) => {
        return acc + getLineContent(line);
      }, "");
      const isNextLineObjectFolder = checkIsObjectContent(nextLineContent);
      const isArrayFolder = lineContent.trim().endsWith("[");

      if (isNextLineObjectFolder || isArrayFolder) {
        const endIndex = findEndIndex(tokens, index + 1);

        // Greater than or equal to folderLine then will folder otherwise it will show directly
        if (endIndex !== -1 && endIndex - index >= folderLine) {
          lastIndex = endIndex;
          const folder = tokens.slice(index + 1, endIndex);
          const endToken = tokens[endIndex];

          (endToken[0] as TransformTokensTypes).class = "first-custom-folder";

          const ellipsisToken: TransformTokensTypes = {
            types: ["ellipsis"],
            content: "",
            class: "custom-folder ellipsis-token",
          };
          const copyContent: TransformTokensTypes = {
            types: ["copy"],
            content: "",
            folderContent: folder,
            class: "custom-folder copy-token",
          };

          endToken.forEach((t, _, arr) => {
            let className = (t as TransformTokensTypes).class || "";

            className += " custom-folder";
            if (t.content.trim() === "" && (arr.length === 3 || arr.length === 4)) {
              // Add length check to sure it's added to } token
              className += " empty-token";
            }
            (t as TransformTokensTypes).class = className;
          });

          startToken.types = ["folderStart"];
          (startToken as TransformTokensTypes).folderContent = folder;
          (startToken as TransformTokensTypes).summaryContent = [
            ...token,
            ellipsisToken,
            copyContent,
            ...endToken,
          ];
          (startToken as TransformTokensTypes).index = index;
          // isShowFolder && ((startToken as TransformTokensTypes).open = true);

          result.splice(result.length - 1, 1, [startToken]);

          return;
        }
      }
    }
  });

  return result;
}

function checkIsFolder(token: TransformTokens[0]) {
  const stack: string[] = [];

  for (const t of token) {
    if (startFlag.includes(t.content)) {
      stack.push(t.content);
    } else if (endFlag.includes(t.content)) {
      stack.pop();
    }
  }

  return stack.length !== 0;
}

function findEndIndex(tokens: TransformTokens, startIndex: number) {
  const stack: string[] = ["flag"];

  for (let i = startIndex; i < tokens.length; i++) {
    const token = tokens[i];

    for (const line of token) {
      const transformLine = line.content.replace(/\$/g, "");

      if (startFlag.includes(transformLine)) {
        stack.push("flag");
      } else if (endFlag.includes(transformLine)) {
        stack.pop();
      }

      if (stack.length === 0) {
        return i;
      }
    }
  }

  return -1;
}

function checkIsElement(lineContent: string) {
  return {
    isStartTag: isElementStartRegex.test(lineContent),
    isEndTag: isElementEndRegex.test(lineContent),
  };
}

function getElementName(lineContent: string) {
  const startElementName = lineContent.match(/^\s*<([a-zA-Z.]+)/);
  const endElementName = lineContent.match(/^\s*<\/([a-zA-Z.]+)>/);

  return {
    startElementName: startElementName?.[1] || (lineContent.includes("<>") ? "<>" : ""),
    endElementName: endElementName?.[1] || (lineContent.includes("</>") ? "</>" : ""),
  };
}

function getLineContent(token: TransformTokens[0]) {
  return token.reduce((acc, t) => acc + t.content, "");
}

function checkIsObjectContent(lineContent: string) {
  lineContent = lineContent.trim();
  // first: match { a }
  // second: match { a: b }
  // third: match { a (b) }
  // fourth: match /** */
  const isObjectContent = /^([\w]+,?$)|([\w\[.\]]+:)|([\w]+\s?\(.*?\)$)|(^\/\*\*)/.test(
    lineContent,
  );
  const hasEqual = /\s=\s/.test(lineContent);
  const hasFunction = lineContent.includes("function");
  const hasVariable = /var|let|const/.test(lineContent);

  return isObjectContent && !hasEqual && !hasFunction && !hasVariable;
}
