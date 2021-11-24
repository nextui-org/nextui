import { styled } from '../theme/stitches.config';
import Avatar from './avatar.styles';

export default styled('div', {
  dflex: 'center',
  height: 'auto',
  width: 'max-content',
  '@motion': {
    transition: 'none'
  },
  [`& ${Avatar}`]: {
    marginLeft: '-$space$5',
    transition: '$default',
    '.only-text-avatar': {
      boxShadow: '$xs'
    }
  },
  '.only-text-avatar': {
    boxShadow: '$xs'
  },
  '.nextui-avatar-group-count': {
    fontSize: '$xs',
    display: 'inline-flex',
    alignItems: 'center',
    paddingLeft: '$1',
    color: '$text'
  },
  variants: {
    animated: {
      true: {
        [`& ${Avatar}:hover`]: {
          transform: 'translate(-$space$5)'
        }
      }
    }
  },
  defaultVariants: {
    animated: true
  }
});
