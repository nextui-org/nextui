import React from 'react';
import {
  styled,
  ReactAriaTable,
  TableCell,
  TableColumn,
  TableRow,
  TableBody,
  TableHeader,
  Text,
  Spacer
} from '@nextui-org/react';

import { useIsSSR } from '@react-aria/ssr';

const Box = styled('div', {
  dflex: 'center',
  flexDirection: 'column',
  minHeight: '100vh',
  overflowY: 'auto'
});

const BaseTable = (props: any) => {
  return (
    <ReactAriaTable
      aria-label="Example static collection table"
      css={{ height: '210px', maxWidth: '640px' }}
      {...props}
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>TYPE</TableColumn>
        <TableColumn>DATE MODIFIED</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Games</TableCell>
          <TableCell>File folder</TableCell>
          <TableCell>6/7/2020</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Program Files</TableCell>
          <TableCell>File folder</TableCell>
          <TableCell>4/7/2021</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>bootmgr</TableCell>
          <TableCell>System file</TableCell>
          <TableCell>11/20/2010</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>log.txt</TableCell>
          <TableCell>Text Document</TableCell>
          <TableCell>1/18/2016</TableCell>
        </TableRow>
      </TableBody>
    </ReactAriaTable>
  );
};

const TestPage = () => {
  let isSSR = useIsSSR();

  if (isSSR) {
    return null;
  }

  return (
    <Box>
      <Text h3>Single</Text>
      <Spacer y={0.4} />
      <BaseTable selectionMode="single" />

      <Spacer y={1} />

      <Text h3>Multiple</Text>
      <Spacer y={0.4} />
      <BaseTable selectionMode="multiple" selectedColor="secondary" />

      <Spacer y={1} />

      <Text h3>Striped</Text>
      <Spacer y={0.4} />
      <BaseTable selectionMode="multiple" compact />

      <Spacer y={1} />

      <Text h3>No shadow</Text>
      <Spacer y={0.4} />
      <BaseTable
        shadow={false}
        selectionMode="multiple"
        selectedColor="secondary"
      />

      <Spacer y={1} />

      <Text h3>Lined</Text>
      <Spacer y={0.4} />
      <BaseTable
        lined
        headerLined
        shadow={false}
        selectionMode="multiple"
        selectedColor="secondary"
      />

      <Spacer y={1} />
    </Box>
  );
};

export default TestPage;
