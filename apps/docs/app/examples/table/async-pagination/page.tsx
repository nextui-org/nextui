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
import {useMemo, useState} from "react";
import useSWR from "swr";

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Page() {
  const [page, setPage] = useState(1);

  const {data, isLoading} = useSWR<{
    count: number;
    results: SWCharacter[];
  }>(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
    keepPreviousData: true,
  });

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

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
                onChange={(page) => setPage(page)}
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
          isLoading={isLoading || data?.results.length === 0}
          items={data?.results ?? []}
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
