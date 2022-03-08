import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme, Loading } from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';
import { SandpackFiles, SandpackPredefinedTemplate } from '@components';
import Title from './title';
import { isEmpty } from 'lodash';

const DynamicLive = dynamic(() => import('./dynamic-live'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <div style={{ padding: '20pt 0' }}>
      <Loading type="spinner" />
    </div>
  )
});

const DynamicSandpack = dynamic(() => import('../sandpack'), {
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
  highlightedLines?: string;
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
  const code = inputCode.trim();
  const title = inputTitle;

  // get first item from files
  const file = Object.values(files)[0] as string;

  return (
    <>
      {(title || desc) && <Title title={title} desc={desc} />}
      <div className="playground">
        {!isEmpty(files) ? (
          <DynamicSandpack
            files={files}
            showPreview={showSandpackPreview}
            highlightedLines={highlightedLines}
          >
            <DynamicLive showEditor={false} code={file} overflow={overflow} />
          </DynamicSandpack>
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
