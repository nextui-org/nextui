import React, { useMemo } from 'react';
import useTheme from '../../hooks/use-theme';
import withDefaults from '../../utils/with-defaults';
import {
  NormalSizes,
  NormalColors,
  NormalLoaders,
} from '../../utils/prop-types';
import { getNormalColor, addColorAlpha } from '../../utils/color';
import { getLoaderSize, getLoaderBorder, getLabelStyle } from './styles';
import Spinner from './spinner';

interface Props {
  size?: NormalSizes;
  color?: NormalColors | string;
  gradientBackground?: string | null;
  textColor?: NormalColors | string;
  type?: NormalLoaders;
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  color: 'primary' as NormalColors | string,
  type: 'default' as NormalLoaders,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type LoadingProps = Props & typeof defaultProps & NativeAttrs;

const Loading: React.FC<React.PropsWithChildren<LoadingProps>> = ({
  children,
  size,
  color,
  gradientBackground,
  textColor,
  type,
  ...props
}) => {
  const theme = useTheme();
  const width = useMemo(() => getLoaderSize(type)[size], [size, type]);
  const border = useMemo(() => getLoaderBorder(size), [size]);
  const labelColor = useMemo(() => getNormalColor(textColor, theme.palette), [
    color,
    theme.palette,
  ]);
  const labelStyle = useMemo(
    () => getLabelStyle(type, theme, labelColor)[size],
    [type, size, theme, labelColor]
  );
  const bgColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.text),
    [color, theme.palette]
  );
  if (type === 'spinner') {
    return (
      <Spinner size={width} color={bgColor} labelStyle={labelStyle} {...props}>
        {children}
      </Spinner>
    );
  }
  return (
    <div className="loading-container" {...props}>
      <span className={`loading ${type}`}>
        {children && <label style={labelStyle}>{children}</label>}
        <i className="_1" />
        <i className="_2" />
        <i className="_3" />
      </span>
      <style jsx>{`
        .loading-container {
          display: inline-flex;
          align-items: center;
          position: relative;
        }
        label :global(*) {
          margin: 0;
        }
        .loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }
        .loading.default {
          display: flex;
          border-radius: 50%;
          position: relative;
          width: ${width};
          height: ${width};
        }
        .loading.points-opacity,
        .loading.points {
          display: flex;
          position: relative;
        }
        .loading.gradient {
          display: flex;
          position: relative;
          width: ${width};
          height: ${width};
        }
        .loading.points {
          transform: translate(0, calc(${width} * 0.6));
        }
        .loading.default i {
          top: 0px;
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: inherit;
        }
        .loading.default ._1 {
          border: ${border} solid ${bgColor};
          border-top: ${border} solid transparent;
          border-left: ${border} solid transparent;
          border-right: ${border} solid transparent;
          animation: rotate 0.8s ease infinite;
        }
        .loading.default ._2 {
          border: ${border} dotted ${bgColor};
          border-top: ${border} solid transparent;
          border-left: ${border} solid transparent;
          border-right: ${border} solid transparent;
          animation: rotate 0.8s linear infinite;
          opacity: 0.5;
        }
        .loading.default ._3 {
          display: none;
        }
        .loading.points-opacity i {
          display: inline-block;
          width: ${width};
          height: ${width};
          border-radius: 50%;
          background-color: ${bgColor};
          margin: 0 1px;
          animation: loading-blink 1.4s infinite both;
        }
        .loading.points-opacity ._2 {
          animation-delay: 0.2s;
        }
        .loading.points-opacity ._3 {
          animation-delay: 0.4s;
        }
        .loading.points i {
          width: ${width};
          height: ${width};
          margin: 0 3px;
          background: ${bgColor};
        }
        .loading.points ._1 {
          border-radius: 50%;
          animation: points 0.75s ease infinite;
        }
        .loading.points ._2 {
          border-radius: 50%;
          animation: points 0.75s ease infinite 0.25s;
        }
        .loading.points ._3 {
          border-radius: 50%;
          animation: points 0.75s ease infinite 0.5s;
        }
        .loading.gradient ._1 {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 0px;
          border-radius: inherit;
          animation: rotate 1s linear infinite;
          top: 0px;
          background: linear-gradient(
            0deg,
            ${addColorAlpha(theme.palette.background, 0)} 33%,
            ${bgColor} 100%
          );
          border-radius: 50%;
        }
        .loading.gradient ._2 {
          top: 2px;
          position: absolute;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          border: 0px;
          border-radius: inherit;
          background: ${gradientBackground || theme.palette.background};
          border-radius: 50%;
        }
        .loading.gradient ._3 {
          display: none;
        }
        @keyframes loading-blink {
          0% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes points {
          0% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(0, calc(-${width} * 1.4));
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
      `}</style>
    </div>
  );
};

const MemoLoading = React.memo(Loading);

export default withDefaults(MemoLoading, defaultProps);
