import useTemplateStore from "@/store/template";
import { FONTS, uiSans } from "@/utils/constants";
import { useTranslations } from "next-intl";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const FontSelect = ({ label, options, state, setState, i }) => {
  return (
    <div
      key={i}
      className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
    >
      {label}
      <select
        name={label}
        value={state}
        title={state}
        onChange={(e) => setState(e.target.value)}
        className="bg-transparent text-white/80 outline-none border-0 cursor-pointer animation-all max-w-[66px] truncate"
      >
        <option
          value=""
          hidden={state === ""}
          style={{ fontFamily: uiSans }}
          className={`bg-zinc-900 text-white`}
        >
          default
        </option>
        {options?.map((e, index) => (
          <option
            key={index}
            title={`${e.value} --- ${state}`}
            value={e.value ? e.value : e}
            hidden={state === e || state === e.value}
            style={{ fontFamily: i !== 0 ? uiSans : e }}
            className="bg-zinc-900 text-white"
          >
            {e.label ? e.label : e}
          </option>
        ))}
      </select>
    </div>
  );
};

const FontMenu = ({ setTabMenu, reset }) => {
  const {
    fontFamily,
    setFontFamily,
    h1FontSize,
    h2FontSize,
    h3FontSize,
    textFontSize,
    descriptionFontSize,
    seth1FontSize,
    seth2FontSize,
    seth3FontSize,
    setTextFontSize,
    setDescriptionFontSize,
    hyperLinkFontSize,
    setHyperLinkFontSize,
  } = useTemplateStore();
  const t = useTranslations("Template");
  const sizeOptions = [
    {
      label: t("small"),
      value: "small",
    },
    {
      label: t("large"),
      value: "large",
    },
  ];
  const fontInputs = [
    {
      label: "Font",
      state: fontFamily,
      setState: setFontFamily,
      options: FONTS,
    },
    {
      label: t("h1"),
      state: h1FontSize,
      setState: seth1FontSize,
      options: sizeOptions,
    },
    {
      label: t("h2"),
      state: h2FontSize,
      setState: seth2FontSize,
      options: sizeOptions,
    },
    {
      label: t("h3"),
      state: h3FontSize,
      setState: seth3FontSize,
      options: sizeOptions,
    },
    {
      label: t("text"),
      state: textFontSize,
      setState: setTextFontSize,
      options: sizeOptions,
    },
    {
      label: t("hyperlink"),
      state: hyperLinkFontSize,
      setState: setHyperLinkFontSize,
      options: sizeOptions,
    },
    {
      label: t("description"),
      state: descriptionFontSize,
      setState: setDescriptionFontSize,
      options: sizeOptions,
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
      {fontInputs.map((item, index) => (
        <FontSelect
          key={index}
          i={index}
          label={item.label}
          state={item.state}
          setState={item.setState}
          options={item.options}
        />
      ))}

      <button
        onClick={reset}
        type="button"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all text-red-400 "
      >
        {t("resetFont")}
      </button>
    </>
  );
};

export default FontMenu;
