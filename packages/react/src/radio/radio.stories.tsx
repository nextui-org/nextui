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
    <Radio value="A" description="Description for Option A">
      Option A
    </Radio>
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
        <Radio value="xs" size="xs" description="Description for Option mini">
          mini
        </Radio>
        <Radio value="sm" size="sm" description="Description for Option small">
          small
        </Radio>
        <Radio value="md" size="md" description="Description for Option medium">
          medium
        </Radio>
        <Radio value="lg" size="lg" description="Description for Option large">
          large
        </Radio>
        <Radio value="xl" size="xl" description="Description for Option xlarge">
          xlarge
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
    <Radio value="A" description="Description for Option A">
      Option A
    </Radio>
    <Radio value="B" description="Description for Option B">
      Option B
    </Radio>
    <Radio value="C" description="Description for Option C">
      Option C
    </Radio>
    <Radio value="D" description="Description for Option D">
      Option D
    </Radio>
  </Radio.Group>
);

export const Invalid = () => (
  <Radio.Group label="Options" defaultValue="A" validationState="invalid">
    <Radio value="A" description="Description for Option A">
      Option A
    </Radio>
    <Radio value="B" description="Description for Option B">
      Option B
    </Radio>
    <Radio value="C" description="Description for Option C">
      Option C
    </Radio>
    <Radio value="D" description="Description for Option D">
      Option D
    </Radio>
  </Radio.Group>
);

export const Row = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
    <Radio.Group label="Options" defaultValue="A" orientation="horizontal">
      <Radio value="A">Option A</Radio>
      <Radio value="B">Option B</Radio>
      <Radio value="C">Option C</Radio>
      <Radio value="D">Option D</Radio>
    </Radio.Group>
    <Radio.Group label="Options" defaultValue="A" orientation="horizontal">
      <Radio value="A" description="Description for Option A">
        Option A
      </Radio>
      <Radio value="B" description="Description for Option B">
        Option B
      </Radio>
      <Radio value="C" description="Description for Option C">
        Option C
      </Radio>
      <Radio value="D" description="Description for Option D">
        Option D
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

export const DisableAnimation = () => {
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
