import { useTranslations } from "next-intl";
import { FaArrowDown, FaArrowUp, FaEdit, FaTrash } from "react-icons/fa";
import { TbClick } from "react-icons/tb";

const Example = ({ children, index, state, title, edit, remove, up, down }) => {
  const t = useTranslations("General");
  return (
    <details
      key={index}
      className="border border-white/50 p-4 rounded-md animation-all mt-2"
    >
      <summary className="font-bold text-white/80 flex items-center justify-between cursor-pointer">
        <span className="flex items-center gap-1">
          <span className="max-w-[90%] truncate">{title}</span> <TbClick />
        </span>
        {up && down && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => up(index)}
              disabled={index === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-90 disabled:hover:scale-100 animation-all"
            >
              <FaArrowUp />
            </button>
            <button
              onClick={() => down(index)}
              disabled={index === state.length - 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-90 disabled:hover:scale-100 animation-all"
            >
              <FaArrowDown />
            </button>
          </div>
        )}
      </summary>
      {children}
      <div className="flex items-center gap-2 mt-2 pt-2 border-t">
        <button
          onClick={() => edit(index)}
          className="text-blue-500 hover:text-blue-700 p-2 rounded-full animation-all flex items-center gap-1"
        >
          <FaEdit size={16} /> {t("edit")}
        </button>
        <button
          onClick={() => remove(index)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full animation-all flex items-center gap-1"
        >
          <FaTrash size={16} /> {t("remove")}
        </button>
      </div>
    </details>
  );
};

export default Example;
