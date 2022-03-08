import React, { useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { Tooltip, useClipboard } from '@nextui-org/react';
import { Copy as CopyIcon } from '@components';
import { Box } from '@primitives';

const CopyButton = ({}) => {
  const { copy } = useClipboard();
  const [copied, setCopied] = useState(false);

  const { sandpack } = useSandpack();

  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setCopied(true);
    const code = sandpack.files[sandpack.activePath].code;
    copy(code);
  };

  const handleTooltipVisibleChange = () => {
    setTimeout(() => {
      copied && setCopied(false);
    }, 400);
  };

  return (
    <Tooltip
      hideArrow
      className="action-tooltip"
      content={copied ? 'Copied!' : 'Copy'}
      triggerCss={{
        cursor: 'pointer',
        ml: '$3',
        '&:hover': {
          opacity: 0.8
        }
      }}
      onVisibleChange={handleTooltipVisibleChange}
    >
      <Box as="span" title="Copy Code" onClick={copyHandler}>
        <CopyIcon fill="var(--nextui-colors-codeCopyIconColor)" size={20} />
      </Box>
    </Tooltip>
  );
};

export default CopyButton;
