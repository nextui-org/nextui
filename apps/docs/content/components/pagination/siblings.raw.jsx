import {Pagination} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-5">
      <p>1 Sibling (default)</p>
      <Pagination total={10} />
      <p>2 Siblings</p>
      <Pagination siblings={2} total={10} />
      <p>3 Siblings</p>
      <Pagination siblings={3} total={10} />
    </div>
  );
}
