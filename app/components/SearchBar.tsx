import { SearchIcon } from "./icons";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-panel border border-panel-border rounded-lg px-3 py-2 max-w-[420px] w-full">
      <SearchIcon className="w-[15px] h-[15px] text-gray-500 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 w-full"
      />
    </div>
  );
}
