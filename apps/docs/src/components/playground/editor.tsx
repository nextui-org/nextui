import React, {useState} from "react";
import {useRouter} from "next/router";
import {LiveEditor} from "react-live";
import {useTheme, Row, Col, Tooltip, useClipboard} from "@nextui-org/react";
import {capitalize, join} from "lodash";

import CopyIcon from "../icons/copy";
import BugIcon from "../icons/bug";
import RightIcon from "../icons/arrow-right";
import {ISSUE_REPORT_URL} from "../../lib/github/constants";

export interface Props {
  initialOpen?: boolean;
  code: string;
}

const Editor: React.FC<Props> = ({initialOpen, code}) => {
  const {theme, isDark} = useTheme();
  const [visible, setVisible] = useState(initialOpen);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const {copy} = useClipboard();

  const slug = router.query.slug || "";

  const componentTitle = Array.isArray(slug)
    ? join(
        slug.map((s) => capitalize(s)),
        "/",
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
    copy(code);
  };

  const handleTooltipVisibleChange = () => {
    setTimeout(() => {
      copied && setCopied(false);
    }, 400);
  };

  const linkHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    Object.assign(document.createElement("a"), {
      target: "_blank",
      rel: "noopener noreferrer",
      href: `${ISSUE_REPORT_URL}${componentTitle}`,
    }).click();
  };

  return (
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler}>
          <Row align="center" justify="space-between" style={{height: "100%", width: "100%"}}>
            <Col className="action left-side">
              <span className="arrow">
                <RightIcon fill="currentColor" size={16} />
              </span>
              <span className="title">Live Editor</span>
            </Col>
            <Col className="action right-side">
              <>
                <Tooltip
                  hideArrow
                  className="action-tooltip"
                  content={copied ? "Copied!" : "Copy"}
                  onVisibleChange={handleTooltipVisibleChange}
                >
                  <span className="icon" role="button" title="Copy Code" onClick={copyHandler}>
                    <CopyIcon fill="currentColor" size={18} />
                  </span>
                </Tooltip>
                <Tooltip hideArrow className="action-tooltip" content="Report a bug">
                  <a
                    className="icon"
                    href={`${ISSUE_REPORT_URL}${componentTitle}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Report a bug"
                    onClick={linkHandler}
                  >
                    <BugIcon fill="currentColor" size={18} />
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
          color: ${theme?.colors?.white?.value};
        }
        details {
          transition: all 0.2s ease;
          overflow: hidden;
          border-radius: ${theme?.radii?.lg?.value};
          background-color: ${!isDark ? "#363449" : "#111"};
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
          padding: 0 ${theme?.space?.lg?.value};
          color: ${!isDark ? theme?.colors?.accents2?.value : theme?.colors?.accents5?.value};
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
          font-size: ${theme?.fontSizes?.sm?.value};
          overflow: hidden;
          font-family: ${theme?.fonts?.mono};
          padding: ${theme?.space?.sm?.value};
          max-height: min(60vh, 1000px);
          overflow-y: auto;
        }
        .arrow {
          transition: all 0.2s ease;
          transform: rotate(0deg);
          display: inline-flex;
          align-items: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
          color: ${theme?.colors?.accents6?.value};
        }
        details[open] .arrow {
          transform: rotate(90deg);
        }
        .icon {
          display: inline-flex;
          z-index: 100;
          align-items: center;
          margin-left: 0.5rem;
          color: ${theme?.colors?.accents6?.value};
          transition: color 0.2s ease;
        }
        .icon:hover {
          color: ${theme?.colors?.accents8?.value};
        }
      `}</style>
    </div>
  );
};

export default Editor;
