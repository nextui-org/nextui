import Card from './card';
import {
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody
} from './card.styles';
import CardImage from '../image';

export type { CardProps } from './card';
export * from './card.styles';

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
