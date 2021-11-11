import React from 'react';
import { useTheme, NextUIThemes, Grid } from '@nextui-org/react';
import Item from './item';

export interface Props {
  colors?: string[];
  inverted?: boolean;
}

const Palette: React.FC<Props> = ({ colors, inverted }) => {
  const theme = useTheme() as NextUIThemes;

  return (
    <Grid.Container className="palette">
      {colors?.map((color, index) => (
        <Item key={`${index}_${color}`} color={color} inverted={inverted} />
      ))}
      <style jsx>{`
        :global(.palette) {
          padding-bottom: ${theme.spacing.sm};
        }
      `}</style>
    </Grid.Container>
  );
};

const MemoPalette = React.memo(Palette);

export default MemoPalette;
