"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import {useCallback, useMemo, useState} from "react";

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

export default function Page() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const rowsPerPage = 10;

  let list = useAsyncList<SWCharacter>({
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

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.items.slice(start, end);
  }, [page, list.items?.length]);

  const onPaginationChange = useCallback(
    (page: number) => {
      setIsLoading(true);
      if (page >= list.items.length / rowsPerPage) {
        list.loadMore();
      }
      setPage(page);
    },
    [list.items.length],
  );

  return (
    <div className="p-6">
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
    </div>
  );
}
