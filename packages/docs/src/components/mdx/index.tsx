import Playground from '../playground';
import Codeblock from './codeblock';
import * as Icons from '../icons';

const MDXComponents = {
  ...Icons,
  Playground,
  code: Codeblock,
};

export default MDXComponents;
