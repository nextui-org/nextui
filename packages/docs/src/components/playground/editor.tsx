import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LiveEditor } from 'react-live';
import { useTheme, Row, Col, Tooltip } from '@nextui-org/react';
import { capitalize, join } from 'lodash';
import CopyIcon from '../icons/copy';
import BugIcon from '../icons/bug';
import RightIcon from '../icons/arrow-right';
import { ISSUE_REPORT_URL } from '../../lib/github/constants';

const Editor: React.FC = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const slug = router.query.slug || '';

  const componentTitle = Array.isArray(slug)
    ? join(
        slug.map((s) => capitalize(s)),
        '/'
      )
    : capitalize(slug);

  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setVisible(!visible);
  };

  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setCopied(true);
  };

  const handleTooltipVisibleChange = () => {
    setTimeout(() => {
      setCopied(false);
    }, 200);
  };

  const linkHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: `${ISSUE_REPORT_URL}${componentTitle}`
    }).click();
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
            <Col className="action left-side">
              <span className="arrow">
                <RightIcon
                  size={16}
                  fill={
                    theme.type === 'light'
                      ? theme.palette.accents_2
                      : theme.palette.accents_6
                  }
                />
              </span>
              <span className="title">Live Editor</span>
            </Col>
            <Col className="action right-side">
              <>
                <Tooltip
                  hideArrow
                  className="action-tooltip"
                  content={copied ? 'Copied!' : 'Copy'}
                  onVisibleChange={handleTooltipVisibleChange}
                >
                  <span
                    className="icon"
                    onClick={copyHandler}
                    title="Copy Code"
                  >
                    <CopyIcon
                      fill={
                        theme.type === 'light'
                          ? theme.palette.accents_2
                          : theme.palette.accents_5
                      }
                      size={18}
                    />
                  </span>
                </Tooltip>
                <Tooltip
                  hideArrow
                  className="action-tooltip"
                  content="Report a bug"
                >
                  <a
                    className="icon"
                    title="Report a bug"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={linkHandler}
                    href={`${ISSUE_REPORT_URL}${componentTitle}`}
                  >
                    <BugIcon
                      fill={
                        theme.type === 'light'
                          ? theme.palette.accents_2
                          : theme.palette.accents_5
                      }
                      size={18}
                    />
                  </a>
                </Tooltip>
              </>
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
          background-color: ${theme.type === 'light' ? '#363449' : '#111'};
          box-shadow: 0px 5px 20px -5px rgb(0 0 0 / 20%);
        }
        details[open] :global(.right-side) {
          display: inline-flex !important;
        }
        :global(.right-side) {
          display: none !important;
        }
        summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 ${theme.layout.gap};
          color: ${
            theme.type === 'light'
              ? theme.palette.accents_2
              : theme.palette.accents_5
          };
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
          color: #fff,
          background-color: #111,
          font-size: 1em;
          overflow: hidden;
          padding: ${theme.layout.gapHalf};
        }
        .arrow {
          transition: all 0.2s ease;
          transform: rotate(0deg);
          display: inline-flex;
          align-items: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }
        details[open] .arrow {
          transform: rotate(90deg);
        }
        .icon {
          display: inline-flex;
          z-index: 100;
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
