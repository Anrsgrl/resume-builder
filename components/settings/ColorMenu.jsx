import React from "react";
import ColorPicker from "@/components/shared/ColorPicker";
import useTemplateStore from "@/store/template";
import { useTranslations } from "next-intl";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ColorSelect = ({ label, stateName, defaultValue }) => {
  const { template, setTemplate } = useTemplateStore();
  const state = template[stateName];

  return (
    <div className="menu-item">
      {label}
      <ColorPicker
        id={stateName}
        state={state || defaultValue}
        setState={(value) => setTemplate(stateName, value)}
      />
    </div>
  );
};

const ColorMenu = ({ setTabMenu, reset }) => {
  const t = useTranslations("Template");

  const colorInputs = [
    { label: t("h1"), stateName: "h1Color", defaultValue: "#000000" },
    { label: t("h2"), stateName: "h2Color", defaultValue: "#000000" },
    { label: t("h3"), stateName: "h3Color", defaultValue: "#000000" },
    { label: t("text"), stateName: "textColor", defaultValue: "#000000" },
    {
      label: t("hyperlink"),
      stateName: "hyperLinkColor",
      defaultValue: "#0284c7",
    },
    {
      label: t("description"),
      stateName: "descriptionColor",
      defaultValue: "#000000",
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
      {colorInputs.map((item, index) => (
        <ColorSelect
          key={index}
          label={item.label}
          stateName={item.stateName}
          defaultValue={item.defaultValue}
        />
      ))}
      <button onClick={reset} type="button" className="menu-item text-red-400">
        {t("resetColor")}
      </button>
    </>
  );
};

export default ColorMenu;
