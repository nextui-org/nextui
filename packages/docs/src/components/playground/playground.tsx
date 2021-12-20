import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme, Loading } from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';
import Title from './title';

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
  overflow?: 'auto' | 'visible' | 'hidden';
  code: string;
}

const defaultProps = {
  desc: '',
  code: '',
  showEditor: true,
  overflow: 'visible',
  bindings: {}
};

export type PlaygroundProps = Props & typeof defaultProps;

const Playground: React.FC<PlaygroundProps> = ({
  title: inputTitle,
  code: inputCode,
  showEditor,
  overflow,
  desc
}) => {
  const { theme } = useTheme();
  const code = inputCode.trim();
  const title = inputTitle || 'Default';

  return (
    <>
      <Title title={title} desc={desc} />
      <div className="playground">
        <DynamicLive showEditor={showEditor} code={code} overflow={overflow} />
        <style jsx>{`
          .playground {
            width: 100%;
            border-radius: ${theme?.radii?.lg?.value};
          }
        `}</style>
      </div>
    </>
  );
};

const MemoPlayground = React.memo(Playground);

export default withDefaults(MemoPlayground, defaultProps);
