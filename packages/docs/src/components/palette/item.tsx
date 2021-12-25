import React from 'react';
import cn from 'classnames';
import {
  Grid,
  Text,
  useTheme,
  Tooltip,
  GridProps,
  useClipboard
} from '@nextui-org/react';
import { get, replace, capitalize } from 'lodash';
import {
  invertHex,
  hexToRGBA,
  hexFromString,
  isCssVar,
  getCssVar
} from '@utils/index';

interface Props {
  color: string;
  inverted?: boolean;
  linear?: boolean;
  textColor?: string;
}

export type ItemProps = Props & GridProps;

const Item: React.FC<ItemProps> = ({
  color,
  inverted,
  linear,
  textColor: textColorProp,
  ...props
}) => {
  const { theme, isDark } = useTheme();
  const isGradient = color.includes('gradient');

  const { copy } = useClipboard();

  let hexColor = get(theme?.colors, `${color}.value` || 'primary.value');
  hexColor = isCssVar(hexColor) ? getCssVar(hexColor) : hexColor;

  const hexTextColor = get(theme?.colors, `${textColorProp}.value`);

  const itemTextColor = inverted
    ? invertHex(hexColor)
    : theme?.colors?.white?.value;

  const userTextColor = isCssVar(hexTextColor)
    ? getCssVar(hexTextColor)
    : hexTextColor;

  const textColor = userTextColor || itemTextColor;

  const shadowColor = isGradient
    ? hexFromString(hexColor, theme?.colors?.primary?.value, true)
    : hexColor;

  const renderItem = () => {
    return (
      <Grid
        className={cn('color', {
          'is-gradient': isGradient,
          'is-linear': linear
        })}
        css={{
          background: hexColor,
          marginRight: '10px',
          marginBottom: '10px',
          boxShadow: `0 20px 35px -10px ${hexToRGBA(
            shadowColor,
            isDark ? 0.2 : 0.4
          )}`
        }}
        {...props}
      >
        {isGradient ? (
          <Text
            className="text"
            css={{
              m: 0,
              fontWeight: '$semibold',
              color: textColor,
              '@smMax': {
                fontSize: '$xs'
              }
            }}
          >
            {capitalize(replace(color, '_', ' '))}
          </Text>
        ) : (
          <>
            <Text
              className="text"
              css={{
                m: 0,
                fontWeight: '$semibold',
                color: textColor,
                '@smMax': {
                  fontSize: '$xs'
                }
              }}
            >
              {capitalize(replace(color, '_', ' '))}
            </Text>
            <Text
              className="hex-text"
              css={{
                m: 0,
                fontSize: '$tiny',
                color: textColor,
                opacity: 0.8,
                fontWeight: '$bold'
              }}
            >
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
            border-radius: ${theme?.radii?.lg?.value};
            transition: all 0.25s ease;
            cursor: pointer;
          }
          :global(.color:hover) {
            transform: translateY(5px);
          }
          :global(.color.is-linear:hover) {
            transform: translateX(-5px);
          }
          @media only screen and (max-width: ${theme?.breakpoints?.sm.value}) {
            :global(.color) {
              width: 80px;
              height: 80px;
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
        <Tooltip
          trigger="click"
          content="Copied!"
          onClick={() => copy(hexColor)}
        >
          <>{renderItem()}</>
        </Tooltip>
      )}
    </>
  );
};

const MemoItem = React.memo(Item);

export default MemoItem;
