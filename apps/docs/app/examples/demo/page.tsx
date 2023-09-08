"use client";

import {Card, CardBody, CircularProgress} from "@nextui-org/react";

export default function ButtonDemo() {
  return (
    <main className="dark bg-background text-foreground">
      <div className="flex w-screen h-screen items-center justify-center">
        <Card className="w-[240px] h-[240px] bg-default-200 dark:bg-default-50">
          <CardBody className="justify-center items-center py-0">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-foreground",
                track: "stroke-foreground/10",
                value: "text-3xl font-semibold text-foreground",
              }}
              showValueLabel={true}
              strokeWidth={4}
              value={70}
            />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
