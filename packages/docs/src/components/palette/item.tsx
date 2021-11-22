import React from 'react';
import cn from 'classnames';
import { Grid, Text, useTheme, NextUIThemes, Tooltip } from '@nextui-org/react';
import { get, replace, capitalize } from 'lodash';
import {
  invertHex,
  hexToRGBA,
  hexFromString,
  isCssVar,
  getCssVar
} from '@utils/index';

interface ItemProps {
  color: string;
  inverted?: boolean;
}

const Item: React.FC<ItemProps> = ({ color, inverted, ...props }) => {
  const theme = useTheme() as NextUIThemes;
  const isGradient = color.includes('gradient');
  let hexColor = get(theme.palette, color || 'primary');
  hexColor = isCssVar(hexColor) ? getCssVar(hexColor) : hexColor;
  const textColor = inverted ? invertHex(hexColor) : theme.palette.white;
  const shadowColor = isGradient
    ? hexFromString(hexColor, theme.palette.primary, true)
    : hexColor;

  const renderItem = () => {
    return (
      <Grid
        className={cn('color', { 'is-gradient': isGradient })}
        style={{
          background: hexColor,
          marginRight: '10px',
          marginBottom: '10px',
          boxShadow: `0 20px 35px -10px ${hexToRGBA(shadowColor, 0.4)}`
        }}
        {...props}
      >
        {isGradient ? (
          <Text m={0} className="text" style={{ color: textColor }}>
            {capitalize(replace(color, '_', ' '))}
          </Text>
        ) : (
          <>
            <Text m={0} className="text" style={{ color: textColor }}>
              {capitalize(replace(color, '_', ' '))}
            </Text>
            <Text m={0} className="hex-text" style={{ color: textColor }}>
              {hexColor?.toUpperCase()}
            </Text>
          </>
        )}
        <style jsx>{`
          :global(.color) {
            margin-bottom: 20px;
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: ${theme.radius.lg};
            transition: all 0.25s ease;
          }
          :global(.color.is-gradient) {
            cursor: pointer;
          }
          :global(.color:hover) {
            transform: translateY(5px);
            box-shadow: 0 0 0 0 ${theme.palette.background} !important;
          }
          :global(.text) {
            font-weight: bold;
            text-transform: capitalize;
            font-size: 13px !important;
          }
          @media only screen and (max-width: ${theme.breakpoints.sm}) {
            :global(.color) {
              width: 80px;
              height: 80px;
            }
            :global(.text) {
              font-size: 10px !important;
            }
          }
        `}</style>
      </Grid>
    );
  };

  return (
    <>
      {isGradient ? (
        <Tooltip trigger="click" title="Gradient" content={hexColor}>
          <>{renderItem()}</>
        </Tooltip>
      ) : (
        renderItem()
      )}
    </>
  );
};

const MemoItem = React.memo(Item);

export default MemoItem;
