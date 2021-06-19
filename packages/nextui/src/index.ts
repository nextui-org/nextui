/// <reference types="styled-jsx" />
const _JSXStyle = require('styled-jsx/style').default;

if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle });
}

export * from './components/index';
export * from './theme/index';
export * from './hooks/index';
