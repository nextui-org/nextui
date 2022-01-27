import React from 'react';
import { VercelLogo } from '@components';
import { Link } from '@nextui-org/react';

const VercelCallout: React.FC<unknown> = () => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.vercel.com?utm_source=nextui&utm_marketing=oss"
      css={{ mt: '$6', d: 'flex', jc: 'flex-end' }}
    >
      <VercelLogo />
    </Link>
  );
};

export default VercelCallout;
