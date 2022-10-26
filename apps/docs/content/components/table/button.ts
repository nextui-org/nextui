const App = `import React from 'react';
import { Table, useAsyncList } from "@nextui-org/react";

export default function App() {
  const [showButton, setShowButton] = React.useState(true);
  const columns = [
    { name: "Name", uid: "name" },
    { name: "Height", uid: "height" },
    { name: "Mass", uid: "mass" },
    { name: "Birth Year", uid: "birth_year" },
  ];
  async function load({ signal, cursor }) {
    // If no cursor is available, then we're loading the first page.
    // Otherwise, the cursor is the next URL to load, as returned from the previous page.
    const res = await fetch(
      cursor || "https://swapi.py4e.com/api/people/?search=",
      { signal }
    );
    const json = await res.json();
    setShowButton(!!json.next);
    return {
      items: json.results,
      cursor: json.next,
    };
  }
  const list = useAsyncList({ load });
  return (
    <Table
      bordered
      shadow={false}
      aria-label="Example table with dynamic content & button"
      css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      color="secondary"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.uid}>{column.name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body
        items={list.items}
        loadingState={list.loadingState}
      >
        {(item) => (
          <Table.Row key={item.name}>
            {(key) => <Table.Cell>{item[key]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Button show={showButton} onPress={list.loadMore}>
        Load More
      </Table.Button>
    </Table>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
