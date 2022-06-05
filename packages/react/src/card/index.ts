import Card from './card';
import {
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody
} from './card.styles';
import Image from '../image';
import Divider from '../divider';

export type { CardProps } from './card';

export {
  StyledCard,
  StyledCardHeader,
  StyledCardFooter,
  StyledCardBody
} from './card.styles';
export type { CardFooterVariantsProps, CardVariantsProps } from './card.styles';

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = Image;
Card.Divider = Divider;

export default Card;
