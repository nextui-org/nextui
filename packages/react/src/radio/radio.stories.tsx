import React from 'react';
import { Meta } from '@storybook/react';
import Radio from './index';

export default {
  title: 'Inputs/Radio',
  component: Radio,
  onChange: { action: 'changed' }
} as Meta;

export const Default = () => (
  <Radio.Group label="Options">
    <Radio value="A">Option A</Radio>
    <Radio value="B">Option B</Radio>
    <Radio value="C">Option C</Radio>
    <Radio value="D">Option D</Radio>
  </Radio.Group>
);

export const Disabled = () => (
  <Radio.Group label="Options" defaultValue="A" isDisabled>
    <Radio value="A">Option A</Radio>
    <Radio value="B">Option B</Radio>
    <Radio value="C">Option C</Radio>
    <Radio value="D">Option D</Radio>
  </Radio.Group>
);

export const Sizes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 200 }}>
      <Radio.Group label="Sizes" defaultValue="md">
        <Radio value="xs" size="xs">
          mini
        </Radio>
        <Radio value="sm" size="sm">
          small
        </Radio>
        <Radio value="md" size="md">
          medium
        </Radio>
        <Radio value="lg" size="lg">
          large
        </Radio>
        <Radio value="xl" size="xl">
          xlarge
        </Radio>
      </Radio.Group>
      <Radio.Group label="Sizes" defaultValue="md">
        <Radio value="xs" size="xs">
          mini
          <Radio.Desc>Description for Option mini</Radio.Desc>
        </Radio>
        <Radio value="sm" size="sm">
          small
          <Radio.Desc>Description for Option small</Radio.Desc>
        </Radio>
        <Radio value="md" size="md">
          medium
          <Radio.Desc>Description for Option medium</Radio.Desc>
        </Radio>
        <Radio value="lg" size="lg">
          large
          <Radio.Desc>Description for Option large</Radio.Desc>
        </Radio>
        <Radio value="xl" size="xl">
          xlarge
          <Radio.Desc>Description for Option xlarge</Radio.Desc>
        </Radio>
      </Radio.Group>
    </div>
  );
};

export const Colors = () => {
  return (
    <Radio.Group label="Colors" defaultValue="primary">
      <Radio value="primary" color="primary">
        primary
      </Radio>
      <Radio value="secondary" color="secondary">
        secondary
      </Radio>
      <Radio value="success" color="success">
        success
      </Radio>
      <Radio value="warning" color="warning">
        warning
      </Radio>
      <Radio value="error" color="error">
        error
      </Radio>
    </Radio.Group>
  );
};

export const LabelColors = () => {
  return (
    <Radio.Group label="Label colors" defaultValue="primary">
      <Radio value="primary" color="primary" labelColor="primary">
        primary
      </Radio>
      <Radio value="secondary" color="secondary" labelColor="secondary">
        secondary
      </Radio>
      <Radio value="success" color="success" labelColor="success">
        success
      </Radio>
      <Radio value="warning" color="warning" labelColor="warning">
        warning
      </Radio>
      <Radio value="error" color="error" labelColor="error">
        error
      </Radio>
    </Radio.Group>
  );
};

export const Squared = () => (
  <Radio.Group label="Options" defaultValue="A">
    <Radio value="A" isSquared>
      Option A
    </Radio>
    <Radio value="B" isSquared>
      Option B
    </Radio>
    <Radio value="C" isSquared>
      Option C
    </Radio>
    <Radio value="D" isSquared>
      Option D
    </Radio>
  </Radio.Group>
);

export const Description = () => (
  <Radio.Group label="Options" defaultValue="A">
    <Radio value="A">
      Option A<Radio.Desc>Description for Option A</Radio.Desc>
    </Radio>
    <Radio value="B">
      Option B<Radio.Desc>Description for Option B</Radio.Desc>
    </Radio>
    <Radio value="C">
      Option C<Radio.Desc>Description for Option C</Radio.Desc>
    </Radio>
    <Radio value="D">
      Option D<Radio.Desc>Description for Option D</Radio.Desc>
    </Radio>
  </Radio.Group>
);

export const Row = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
    <Radio.Group label="Options" defaultValue="A" isRow>
      <Radio value="A">Option A</Radio>
      <Radio value="B">Option B</Radio>
      <Radio value="C">Option C</Radio>
      <Radio value="D">Option D</Radio>
    </Radio.Group>
    <Radio.Group label="Options" defaultValue="A" isRow>
      <Radio value="A">
        Option A<Radio.Desc>Description for Option A</Radio.Desc>
      </Radio>
      <Radio value="B">
        Option B<Radio.Desc>Description for Option B</Radio.Desc>
      </Radio>
      <Radio value="C">
        Option C<Radio.Desc>Description for Option C</Radio.Desc>
      </Radio>
      <Radio value="D">
        Option D<Radio.Desc>Description for Option D</Radio.Desc>
      </Radio>
    </Radio.Group>
  </div>
);

export const Controlled = () => {
  const [checked, setChecked] = React.useState<string>('london');

  React.useEffect(() => {
    console.log('checked:', checked);
  }, [checked]);

  return (
    <Radio.Group label="Check cities" value={checked} onChange={setChecked}>
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </Radio.Group>
  );
};

export const NoAnimated = () => {
  return (
    <Radio.Group label="Options" defaultValue="A">
      <Radio value="A" disableAnimation>
        Option A
      </Radio>
      <Radio value="B" disableAnimation>
        Option B
      </Radio>
      <Radio value="C" disableAnimation>
        Option C
      </Radio>
      <Radio value="D" disableAnimation>
        Option D
      </Radio>
    </Radio.Group>
  );
};
