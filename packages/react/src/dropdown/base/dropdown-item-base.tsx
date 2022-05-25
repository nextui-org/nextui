import { Item } from '@react-stately/collections';
import { ItemProps } from '@react-types/shared';
import { SimpleColors, NormalWeights } from '../../utils/prop-types';
import { CSS } from '../../theme/stitches.config';

export type DropdownItemBaseProps<T = object> = ItemProps<T> & {
  as?: keyof JSX.IntrinsicElements;
  css?: CSS;
  color?: SimpleColors;
  textColor?: SimpleColors;
  withDivider?: boolean;
  dividerWeight?: NormalWeights;
  className?: string;
};

const DropdownItem = Item as (props: DropdownItemBaseProps) => JSX.Element;

export default DropdownItem;
