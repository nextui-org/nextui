import React from 'react';
import { Checkbox } from '../../dist/src';

const IndexPage = () => {
  return (
    <div>
      <h1>Checkbox</h1>
      <Checkbox className="com" checked={true} size="mini">
        mini
      </Checkbox>
      <Checkbox checked={true} size="small">
        small
      </Checkbox>
      <Checkbox size="medium">medium</Checkbox>
      <Checkbox color="error" checked={true} size="large">
        large
      </Checkbox>
      <Checkbox color="warning" checked={true} size="xlarge">
        xlarge
      </Checkbox>
      <Checkbox checked={true}>default</Checkbox>
      <Checkbox.Group color="warning" value={['sydney']}>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">Bei Jing</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </Checkbox.Group>
      <style jsx>{`
        div {
          display: flex;
          margin: 1rem;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
