import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Dropdown from '../index';

describe('Dropdown', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Dropdown>
        <Dropdown.Button>Trigger</Dropdown.Button>
        <Dropdown.Menu aria-label="Actions" onAction={alert}>
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
