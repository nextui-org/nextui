import {Pagination} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-5">
      <p>1 Boundary (default)</p>
      <Pagination color="secondary" total={10} />
      <p>2 Boundaries</p>
      <Pagination boundaries={2} color="secondary" total={10} />
      <p>3 Boundaries</p>
      <Pagination boundaries={3} color="secondary" total={10} />
    </div>
  );
}
