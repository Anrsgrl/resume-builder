import useTemplateStore from "@/store/template";
import { FONTS, uiSans } from "@/utils/constants";
import { useTranslations } from "next-intl";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const FontSelect = ({ label, options, stateName, i }) => {
  const { template, setTemplate } = useTemplateStore();
  const state = template[stateName];

  return (
    <div key={i} className="menu-item">
      {label}
      <select
        name={label}
        value={state}
        title={state}
        onChange={(e) => setTemplate(stateName, e.target.value)}
        className="bg-transparent text-white/80 outline-none border-0 cursor-pointer animation-all text-right appearance-none"
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
            value={e.value || e}
            hidden={state === e || state === e.value}
            style={{ fontFamily: i !== 0 ? uiSans : e }}
            className="bg-zinc-900 text-white"
          >
            {e.label || e}
          </option>
        ))}
      </select>
    </div>
  );
};

const FontMenu = ({ setTabMenu, reset }) => {
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
      stateName: "fontFamily",
      options: FONTS,
    },
    {
      label: t("h1"),
      stateName: "h1FontSize",
      options: sizeOptions,
    },
    {
      label: t("h2"),
      stateName: "h2FontSize",
      options: sizeOptions,
    },
    {
      label: t("h3"),
      stateName: "h3FontSize",
      options: sizeOptions,
    },
    {
      label: t("text"),
      stateName: "textFontSize",
      options: sizeOptions,
    },
    {
      label: t("hyperlink"),
      stateName: "hyperLinkFontSize",
      options: sizeOptions,
    },
    {
      label: t("description"),
      stateName: "descriptionFontSize",
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
          stateName={item.stateName}
          options={item.options}
        />
      ))}

      <button onClick={reset} type="button" className="menu-item text-red-400">
        {t("resetFont")}
      </button>
    </>
  );
};

export default FontMenu;
