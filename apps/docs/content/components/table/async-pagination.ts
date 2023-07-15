const App = `import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";

export default function App() {
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const rowsPerPage = 10;

  let list = useAsyncList({
    async load({signal, cursor}) {
      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", {signal});
      let json = await res.json();

      setTotal(json.count);

      setIsLoading(false);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const pages = Math.ceil(total / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.items.slice(start, end);
  }, [page, list.items?.length]);

  const onPaginationChange = React.useCallback(
    (page) => {
      setIsLoading(true);
      if (page >= list.items.length / rowsPerPage) {
        list.loadMore();
      }
      setPage(page);
    },
    [list.items.length],
  );

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={onPaginationChange}
            />
          </div>
        ) : null
      }
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading && !items.length}
        items={items}
        loadingContent={<Spinner />}
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
