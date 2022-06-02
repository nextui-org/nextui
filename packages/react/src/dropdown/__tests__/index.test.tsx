import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '../index';

describe('Dropdown', () => {
  it('should render correctly (static)', () => {
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

  it('should render correctly (dynamic)', () => {
    const menuItems = [
      { key: 'new', name: 'New File' },
      { key: 'copy', name: 'Copy Link' },
      { key: 'edit', name: 'Edit File' },
      { key: 'delete', name: 'Delete File' }
    ];

    const wrapper = render(
      <Dropdown>
        <Dropdown.Button>Trigger</Dropdown.Button>
        <Dropdown.Menu aria-label="Actions" items={menuItems}>
          {(item: any) => (
            <Dropdown.Item key={item.key}>{item.name}</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with section (static)', () => {
    const wrapper = render(
      <Dropdown>
        <Dropdown.Button>Trigger</Dropdown.Button>
        <Dropdown.Menu aria-label="Actions" onAction={alert}>
          <Dropdown.Section title="Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Section title="Danger Zone">
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error">
              Delete file
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with section (dynamic)', () => {
    const menuItems = [
      {
        title: 'Actions',
        children: [
          { key: 'new', name: 'New File' },
          { key: 'copy', name: 'Copy Link' },
          { key: 'edit', name: 'Edit File' }
        ]
      },
      {
        title: 'Danger Zone',
        children: [{ key: 'delete', name: 'Delete File' }]
      }
    ];

    const wrapper = render(
      <Dropdown>
        <Dropdown.Button>Trigger</Dropdown.Button>
        <Dropdown.Menu aria-label="Actions" items={menuItems}>
          {(section: any) => (
            <Dropdown.Section
              title={section.title}
              items={section.children}
              aria-label={section.title}
            >
              {(item: any) => (
                <Dropdown.Item key={item.key}>{item.name}</Dropdown.Item>
              )}
            </Dropdown.Section>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with single selection (controlled)', () => {
    let onOpenChange = jest.fn();
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Dropdown onOpenChange={onOpenChange}>
        <Dropdown.Button data-testid="trigger-test">Trigger</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Actions"
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let triggerButton = wrapper.getByTestId('trigger-test');

    expect(onOpenChange).toBeCalledTimes(0);

    userEvent.click(triggerButton);

    let menu = wrapper.getByRole('menu');
    expect(menu).toBeTruthy();

    // validates if the menu has the triggerButton id as aria-labelledby
    expect(menu.getAttribute('aria-labelledby')).toBe(triggerButton.id);

    let menuItems = wrapper.getAllByRole('menuitemradio');

    expect(menuItems.length).toBe(4);

    userEvent.click(menuItems[0]);

    expect(onSelectionChange).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalled();

    // check if the menu is closed
    expect(wrapper.queryByRole('menu')).toBeNull();
  });

  it('should work with multiple selection (controlled)', () => {
    let onOpenChange = jest.fn();
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Dropdown onOpenChange={onOpenChange}>
        <Dropdown.Button data-testid="trigger-test">Trigger</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Actions"
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let triggerButton = wrapper.getByTestId('trigger-test');

    expect(onOpenChange).toBeCalledTimes(0);

    userEvent.click(triggerButton);

    let menu = wrapper.getByRole('menu');
    expect(menu).toBeTruthy();

    // validates if the menu has the triggerButton id as aria-labelledby
    expect(menu.getAttribute('aria-labelledby')).toBe(triggerButton.id);

    let menuItems = wrapper.getAllByRole('menuitemcheckbox');

    expect(menuItems.length).toBe(4);

    userEvent.click(menuItems[0]);

    expect(onSelectionChange).toBeCalledTimes(1);
    expect(onOpenChange).toBeCalled();

    // check if the menu is not closed
    expect(wrapper.queryByRole('menu')).not.toBeNull();
  });

  it('should show checkmarks if selectionMode is single and has a selected item', () => {
    const wrapper = render(
      <Dropdown isOpen>
        <Dropdown.Button data-testid="trigger-test">Trigger</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Actions"
          selectionMode="single"
          selectedKeys={['new']}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let checkmark = wrapper.getByRole('img');
    expect(checkmark).not.toBeNull();
  });

  it('should show multiple checkmarks if selectionMode is multiple and has selected items', () => {
    const wrapper = render(
      <Dropdown isOpen>
        <Dropdown.Button data-testid="trigger-test">Trigger</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Actions"
          selectionMode="multiple"
          selectedKeys={['new', 'copy', 'edit']}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let checkmark = wrapper.getAllByRole('img');
    expect(checkmark).not.toBeNull();
    expect(checkmark.length).toBe(3);
  });

  it('should not show checkmarks if selectionMode not defined', () => {
    const wrapper = render(
      <Dropdown>
        <Dropdown.Button>Trigger</Dropdown.Button>
        <Dropdown.Menu aria-label="Actions" selectedKeys={['new']}>
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let checkmark = wrapper.queryByRole('img');
    expect(checkmark).toBeNull();
  });

  it('should not open on disabled button', () => {
    let onOpenChange = jest.fn();

    const wrapper = render(
      <Dropdown>
        <Dropdown.Button data-testid="trigger-test" disabled>
          Trigger
        </Dropdown.Button>
        <Dropdown.Menu aria-label="Actions">
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    let triggerButton = wrapper.getByTestId('trigger-test');

    userEvent.click(triggerButton);

    let menu = wrapper.queryByRole('menu');
    expect(menu).toBeNull();
    expect(onOpenChange).toBeCalledTimes(0);
  });

  it('should not select on disabled item', () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Dropdown isOpen>
        <Dropdown.Button data-testid="trigger-test">Trigger</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Actions"
          disabledKeys={['new']}
          onSelectionChange={onSelectionChange}
        >
          <Dropdown.Item key="new">New file</Dropdown.Item>
          <Dropdown.Item key="copy">Copy link</Dropdown.Item>
          <Dropdown.Item key="edit">Edit file</Dropdown.Item>
          <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let menuItems = wrapper.getAllByRole('menuitem');

    expect(menuItems.length).toBe(4);

    userEvent.click(menuItems[0]);

    expect(onSelectionChange).toBeCalledTimes(0);
  });
});
