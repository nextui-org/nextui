import React from 'react';
import { Meta } from '@storybook/react';
import Table, {
  TableCellData,
  TableColumnHeaderData,
  TableColumnItem
} from './index';

import ReactAriaTable from './table';

import {
  Cell as TableCell,
  Column as TableColumn,
  Row as TableRow,
  TableBody,
  TableHeader
} from '@react-stately/table';

import { User, Text, Col, Row, Tooltip, styled } from '../index';
import { Eye, Edit, Delete } from '../utils/icons';

const StyledBadge = styled('span', {
  display: 'inline-block',
  textTransform: 'uppercase',
  padding: '$2 $3',
  margin: '0 2px',
  fontSize: '10px',
  fontWeight: '$bold',
  borderRadius: '14px',
  letterSpacing: '0.6px',
  lineHeight: 1,
  boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
  alignItems: 'center',
  alignSelf: 'center',
  color: '$white',
  variants: {
    type: {
      active: {
        bg: '$green100',
        color: '$green600'
      },
      paused: {
        bg: '$red100',
        color: '$red600'
      },
      vacation: {
        bg: '$yellow100',
        color: '$yellow600'
      }
    }
  },
  defaultVariants: {
    type: 'active'
  }
});

const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8'
  },
  '&:active': {
    opacity: '0.6'
  }
});

export default {
  title: 'Display/Table',
  component: Table,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '90%' }}>
        <Story />
      </div>
    )
  ]
} as Meta;

type UserType = {
  id: string | number;
  name?: string;
  email?: string;
  role?: string;
  team?: string;
  status: 'active' | 'paused' | 'vacation';
  meta?: { [key: string]: any };
};

const rows: UserType[] = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    meta: {
      age: '29',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      email: 'tony.reichert@example.com'
    }
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Technical Lead',
    team: 'Development',
    status: 'paused',
    meta: {
      age: '25',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      email: 'zoey.lang@example.com'
    }
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Senior Developer',
    team: 'Development',
    status: 'active',
    meta: {
      age: '22',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
      email: 'jane.fisher@example.com'
    }
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'Community Manager',
    team: 'Marketing',
    status: 'vacation',
    meta: {
      age: '28',
      avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      email: 'william.howard@example.com'
    }
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Sales Manager',
    team: 'Sales',
    status: 'active',
    meta: {
      age: '24',
      avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
      email: 'kristen.cooper@example.com'
    }
  }
];

//** target column fields  */
// filterable: false,
// sortable: false,
// minWidth
// hideSortIcons

const columns: TableColumnItem[] = [
  {
    field: 'name',
    label: 'Name',
    width: 260,
    renderHeader: (data?: TableColumnHeaderData) => {
      console.log('renderHeader', data);
      return <b>Name</b>;
    },
    renderCell: (data: TableCellData<UserType>) => {
      return (
        <User
          squared
          src={data.rowData?.meta?.avatar}
          name={data.rowData?.name}
          css={{ p: 0 }}
        >
          {data.rowData?.meta?.email}
        </User>
      );
    }
  },
  {
    field: 'role',
    label: 'Role',
    width: 180,
    renderCell: (data: TableCellData<UserType>) => {
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: 'capitalize' }}>
              {data.value}
            </Text>
          </Row>
          <Row>
            <Text b size={13} css={{ tt: 'capitalize', color: '$accents3' }}>
              {data.rowData?.team}
            </Text>
          </Row>
        </Col>
      );
    }
  },
  {
    field: 'status',
    label: 'Status',
    width: 140,
    renderCell: (data: TableCellData<UserType>) => {
      return (
        <StyledBadge type={data.rowData?.status}>{data.value}</StyledBadge>
      );
    }
  },
  {
    field: 'action',
    label: 'Actions',
    width: 140,
    renderCell: (data: TableCellData<UserType>) => {
      return (
        <Row justify="center" align="center">
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Details">
              <IconButton
                onClick={() => console.log(`View user ${data.rowData?.id}`)}
              >
                <Eye size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Edit user">
              <IconButton
                onClick={() => console.log(`edit user ${data.rowData?.id}`)}
              >
                <Edit size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={() => console.log(`Delete user ${data.rowData?.id}`)}
            >
              <IconButton>
                <Delete size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    }
  }
];

export const ReactAriaTableExample = () => {
  return (
    <ReactAriaTable
      aria-label="Example static collection table"
      css={{ height: '210px', minWidth: '440px' }}
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Date Modified</TableColumn>
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

export const Default = () => <Table columns={columns} rows={rows} />;

export const Striped = () => <Table striped columns={columns} rows={rows} />;

export const Lined = () => <Table lined columns={columns} rows={rows} />;

export const Hoverable = () => (
  <Table hoverable columns={columns} rows={rows} />
);

export const Compact = () => <Table compact columns={columns} rows={rows} />;

export const NoShadow = () => (
  <Table shadow={false} columns={columns} rows={rows} />
);

export const WithCaption = () => (
  <Table caption="List of Users" columns={columns} rows={rows} />
);
