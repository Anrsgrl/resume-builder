import { useTranslations } from "next-intl";
import { FaArrowDown, FaArrowUp, FaEdit, FaTrash } from "react-icons/fa";
import { TbClick } from "react-icons/tb";
import Menu from "@/components/settings/Menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const Example = ({
  children,
  index,
  state,
  title,
  edit,
  remove,
  up,
  down,
  cursor = true,
}) => {
  const t = useTranslations("General");
  return (
    <details
      key={index}
      className="bg-zinc-700/10 border-2 border-zinc-600 text-white hover:bg-zinc-700/20 px-4 py-2 rounded-md animation-all mt-2 text-sm group"
    >
      <summary className="font-bold text-white/80 flex flex-col-reverse xs:flex-row items-center justify-between cursor-pointer text-base">
        <span className="flex items-center gap-1 w-full">
          <span className="text-sm max-w-full truncate">{title}</span>{" "}
          {cursor && (
            <TbClick className={`group-hover:text-main animation-all`} />
          )}
        </span>
        <div className="flex items-center gap-1 mr-auto xs:mr-0">
          {up && down && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => up(index)}
                disabled={index === 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-90 disabled:hover:scale-100 animation-all"
              >
                <FaArrowUp size={16} />
              </button>
              <button
                onClick={() => down(index)}
                disabled={index === state.length - 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-90 disabled:hover:scale-100 animation-all"
              >
                <FaArrowDown size={16} />
              </button>
            </div>
          )}
          <Menu
            icon={<PiDotsThreeOutlineVerticalFill />}
            className__button={`bg-transparent border-0 px-1`}
            className__children={`w-44 xs:w-56`}
          >
            <button
              type="button"
              onClick={() => edit(index)}
              className="menu-item w-full font-normal text-blue-400 text-xs xs:text-sm"
            >
              {t("edit")}
              <FaEdit />
            </button>
            <button
              type="button"
              onClick={() => remove(index)}
              className="menu-item w-full font-normal text-red-400 text-xs xs:text-sm"
            >
              {t("remove")}
              <FaTrash />
            </button>
          </Menu>
        </div>
      </summary>
      {children}
    </details>
  );
};

export default Example;
