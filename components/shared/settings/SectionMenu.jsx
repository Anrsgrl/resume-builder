import useTemplateStore from "@/store/template";
import { cn } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import React from "react";
import { BiText } from "react-icons/bi";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { MdInsertEmoticon, MdKeyboardArrowLeft } from "react-icons/md";
const Select = ({ label, state, setState, options, className }) => {
  return (
    <select
      name={label}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className={cn(
        "bg-transparent text-white/80 outline-none border-0 cursor-pointer animation-all",
        className
      )}
    >
      {options?.map((e, index) => (
        <option
          key={index}
          value={e.value}
          hidden={state === e.value}
          className={"bg-zinc-900 text-white"}
        >
          {e.label}
        </option>
      ))}
    </select>
  );
};

const SectionMenu = ({ setTabMenu, reset }) => {
  const {
    imageSize,
    projectLink,
    spaceBetween,
    h2Align,
    titleCase,
    setImageSize,
    setProjectLink,
    setSpaceBetween,
    seth2Align,
    setTitleCase,
  } = useTemplateStore();
  const t = useTranslations("Template");
  const ImageSizeOptions = [
    {
      value: "60",
      label: "60x60",
    },
    {
      value: "",
      label: "80x80",
    },
    {
      value: "100",
      label: "100x100",
    },
  ];
  const spaceOptions = [
    {
      value: "less",
      label: t("less"),
    },
    {
      value: "",
      label: "default",
    },
    {
      value: "more",
      label: t("more"),
    },
  ];
  const alignOptions = [
    {
      value: "right",
      icon: <FaAlignRight />,
    },
    {
      value: "",
      icon: <FaAlignCenter />,
    },
    {
      value: "left",
      icon: <FaAlignLeft />,
    },
  ];
  const caseOptions = [
    {
      value: "lower",
      icon: "aa",
    },
    {
      value: "",
      icon: "AA",
    },
    {
      value: "capital",
      icon: "Aa",
    },
  ];
  return (
    <>
      <button
        onClick={() => setTabMenu("main")}
        type="button"
        className="px-4 py-2 text-sm flex items-center cursor-pointer animation-all hover:opacity-90 border-b border-zinc-100/20 mb-1"
      >
        <MdKeyboardArrowLeft /> {t("back")}
      </button>
      <div
        id="image-size"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
      >
        {t("imageSize")}
        <Select
          label={`image-size`}
          state={imageSize}
          setState={setImageSize}
          options={ImageSizeOptions}
          className={`text-right`}
        />
      </div>
      <div
        id="space-between"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
      >
        {t("space")}
        <Select
          label={`space-between`}
          state={spaceBetween}
          setState={setSpaceBetween}
          options={spaceOptions}
          className={`text-right`}
        />
      </div>
      <div
        id="h2-align"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
      >
        {t("h2")}
        <div className="flex items-center gap-1">
          {alignOptions.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => seth2Align(item.value)}
              className={`${h2Align === item.value ? "text-main" : ""}`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
      <div
        id="title-case"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
      >
        {t("titles")}
        <div className="flex items-center gap-1">
          {caseOptions.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setTitleCase(item.value)}
              className={`${titleCase === item.value ? "text-main" : ""}`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
      <div
        id="project-display"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
      >
        {t("project")}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setProjectLink("")}
            className={`${projectLink === "" ? "text-main" : ""}`}
          >
            <BiText size={16} />
          </button>
          <button
            type="button"
            onClick={() => setProjectLink("icon")}
            className={`${projectLink === "icon" ? "text-main" : ""}`}
          >
            <MdInsertEmoticon size={16} />
          </button>
        </div>
      </div>
      <button
        onClick={reset}
        type="button"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all text-red-400 "
      >
        {t("resetSection")}
      </button>
    </>
  );
};

export default SectionMenu;
