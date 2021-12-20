import React from 'react';
import { useTheme, Grid } from '@nextui-org/react';
import Item from './item';

export interface Props {
  colors?: string[];
  inverted?: boolean;
}

const Palette: React.FC<Props> = ({ colors, inverted }) => {
  const { theme } = useTheme();

  return (
    <Grid.Container className="palette">
      {colors?.map((color, index) => (
        <Item key={`${index}_${color}`} color={color} inverted={inverted} />
      ))}
      <style jsx>{`
        :global(.palette) {
          padding-bottom: ${theme?.space?.sm?.value};
        }
      `}</style>
    </Grid.Container>
  );
};

const MemoPalette = React.memo(Palette);

export default MemoPalette;
