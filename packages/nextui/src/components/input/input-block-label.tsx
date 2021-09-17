import React from 'react';
import useTheme from '../../hooks/use-theme';

export interface InputBlockLabelLabel {}

const InputBlockLabel: React.FC<React.PropsWithChildren<InputBlockLabelLabel>> =
  ({ children }) => {
    const theme = useTheme();

    return (
      <label>
        {children}
        <style jsx>{`
          label {
            display: block;
            font-weight: normal;
            color: ${theme.palette.accents_6};
            padding: 0 0 0 1px;
            margin-bottom: ${theme.layout.gapHalf};
            font-size: 1rem;
            line-height: 1.5;
          }

          label > :global(*:first-child) {
            margin-top: 0;
          }

          label > :global(*:last-child) {
            margin-bottom: 0;
          }
        `}</style>
      </label>
    );
  };

const MemoInputBlockLabel = React.memo(InputBlockLabel);

export default MemoInputBlockLabel;
