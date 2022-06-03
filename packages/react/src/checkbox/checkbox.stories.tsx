import React from 'react';
import { Meta } from '@storybook/react';
import Checkbox from './index';

const argTypes = {
  color: {
    name: 'color',
    type: { name: 'string', required: false },
    control: {
      type: 'radio',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error'
      ]
    }
  },
  labelColor: {
    name: 'labelColor',
    type: { name: 'string', required: false },
    control: {
      type: 'radio',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error'
      ]
    }
  },
  size: {
    name: 'size',
    control: {
      type: 'radio',
      options: ['md', 'xs', 'sm', 'lg', 'xl']
    }
  },
  isDisabled: {
    name: 'isDisabled',
    type: { name: 'boolean', required: false },
    control: {
      type: 'boolean'
    }
  }
};

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes
} as Meta;

export const Default = () => {
  return (
    <Checkbox size="md" color="default" labelColor="default">
      Option
    </Checkbox>
  );
};

export const Label = () => {
  return (
    <Checkbox size="md" color="default" labelColor="default" label="Option" />
  );
};

export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox defaultSelected size="xl">
      Enabled
    </Checkbox>
    <br />
    <Checkbox isDisabled defaultSelected size="xl">
      Disabled
    </Checkbox>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox defaultSelected size="xs">
      mini
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="sm">
      small
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="md">
      medium
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="lg">
      large
    </Checkbox>
    <br />
    <Checkbox defaultSelected size="xl">
      xlarge
    </Checkbox>
  </div>
);

export const Colors = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox color="primary" defaultSelected>
      Primary
    </Checkbox>
    <br />
    <Checkbox color="secondary" defaultSelected>
      Secondary
    </Checkbox>
    <br />
    <Checkbox color="success" defaultSelected>
      Success
    </Checkbox>
    <br />
    <Checkbox color="warning" defaultSelected>
      Warning
    </Checkbox>
    <br />
    <Checkbox color="error" defaultSelected>
      Error
    </Checkbox>
  </div>
);

export const LabelColors = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox color="primary" labelColor="primary" defaultSelected>
      Primary
    </Checkbox>
    <br />
    <Checkbox color="secondary" labelColor="secondary" defaultSelected>
      Secondary
    </Checkbox>
    <br />
    <Checkbox color="success" labelColor="success" defaultSelected>
      Success
    </Checkbox>
    <br />
    <Checkbox color="warning" labelColor="warning" defaultSelected>
      Warning
    </Checkbox>
    <br />
    <Checkbox color="error" labelColor="error" defaultSelected>
      Error
    </Checkbox>
  </div>
);

export const Rounded = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox isRounded color="primary" defaultSelected>
      Primary
    </Checkbox>
    <br />
    <Checkbox isRounded color="secondary" defaultSelected>
      Secondary
    </Checkbox>
    <br />
    <Checkbox isRounded color="success" defaultSelected>
      Success
    </Checkbox>
    <br />
    <Checkbox isRounded color="warning" defaultSelected>
      Warning
    </Checkbox>
    <br />
    <Checkbox isRounded color="error" defaultSelected>
      Error
    </Checkbox>
  </div>
);

export const Indeterminate = () => {
  return (
    <Checkbox size="lg" color="primary" defaultSelected isIndeterminate>
      Option
    </Checkbox>
  );
};

export const LineThrough = () => {
  return (
    <Checkbox size="lg" color="primary" defaultSelected lineThrough>
      Option
    </Checkbox>
  );
};

export const Controlled = () => {
  const [selected, setSelected] = React.useState<boolean>(true);

  const [groupSelected, setGroupSelected] = React.useState<string[]>([
    'buenos-aires',
    'sydney'
  ]);

  React.useEffect(() => {
    console.log('Checkbox ', selected);
  }, [selected]);

  React.useEffect(() => {
    console.log('CheckboxGroup ', groupSelected);
  }, [groupSelected]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 200 }}>
      <Checkbox color="success" isSelected={selected} onChange={setSelected}>
        Subscribe (controlled)
      </Checkbox>
      <Checkbox.Group
        color="warning"
        labelColor="primary"
        label="Select cities"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <Checkbox value="buenos-aires" color="primary">
          Buenos Aires
        </Checkbox>
        <Checkbox value="sydney" labelColor="warning">
          Sydney
        </Checkbox>
        <Checkbox value="london" labelColor="error">
          London
        </Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </Checkbox.Group>
    </div>
  );
};

export const NoAnimated = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Checkbox size="md" disableAnimation={true} defaultSelected>
        Option
      </Checkbox>
      <br />
      <Checkbox size="md" disableAnimation={true} lineThrough defaultSelected>
        Option
      </Checkbox>
    </div>
  );
};

export const Group = () => {
  const handleGroupChange = (value: string[]) => console.log(value);

  return (
    <Checkbox.Group
      color="warning"
      labelColor="primary"
      label="Select cities"
      defaultValue={['buenos-aires']}
      onChange={handleGroupChange}
    >
      <Checkbox value="buenos-aires" color="primary">
        Buenos Aires
      </Checkbox>
      <Checkbox value="sydney" labelColor="warning">
        Sydney
      </Checkbox>
      <Checkbox value="london" labelColor="error" isDisabled>
        London
      </Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </Checkbox.Group>
  );
};

export const GroupRow = () => (
  <Checkbox.Group
    color="warning"
    orientation="horizontal"
    label="Select cities"
    defaultValue={['1']}
  >
    <Checkbox value="1" color="primary">
      Buenos Aires
    </Checkbox>
    <Checkbox value="2">Sydney</Checkbox>
    <Checkbox value="3">London</Checkbox>
    <Checkbox value="4">Tokyo</Checkbox>
  </Checkbox.Group>
);
