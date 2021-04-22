import React from 'react';
import Checkbox from '@components/checkbox';

const IndexPage = () => {
  return (
    <div>
      <h1>Checkbox</h1>
      <Checkbox checked={true} size="medium">
        medium
      </Checkbox>
    </div>
  );
};

export default IndexPage;
