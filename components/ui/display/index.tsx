import { useViewMode } from "@/context/ViewModeContext";

export default function DisplayListMode() {
  const { viewMode, setViewMode } = useViewMode();
  return (
    <div className={`fixed bottom-0 w-dvw bg-white pr-5 pl-5`}>
      <div className="flex justify-between laptop:justify-end pt-3 pb-3 text-[14px]/[18px]">
        <div className="hidden laptop:flex pr-3">Display by</div>{" "}
        <button
          className={`${viewMode === "grid" ? "italic" : "not-italic"}`}
          onClick={() => setViewMode("grid")}
        >
          Grid
        </button>
        <div className="hidden laptop:flex pr-2 pl-2">/</div>
        <button
          className={` ${viewMode === "list" ? "italic" : "not-italic"}`}
          onClick={() => setViewMode("list")}
        >
          List
        </button>
      </div>
    </div>
  );
}
