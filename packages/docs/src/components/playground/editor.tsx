import React, { useState } from 'react';
import { LiveEditor } from 'react-live';
import { useTheme, Row, Col } from '@nextui/react';
import CopyIcon from '../icons/copy';
import BugIcon from '../icons/bug';
import RightIcon from '../icons/arrow-right';

const Editor: React.FC = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setVisible(!visible);
  };

  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler}>
          <Row
            justify="space-between"
            align="center"
            style={{ height: '100%', width: '100%' }}
          >
            <Col className="action">
              <span className="arrow">
                <RightIcon size={16} fill={theme.palette.accents_6} />
              </span>
              <span className="title">Live Editor</span>
            </Col>
            <Col className="action">
              {visible && (
                <>
                  <span
                    className="icon"
                    onClick={copyHandler}
                    title="Copy Code"
                  >
                    <CopyIcon fill={theme.palette.accents_6} size={18} />
                  </span>
                  <span
                    className="icon"
                    onClick={copyHandler}
                    title="Report a bug"
                  >
                    <BugIcon fill={theme.palette.accents_6} size={18} />
                  </span>
                </>
              )}
            </Col>
          </Row>
        </summary>
        <div className="area">
          <LiveEditor />
        </div>
      </details>

      <style jsx>{`
        .editor {
          margin-top: 1rem;
        }
        .title {
          font-weight: 600;
        }
        details {
          transition: all 0.2s ease;
          overflow: hidden;
          border-radius: ${theme.layout.radius};
        }
        summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 ${theme.layout.gap};
          color: ${theme.palette.accents_5};
          height: 2.875rem;
          list-style: none;
          user-select: none;
          outline: none;
        }
        summary :global(svg) {
          cursor: pointer;
        }
        summary :global(.action) {
          width: auto;
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }
        .area {
          position: relative;
          box-sizing: border-box;
          white-space: pre;
          font-family: ${theme.font.mono};
          color: ${theme.palette.foreground};
          background-color: #111;
          font-size: 1em;
          overflow: hidden;
          padding: ${theme.layout.gapHalf};
        }
        .arrow {
          transition: all 0.2s ease;
          transform: rotate(${visible ? 90 : 0}deg);
          display: inline-flex;
          align-items: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }
        .icon {
          display: inline-flex;
          align-items: center;
          margin-left: 0.5rem;
          color: ${theme.palette.accents_4};
          transition: color 0.2s ease;
        }
        .icon:hover {
          color: ${theme.palette.accents_6};
        }
      `}</style>
    </div>
  );
};

export default Editor;
