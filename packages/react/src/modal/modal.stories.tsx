import React, {useState} from "react";
import {Meta} from "@storybook/react";

import Button from "../button";
import Text from "../text";
import Input from "../input";
import Checkbox from "../checkbox";
import Row from "../row";
import {Mail, Password} from "../utils/icons";

import useModal from "./use-modal";

import Modal from "./index";

export default {
  title: "Feedback/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Show Modal
      </Button>
      <Modal aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to&nbsp;
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Mail />}
            placeholder="Email"
            size="lg"
          />
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Password />}
            placeholder="Password"
            size="lg"
          />
          <Row justify="space-between">
            <Checkbox>
              <Text css={{color: "$text"}} size={14}>
                Remember me
              </Text>
            </Checkbox>
            <Text css={{color: "$accents4"}} size={14}>
              Forgot password?
            </Text>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const WithCloseButton = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    // eslint-disable-next-line no-console
    console.log("closed");
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Show Modal
      </Button>
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to&nbsp;
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Mail fill="currentColor" />}
            placeholder="Email"
            size="lg"
          />
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Password fill="currentColor" />}
            placeholder="Password"
            size="lg"
          />
          <Row justify="space-between">
            <Checkbox>
              <Text css={{color: "$text"}} size={14}>
                Remember me
              </Text>
            </Checkbox>
            <Text css={{color: "$accents4"}} size={14}>
              Forgot password?
            </Text>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const WithUseModal = () => {
  const {setVisible, bindings} = useModal();

  return (
    <div>
      <Button auto color="secondary" onClick={() => setVisible(true)}>
        Show Modal
      </Button>
      <Modal aria-labelledby="modal-title" {...bindings}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to&nbsp;
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Mail fill="currentColor" />}
            placeholder="Email"
            size="lg"
          />
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Password fill="currentColor" />}
            placeholder="Password"
            size="lg"
          />
          <Row justify="space-between">
            <Checkbox>
              <Text css={{color: "$text"}} size={14}>
                Remember me
              </Text>
            </Checkbox>
            <Text css={{color: "$accents4"}} size={14}>
              Forgot password?
            </Text>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const NoAnimated = () => {
  const {setVisible, bindings} = useModal();

  return (
    <div>
      <Button auto color="secondary" onClick={() => setVisible(true)}>
        Show Modal
      </Button>
      <Modal animated={false} aria-labelledby="modal-title" {...bindings}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to&nbsp;
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Mail fill="currentColor" />}
            placeholder="Email"
            size="lg"
          />
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Password fill="currentColor" />}
            placeholder="Password"
            size="lg"
          />
          <Row justify="space-between">
            <Checkbox>
              <Text css={{color: "$text"}} size={14}>
                Remember me
              </Text>
            </Checkbox>
            <Text css={{color: "$accents4"}} size={14}>
              Forgot password?
            </Text>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const LargeContent = () => {
  const {setVisible, bindings} = useModal();

  return (
    <div>
      <Button auto color="secondary" onClick={() => setVisible(true)}>
        Show Modal
      </Button>
      <Modal
        scroll
        aria-describedby="modal-description"
        aria-labelledby="modal-title"
        width="40%"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Modal with a lot of content
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Text id="modal-description">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </Text>
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            I&apos;m agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const FullScreen = () => {
  const {setVisible, bindings} = useModal();

  return (
    <div>
      <Button auto color="secondary" onClick={() => setVisible(true)}>
        Show Modal
      </Button>
      <Modal
        closeButton
        fullScreen
        scroll
        aria-describedby="modal-description"
        aria-labelledby="modal-title"
        width="40%"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Modal with a lot of content
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Text id="modal-description">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
            leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </Text>
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            I&apos;m agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const Blur = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    // eslint-disable-next-line no-console
    console.log("closed");
  };

  return (
    <div>
      <Button auto shadow color="warning" onClick={handler}>
        Open modal
      </Button>
      <Modal blur closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Mail fill="currentColor" />}
            placeholder="Email"
            size="lg"
          />
          <Input
            bordered
            clearable
            fullWidth
            color="primary"
            contentLeft={<Password fill="currentColor" />}
            placeholder="Password"
            size="lg"
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
