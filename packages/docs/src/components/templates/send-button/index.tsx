import React from 'react';
import { useTheme } from '@nextui-org/react';
import { Send } from '../../icons';

interface Props {
  onClick: () => void;
}

const SendButton: React.FC<Props> = ({ onClick }) => {
  const { theme } = useTheme();

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <span
      role="button"
      tabIndex={0}
      className="send-button-container"
      onClick={handleClick}
    >
      <Send fill="white" className="send-button__arrow-icon" />
      <style jsx>{`
        .send-button-container {
          width: 24px;
          margin: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${theme?.colors?.primary?.value};
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        :global(.send-button__arrow-icon) {
          width: 100%;
          height: 100%;
          padding: 4px;
          transition: transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms;
          box-shadow: ${theme?.shadows?.sm?.value};
        }
        .send-button-container:hover {
          opacity: 0.8;
        }
        .send-button-container:active {
          transform: scale(0.9);
        }
        .send-button-container:active :global(.send-button__arrow-icon) {
          transform: translate(24px, -24px);
          opacity: 0;
        }
      `}</style>
    </span>
  );
};

export default SendButton;
