import {ThemeBuilder} from "@/components/themes";

export default function ThemesPage() {
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto mt-12">
      <ThemeBuilder />
    </div>
  );
}
