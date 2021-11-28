import Card from './card';
import CardHeader from './card-header';
import CardFooter from './card-footer';
import CardBody from './card-body';
import CardImage from '../image';

export type { CardProps } from './card';
export type { CardHeaderProps } from './card-header';
export type { CardFooterProps } from './card-footer';
export type { CardBodyProps } from './card-body';

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
