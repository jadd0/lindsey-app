export default function ItemSearch({
  searchChange,
}: {
  searchChange: (search: string) => void;
}) {
  return (
    <div className="w-full h-15 border-2 border-red-800 grid grid-cols-2">
      <div className="flex items-center justify-center gap-5">
        <input
          type="text"
          placeholder="Search items..."
          onChange={(e) => searchChange(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
}