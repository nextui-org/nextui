import * as React from "react";
import withDefaults from "@utils/with-defaults";
import {useTheme} from "@nextui-org/react";
import useIsMounted from "@hooks/use-is-mounted";

import Blockholder from "../blockholder";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const defaultProps = {
  width: 721,
  height: 424,
  className: "",
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ImageBrowserProps = Props & typeof defaultProps & NativeAttrs;

const ImageBrowser: React.FC<Props> = ({width, height, className, ...props}) => {
  const isMounted = useIsMounted();
  const {isDark} = useTheme();
  const {firstWindow, secondWindow} = React.useMemo(() => {
    if (isDark) {
      return {
        firstWindow: {
          logo: "#fff",
          logoText: "#000",
          bg: "#171717",
          bar: "#111",
          miniBar: "#444",
          elements: "#444",
          elements2: "#333",
        },
        secondWindow: {
          logo: "#000",
          logoText: "#fff",
          bg: "#eaeaea",
          bar: "#d2d2d2",
          miniBar: "#c1c1c1",
          elements: "#c1c1c1",
          elements2: "#999",
        },
      };
    }

    return {
      firstWindow: {
        logo: "#000",
        logoText: "#fff",
        bg: "#eaeaea",
        bar: "#d2d2d2",
        miniBar: "#c1c1c1",
        elements: "#c1c1c1",
        elements2: "#999",
      },
      secondWindow: {
        logo: "#fff",
        logoText: "#000",
        bg: "#171717",
        bar: "#111",
        miniBar: "#444",
        elements: "#444",
        elements2: "#333",
      },
    };
  }, [isDark]);

  if (!isMounted) {
    return <Blockholder alt="browser decoration image" />;
  }

  return (
    <svg
      className={`image-browser-svg ${className}`}
      height={height}
      viewBox="0 0 1048 608"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <style>
          {`
          .prefix__cls-1,.prefix__cls-2
          .prefix__cls-7,.prefix__cls-9,
          .prefix__cls-20,.prefix__cls-21,
          .prefix__cls-23,.prefix__cls-73,
          .prefix__cls-53,.prefix__cls-33,
          .prefix__cls-1{fill:${firstWindow.bg}}
          .prefix__cls-2{fill:${secondWindow.bg}}
          .prefix__cls-3{fill:#f21361}
          .prefix__cls-4{fill:#f5a623}
          .prefix__cls-5{fill:#17c964}
          .prefix__cls-7{fill:${secondWindow.miniBar}}
          .prefix__cls-8{fill:#0070f3}
          .prefix__cls-9{fill:${firstWindow.elements2}}
          .prefix__cls-20{fill:${secondWindow.elements}}
          .prefix__cls-21{fill:${secondWindow.elements2}}
          .prefix__cls-10{fill:#eaeaea}
          .prefix__cls-11{fill:#888}
          .prefix__cls-12{fill:#7928ca}
          .prefix__cls-23{fill:${firstWindow.logo}}
          .prefix__cls-73{fill:${firstWindow.logoText}}
          .prefix__cls-53{fill:${secondWindow.logo}}
          .prefix__cls-33{fill:${secondWindow.logoText}}
          .prefix__cls-15{fill:${firstWindow.elements}}`}
        </style>
      </defs>
      <g id="prefix__Group_26" transform="translate(-1072 -228)">
        <g id="prefix__front-square" transform="translate(144 -166)">
          <path
            className="prefix__cls-2"
            d="M0 0h870v395a15 15 0 01-15 15H15a15 15 0 01-15-15V0z"
            id="prefix__Rectangle_48"
            transform="translate(1106 448)"
          />
          <g id="prefix__Component_1_3" transform="translate(1106 394)">
            <path
              d="M15 0h840a15 15 0 0115 15v40H0V15A15 15 0 0115 0z"
              fill={secondWindow.bar}
              id="prefix__Rectangle_23"
            />
            <circle
              className="prefix__cls-3"
              cx={8.5}
              cy={8.5}
              id="prefix__Ellipse_1"
              r={8.5}
              transform="translate(28 19)"
            />
            <circle
              className="prefix__cls-4"
              cx={8.5}
              cy={8.5}
              id="prefix__Ellipse_2"
              r={8.5}
              transform="translate(62 19)"
            />
            <circle
              className="prefix__cls-5"
              cx={8.5}
              cy={8.5}
              id="prefix__Ellipse_3"
              r={8.5}
              transform="translate(96 19)"
            />
            <path
              d="M8.5 0h265a8.5 8.5 0 010 17H8.5a8.5 8.5 0 010-17z"
              fill={secondWindow.miniBar}
              id="prefix__Path_7"
              transform="translate(294 19)"
            />
          </g>
          <rect
            className="prefix__cls-7"
            height={22}
            id="prefix__Rectangle_32"
            rx={11}
            transform="translate(1346 483)"
            width={384}
          />
          <g id="prefix__Group_22" transform="translate(1146 553)">
            <circle className="prefix__cls-8" cx={8.5} cy={8.5} id="prefix__Ellipse_4" r={8.5} />
            <rect
              className="prefix__cls-9"
              height={17}
              id="prefix__Rectangle_34"
              rx={8.5}
              transform="translate(34)"
              width={65}
            />
          </g>
          <g id="prefix__Group_19" transform="translate(1146 729)">
            <rect
              className="prefix__cls-9"
              height={17}
              id="prefix__Rectangle_30"
              rx={8.5}
              transform="translate(34)"
              width={82}
            />
            <circle className="prefix__cls-8" cx={8.5} cy={8.5} id="prefix__Ellipse_7" r={8.5} />
          </g>
          <g id="prefix__Group_21" transform="translate(1146 597)">
            <rect
              className="prefix__cls-9"
              height={17}
              id="prefix__Rectangle_28"
              rx={8.5}
              transform="translate(34)"
              width={100}
            />
            <circle className="prefix__cls-8" cx={8.5} cy={8.5} id="prefix__Ellipse_5" r={8.5} />
          </g>
          <g id="prefix__Group_20" transform="translate(1146 641)">
            <rect
              className="prefix__cls-9"
              height={17}
              id="prefix__Rectangle_29"
              rx={8.5}
              transform="translate(34)"
              width={65}
            />
            <circle className="prefix__cls-8" cx={8.5} cy={8.5} id="prefix__Ellipse_6" r={8.5} />
          </g>
          <g id="prefix__Group_23" transform="translate(1146 685)">
            <rect
              className="prefix__cls-9"
              height={17}
              id="prefix__Rectangle_29-2"
              rx={8.5}
              transform="translate(34)"
              width={47}
            />
            <circle className="prefix__cls-8" cx={8.5} cy={8.5} id="prefix__Ellipse_6-2" r={8.5} />
          </g>
          <g id="prefix__Group_15" transform="translate(1745.941 553)">
            <rect
              className="prefix__cls-20"
              height={83}
              id="prefix__Rectangle_33"
              rx={15}
              transform="translate(.059)"
              width={184}
            />
            <rect
              className="prefix__cls-21"
              height={48}
              id="prefix__Rectangle_41"
              rx={7}
              transform="translate(17.059 18)"
              width={52}
            />
            <path
              className="prefix__cls-10"
              d="M0 0h54v9H0z"
              id="prefix__Rectangle_42"
              transform="translate(84.059 18)"
            />
            <path
              className="prefix__cls-11"
              d="M0 0h43v9H0z"
              id="prefix__Rectangle_44"
              transform="translate(84.059 37)"
            />
            <path
              className="prefix__cls-10"
              d="M0 0h81v8H0z"
              id="prefix__Rectangle_43"
              transform="translate(84.059 54)"
            />
          </g>
          <g id="prefix__Group_16" transform="translate(1745.941 663.435)">
            <rect
              className="prefix__cls-20"
              height={83}
              id="prefix__Rectangle_33-2"
              rx={15}
              transform="translate(.059 -.435)"
              width={184}
            />
            <rect
              className="prefix__cls-21"
              height={48}
              id="prefix__Rectangle_41-2"
              rx={7}
              transform="translate(17.059 17.565)"
              width={52}
            />
            <path
              className="prefix__cls-10"
              d="M0 0h54v9H0z"
              id="prefix__Rectangle_42-2"
              transform="translate(84.059 17.565)"
            />
            <path
              className="prefix__cls-11"
              d="M0 0h43v9H0z"
              id="prefix__Rectangle_44-2"
              transform="translate(84.059 36.565)"
            />
            <path
              className="prefix__cls-10"
              d="M0 0h81v9H0z"
              id="prefix__Rectangle_43-2"
              transform="translate(84.059 56.565)"
            />
          </g>
          <g id="prefix__Big_card">
            <rect
              className="prefix__cls-10"
              height={226}
              id="prefix__Rectangle_31"
              rx={15}
              transform="translate(1346 553)"
              width={384}
            />
            <rect
              className="prefix__cls-9"
              height={87}
              id="prefix__Rectangle_40"
              rx={7}
              transform="translate(1372 635)"
              width={332}
            />
            <rect
              className="prefix__cls-8"
              height={21}
              id="prefix__Rectangle_36"
              rx={6}
              transform="translate(1648 738)"
              width={56}
            />
            <path
              className="prefix__cls-10"
              d="M0 0h42v8H0z"
              id="prefix__Rectangle_37"
              transform="translate(1581 745)"
            />
            <path
              className="prefix__cls-9"
              d="M0 0h170v8H0z"
              id="prefix__Rectangle_39"
              transform="translate(1372 602)"
            />
            <path
              className="prefix__cls-9"
              d="M0 0h113v8H0z"
              id="prefix__Rectangle_38"
              transform="translate(1372 584)"
            />
          </g>
          <circle
            className="prefix__cls-12"
            cx={17}
            cy={17}
            id="prefix__Ellipse_8"
            r={17}
            transform="translate(1896 482)"
          />
          <circle
            className="prefix__cls-7"
            cx={8.5}
            cy={8.5}
            id="prefix__Ellipse_9"
            r={8.5}
            transform="translate(1858 491)"
          />
          <circle
            className="prefix__cls-20"
            cx={8.5}
            cy={8.5}
            id="prefix__Ellipse_10"
            r={8.5}
            transform="translate(1827 491)"
          />
          <circle
            className="prefix__cls-20"
            cx={8.5}
            cy={8.5}
            id="prefix__Ellipse_11"
            r={8.5}
            transform="translate(1796 491)"
          />
          <g id="prefix__Group_25" transform="translate(371.382 130.382)">
            <rect
              className="prefix__cls-53"
              height={43}
              id="prefix__Rectangle_1"
              rx={11}
              transform="translate(772.618 352.618)"
              width={43}
            />
            <path
              className="prefix__cls-33"
              d="M33.3-159.273h1.66v12.063a6.366 6.366 0 01-.872 3.323 6.192 6.192 0 01-2.424 2.3 7.459 7.459 0 01-3.607.841 7.434 7.434 0 01-3.6-.845 6.226 6.226 0 01-2.429-2.3 6.343 6.343 0 01-.872-3.318v-12.063h1.664v11.947a5.107 5.107 0 00.649 2.584 4.64 4.64 0 001.828 1.784 5.635 5.635 0 002.762.649 5.66 5.66 0 002.767-.649 4.6 4.6 0 001.828-1.784 5.135 5.135 0 00.645-2.584zm8.166 0v18.218H39.8v-18.218z"
              id="prefix__Path_2"
              transform="translate(763.081 524.487)"
            />
          </g>
          <path
            className="prefix__cls-13"
            d="M0 0h42v8H0z"
            id="prefix__Rectangle_37-2"
            transform="translate(1581 745)"
          />
        </g>
        <g id="prefix__Group_17" transform="translate(20 -86)">
          <g id="prefix__front-square-2" transform="translate(-54 55)">
            <path
              className="prefix__cls-1"
              d="M0 0h870v403a15 15 0 01-15 15H15a15 15 0 01-15-15V0z"
              id="prefix__Rectangle_3"
              transform="translate(1106 448)"
            />
            <g id="prefix__Group_2" transform="translate(373 130)">
              <rect
                className="prefix__cls-23"
                height={43}
                id="prefix__Rectangle_1-2"
                rx={11}
                transform="translate(773 353)"
                width={43}
              />
              <path
                className="prefix__cls-73"
                d="M33.267-159.273h1.659v12.033a6.351 6.351 0 01-.87 3.315 6.177 6.177 0 01-2.418 2.3 7.441 7.441 0 01-3.6.839 7.416 7.416 0 01-3.594-.843 6.211 6.211 0 01-2.423-2.3 6.328 6.328 0 01-.87-3.31v-12.033h1.659v11.918a5.1 5.1 0 00.648 2.578A4.629 4.629 0 0025.284-143a5.621 5.621 0 002.755.648A5.647 5.647 0 0030.8-143a4.591 4.591 0 001.824-1.779 5.123 5.123 0 00.643-2.578zm8.147 0v18.173h-1.66v-18.174z"
                id="prefix__Path_2-2"
                transform="translate(763.161 524.565)"
              />
            </g>
            <g id="prefix__Component_1_1" transform="translate(1106 394)">
              <path
                d="M15 0h840a15 15 0 0115 15v40H0V15A15 15 0 0115 0z"
                fill={firstWindow.bar}
                id="prefix__Rectangle_23-2"
              />
              <circle
                className="prefix__cls-3"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_1-2"
                r={8.5}
                transform="translate(28 19)"
              />
              <circle
                className="prefix__cls-4"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_2-2"
                r={8.5}
                transform="translate(62 19)"
              />
              <circle
                className="prefix__cls-5"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_3-2"
                r={8.5}
                transform="translate(96 19)"
              />
              <rect
                className="prefix__cls-15"
                height={17}
                id="prefix__Rectangle_24"
                rx={8.5}
                transform="translate(294 19)"
                width={282}
              />
            </g>
            <rect
              className="prefix__cls-15"
              height={22}
              id="prefix__Rectangle_32-2"
              rx={11}
              transform="translate(1346 483)"
              width={384}
            />
            <g id="prefix__Group_22-2" transform="translate(1146 553)">
              <circle
                className="prefix__cls-8"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_4-2"
                r={8.5}
              />
              <rect
                className="prefix__cls-15"
                height={17}
                id="prefix__Rectangle_34-2"
                rx={8.5}
                transform="translate(34)"
                width={65}
              />
            </g>
            <g id="prefix__Group_19-2" transform="translate(1146 729)">
              <rect
                className="prefix__cls-15"
                height={17}
                id="prefix__Rectangle_30-2"
                rx={8.5}
                transform="translate(34)"
                width={82}
              />
              <circle
                className="prefix__cls-8"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_7-2"
                r={8.5}
              />
            </g>
            <g id="prefix__Group_21-2" transform="translate(1146 597)">
              <rect
                className="prefix__cls-15"
                height={17}
                id="prefix__Rectangle_28-2"
                rx={8.5}
                transform="translate(34)"
                width={100}
              />
              <circle
                className="prefix__cls-8"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_5-2"
                r={8.5}
              />
            </g>
            <g id="prefix__Group_20-2" transform="translate(1146 641)">
              <rect
                className="prefix__cls-15"
                height={17}
                id="prefix__Rectangle_29-3"
                rx={8.5}
                transform="translate(34)"
                width={65}
              />
              <circle
                className="prefix__cls-8"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_6-3"
                r={8.5}
              />
            </g>
            <g id="prefix__Group_23-2" transform="translate(1146 685)">
              <rect
                className="prefix__cls-15"
                height={17}
                id="prefix__Rectangle_29-4"
                rx={8.5}
                transform="translate(34)"
                width={47}
              />
              <circle
                className="prefix__cls-8"
                cx={8.5}
                cy={8.5}
                id="prefix__Ellipse_6-4"
                r={8.5}
              />
            </g>
            <g id="prefix__Group_15-2" transform="translate(1745.941 553)">
              <rect
                className="prefix__cls-15"
                height={83}
                id="prefix__Rectangle_33-3"
                rx={15}
                transform="translate(.059)"
                width={184}
              />
              <rect
                className="prefix__cls-9"
                height={48}
                id="prefix__Rectangle_41-3"
                rx={7}
                transform="translate(17.059 18)"
                width={52}
              />
              <path
                className="prefix__cls-10"
                d="M0 0h54v9H0z"
                id="prefix__Rectangle_42-3"
                transform="translate(84.059 18)"
              />
              <path
                className="prefix__cls-9"
                d="M0 0h43v9H0z"
                id="prefix__Rectangle_44-3"
                transform="translate(84.059 37)"
              />
              <path
                className="prefix__cls-10"
                d="M0 0h81v8H0z"
                id="prefix__Rectangle_43-3"
                transform="translate(84.059 54)"
              />
            </g>
            <g id="prefix__Group_16-2" transform="translate(1745.941 663.435)">
              <rect
                className="prefix__cls-15"
                height={83}
                id="prefix__Rectangle_33-4"
                rx={15}
                transform="translate(.059 -.435)"
                width={184}
              />
              <rect
                className="prefix__cls-9"
                height={48}
                id="prefix__Rectangle_41-4"
                rx={7}
                transform="translate(17.059 17.565)"
                width={52}
              />
              <path
                className="prefix__cls-10"
                d="M0 0h54v9H0z"
                id="prefix__Rectangle_42-4"
                transform="translate(84.059 17.565)"
              />
              <path
                className="prefix__cls-9"
                d="M0 0h43v9H0z"
                id="prefix__Rectangle_44-4"
                transform="translate(84.059 36.565)"
              />
              <path
                className="prefix__cls-10"
                d="M0 0h81v9H0z"
                id="prefix__Rectangle_43-4"
                transform="translate(84.059 56.565)"
              />
            </g>
            <g id="prefix__Big_card-2">
              <rect
                className="prefix__cls-15"
                height={226}
                id="prefix__Rectangle_31-2"
                rx={15}
                transform="translate(1346 553)"
                width={384}
              />
              <rect
                className="prefix__cls-9"
                height={87}
                id="prefix__Rectangle_40-2"
                rx={7}
                transform="translate(1372 635)"
                width={332}
              />
              <rect
                className="prefix__cls-8"
                height={21}
                id="prefix__Rectangle_36-2"
                rx={6}
                transform="translate(1648 738)"
                width={56}
              />
              <path
                className="prefix__cls-10"
                d="M0 0h42v8H0z"
                id="prefix__Rectangle_37-3"
                transform="translate(1581 745)"
              />
              <path
                className="prefix__cls-11"
                d="M0 0h170v8H0z"
                id="prefix__Rectangle_39-2"
                transform="translate(1372 602)"
              />
              <path
                className="prefix__cls-10"
                d="M0 0h113v8H0z"
                id="prefix__Rectangle_38-2"
                transform="translate(1372 584)"
              />
            </g>
            <circle
              className="prefix__cls-12"
              cx={17}
              cy={17}
              id="prefix__Ellipse_8-2"
              r={17}
              transform="translate(1896 482)"
            />
            <circle
              className="prefix__cls-15"
              cx={8.5}
              cy={8.5}
              id="prefix__Ellipse_9-2"
              r={8.5}
              transform="translate(1858 491)"
            />
            <circle
              className="prefix__cls-15"
              cx={8.5}
              cy={8.5}
              id="prefix__Ellipse_10-2"
              r={8.5}
              transform="translate(1827 491)"
            />
            <circle
              className="prefix__cls-15"
              cx={8.5}
              cy={8.5}
              id="prefix__Ellipse_11-2"
              r={8.5}
              transform="translate(1796 491)"
            />
          </g>
        </g>
      </g>
      <style jsx>
        {`
          .image-browser-svg {
            position: relative;
            z-index: 20;
            filter: drop-shadow(10px 0px 60px rgb(${isDark ? "121 40 202" : "0 0 0"} / 20%));
          }
        `}
      </style>
    </svg>
  );
};

export default withDefaults(ImageBrowser, defaultProps);
