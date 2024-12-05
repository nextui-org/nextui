import {Suspense} from "react";

import ClientPage from "./client-page";

export default function PerfPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPage />
    </Suspense>
  );
}
