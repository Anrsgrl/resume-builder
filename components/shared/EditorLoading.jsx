export default function EditorLoading() {
  return (
    <div className="relative border-gray-600 bg-zinc-800 focus:outline-none focus:ring-0 focus:border-main border rounded-md animate-pulse h-[86px] mt-2">
      <div className="absolute -top-1 start-3 px-2 h-[8px] w-16 bg-zinc-700 rounded-sm"></div>
      <div className="flex items-center gap-6 p-2">
        <div className="flex items-center gap-3">
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[18px] h-[18px] bg-zinc-700 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
