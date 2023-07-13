const App = `import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({signal}) {
      let res = await fetch('https://swapi.py4e.com/api/people/?search', {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);

      return {
        items: json.results,
      };
    },
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column!];
          let second = b[sortDescriptor.column!];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Name
        </TableColumn>
        <TableColumn key="height" allowsSorting>
          Height
        </TableColumn>
        <TableColumn key="mass" allowsSorting>
          Mass
        </TableColumn>
        <TableColumn key="birth_year" allowsSorting>
          Birth year
        </TableColumn>
      </TableHeader>
      <TableBody 
        items={list.items} 
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
