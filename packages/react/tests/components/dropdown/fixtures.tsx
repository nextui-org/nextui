import type {Key} from "@react-types/shared";

import {useState} from "react";

import {AlertDialog} from "@/components/alert-dialog";
import {Button} from "@/components/button";
import {Drawer} from "@/components/drawer";
import {Dropdown} from "@/components/dropdown";
import {Label} from "@/components/label";
import {Modal} from "@/components/modal";

export type DropdownFixtureProps = {
  defaultOpen?: boolean;
  onAction?: (key: Key) => void;
};

/** Row wider than 48svw on a 390px screen, so a squeezed popover collapses the icon. */
export const NarrowViewportDropdownFixture = () => (
  <Dropdown>
    <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item id="theme" textValue="System theme">
          <svg
            aria-hidden="true"
            className="size-4 text-muted"
            data-testid="theme-icon"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="6" />
          </svg>
          <Label style={{minWidth: "16rem"}}>System theme</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
);

export const DropdownFixture = (props: DropdownFixtureProps = {}) => (
  <Dropdown defaultOpen={props.defaultOpen}>
    <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu onAction={props.onAction}>
        <Dropdown.Item id="new-file" textValue="New file">
          <Label>New file</Label>
        </Dropdown.Item>
        <Dropdown.Item id="copy-link" textValue="Copy link">
          <Label>Copy link</Label>
        </Dropdown.Item>
        <Dropdown.Item id="delete-file" textValue="Delete file">
          <Label>Delete file</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
);

/** Uncontrolled dropdown whose item opens a Modal in the same action. */
export const DropdownToModalFixture = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={() => setOpen(true)}>
            <Dropdown.Item id="open">Open modal</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Open modal directly</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Modal from dropdown</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <Button>Inside action</Button>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

/** Dropdown nested inside a Modal, so its popover has to stay above the Modal that owns it. */
export const ModalWithDropdownFixture = () => (
  <Modal>
    <Button>Open modal</Button>
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Heading>Modal with dropdown</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <Dropdown>
              <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item id="rename">Rename</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

/** Controlled dropdown closed inside `onAction`, with an AlertDialog opened in the same action. */
export const DropdownToAlertDialogFixture = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Dropdown isOpen={isMenuOpen} onOpenChange={setMenuOpen}>
        <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={() => {
              setMenuOpen(false);
              setOpen(true);
            }}
          >
            <Dropdown.Item id="delete">Delete project</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <AlertDialog isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Delete project directly</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Header>
                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>This action cannot be undone.</p>
              </AlertDialog.Body>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
};

/** Uncontrolled dropdown whose item opens a Drawer in the same action. */
export const DropdownToDrawerFixture = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger aria-label="Menu">Actions</Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={() => setOpen(true)}>
            <Dropdown.Item id="open">Open drawer</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Drawer isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Open drawer directly</Button>
        <Drawer.Backdrop>
          <Drawer.Content>
            <Drawer.Dialog>
              <Drawer.Header>
                <Drawer.Heading>Drawer from dropdown</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <Button>Inside action</Button>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};
