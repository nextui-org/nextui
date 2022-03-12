import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme, Loading } from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';
import {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackHighlightedLines
} from '@components';
import Sandpack from '../sandpack';
import Title from './title';
import { isEmpty } from 'lodash';
import LiveCode, { scope } from './dynamic-live';
import { transformCode } from './utils';

const DynamicLive = dynamic(() => import('./dynamic-live'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <div style={{ padding: '20pt 0' }}>
      <Loading type="spinner" />
    </div>
  )
});

interface Props {
  title?: React.ReactNode | string;
  desc?: React.ReactNode | string;
  showEditor?: boolean;
  showSandpackPreview?: boolean;
  initialEditorOpen?: boolean;
  overflow?: 'auto' | 'visible' | 'hidden';
  files?: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: SandpackHighlightedLines;
  code?: string;
}

const defaultProps = {
  desc: '',
  title: '',
  code: '',
  files: {},
  showEditor: true,
  showSandpackPreview: false,
  initialEditorOpen: false,
  overflow: 'visible',
  bindings: {}
};

export type PlaygroundProps = Props & typeof defaultProps;

const Playground: React.FC<PlaygroundProps> = ({
  title: inputTitle,
  code: inputCode,
  initialEditorOpen,
  showEditor,
  highlightedLines,
  showSandpackPreview,
  files,
  overflow,
  desc
}) => {
  const { theme } = useTheme();

  const isSanpackEditor = !isEmpty(files);

  const title = inputTitle;
  let code = inputCode.trim();
  let noInline = false;

  if (isSanpackEditor) {
    // get first item from files
    const file = Object.values(files)[0] as string;

    //transform scope to key text vlaue
    const scopeKeys = Object.keys(scope);
    // convert scopeKeys to string values
    const scopeValues = scopeKeys.map((key) => {
      return { [key]: `${key}` };
    });
    // add 'React' to scopeValues
    scopeValues.push({ React: 'React' });
    // convert scopeValues to object
    const imports = Object.assign({}, ...scopeValues);

    code = transformCode(file, imports);
    // check if transformedCode icludes 'const App = () => {'
    noInline = code.includes('const App = () => {');
  }

  return (
    <>
      {(title || desc) && <Title title={title} desc={desc} />}
      <div className="playground">
        {isSanpackEditor ? (
          <Sandpack
            files={files}
            showPreview={showSandpackPreview}
            highlightedLines={highlightedLines}
          >
            <LiveCode
              noInline={noInline}
              showEditor={false}
              code={code}
              overflow={overflow}
            />
          </Sandpack>
        ) : (
          <DynamicLive
            showEditor={showEditor}
            initialEditorOpen={initialEditorOpen}
            code={code}
            overflow={overflow}
          />
        )}
        <style jsx>{`
          .playground {
            width: 100%;
            margin-bottom: ${theme?.space?.xl};
          }
        `}</style>
      </div>
    </>
  );
};

const MemoPlayground = React.memo(Playground);

export default withDefaults(MemoPlayground, defaultProps);
