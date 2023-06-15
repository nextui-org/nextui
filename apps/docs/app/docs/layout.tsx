import manifest from "@/content/docs/manifest.json";
import {DocsSidebar} from "@/components/docs/sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({children}: DocsLayoutProps) {
  return (
    <main className="min-h-[calc(100vh_-_64px_-_108px)] mb-12">
      <div className="grid grid-cols-12">
        <div className="hidden relative lg:block lg:col-span-2 mt-8 pr-4">
          <DocsSidebar routes={manifest.routes} />
        </div>
        {children}
      </div>
    </main>
  );
}
