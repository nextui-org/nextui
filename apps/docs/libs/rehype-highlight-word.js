const hastToHtml = require("hast-util-to-html");
const unified = require("unified");
const parse = require("rehype-parse");

const CALLOUT = /__(.*?)__/g;

module.exports = (code) => {
  const html = hastToHtml(code);
  const result = html.replace(CALLOUT, (_, text) => `<span class="highlight-word">${text}</span>`);
  const hast = unified().use(parse, {emitParseErrors: true, fragment: true}).parse(result);

  return hast.children;
};
