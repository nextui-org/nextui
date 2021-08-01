import React from 'react';
import { Grid, useTheme, NextUIThemes } from '@nextui-org/react';
import { get, replace } from 'lodash';
import { invertHex, hexToRGBA, hexFromString } from '@utils/index';

interface ItemProps {
  color: string;
  inverted?: boolean;
}

const Item: React.FC<ItemProps> = ({ color, inverted, ...props }) => {
  const theme = useTheme() as NextUIThemes;

  const hexColor = get(theme.palette, color || 'primary');
  const textColor = inverted ? invertHex(hexColor) : theme.palette.white;
  const shadowColor =
    color === 'gradient'
      ? hexFromString(color, theme.palette.primary, true)
      : get(theme.palette, color || 'primary');

  return (
    <Grid
      className="color"
      style={{
        background: hexColor,
        marginRight: '10px',
        marginBottom: '10px',
        boxShadow: `0 20px 35px -10px ${hexToRGBA(shadowColor, 0.4)}`,
      }}
      {...props}
    >
      <p className="text" style={{ color: textColor }}>
        {replace(color, '_', ' ')}
      </p>
      <style jsx>{`
        :global(.color) {
          margin-bottom: 20px;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: ${theme.layout.radius};
          transition: all 0.25s ease;
        }
        :global(.color:hover) {
          transform: translateY(5px);
          box-shadow: 0 0 0 0 ${theme.palette.background} !important;
        }
        :global(.text) {
          font-weight: bold;
          text-transform: capitalize;
          font-size: 13px;
        }
        @media only screen and (max-width: ${theme.breakpoints.sm.min}) {
          :global(.color) {
            width: 80px;
            height: 80px;
          }
          :global(.text) {
            font-size: 10px;
          }
        }
      `}</style>
    </Grid>
  );
};

const MemoItem = React.memo(Item);

export default MemoItem;
