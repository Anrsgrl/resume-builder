import { useTranslations } from "next-intl";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbClick } from "react-icons/tb";

const Example = ({ children, index, state, title, edit, remove, up, down }) => {
  const t = useTranslations("General");
  return (
    <details
      key={index}
      className="border border-white/50 p-4 rounded-md animation-all"
    >
      <summary className="font-bold text-white/80 flex items-center justify-between cursor-pointer">
        <span className="flex items-center gap-1">
          {title} <TbClick />
        </span>
        {up && down && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => up(index)}
              disabled={index === 0}
              className="disabled:opacity-50"
            >
              <FaArrowUp />
            </button>
            <button
              onClick={() => down(index)}
              disabled={index === state.length - 1}
              className="disabled:opacity-50"
            >
              <FaArrowDown />
            </button>
          </div>
        )}
      </summary>
      {children}
      <div className="flex items-center gap-2 mt-2">
        <button onClick={() => edit(index)} className="text-blue-500">
          {t("edit")}
        </button>
        <button onClick={() => remove(index)} className="text-red-500">
          {t("remove")}
        </button>
      </div>
    </details>
  );
};

export default Example;
