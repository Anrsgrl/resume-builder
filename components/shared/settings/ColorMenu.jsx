import React from "react";
import ColorPicker from "@/components/shared/ColorPicker";
import useTemplateStore from "@/store/template";
import { useTranslations } from "next-intl";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ColorSelect = ({ label, state, setState, id }) => {
  return (
    <div
      key={id}
      className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all"
    >
      {label}
      <ColorPicker id={id} state={state || "#000000"} setState={setState} />
    </div>
  );
};

const ColorMenu = ({ setTabMenu, reset }) => {
  const {
    h1Color,
    h2Color,
    h3Color,
    textColor,
    descriptionColor,
    hyperLinkColor,
    seth1Color,
    seth2Color,
    seth3Color,
    setTextColor,
    setDescriptionColor,
    setHyperLinkColor,
  } = useTemplateStore();
  const t = useTranslations("Template");
  const colorInputs = [
    {
      label: t("h1"),
      state: h1Color,
      setState: seth1Color,
      id: "h1Color",
    },
    {
      label: t("h2"),
      state: h2Color,
      setState: seth2Color,
      id: "h2Color",
    },
    {
      label: t("h3"),
      state: h3Color,
      setState: seth3Color,
      id: "h3Color",
    },
    {
      label: t("text"),
      state: textColor,
      setState: setTextColor,
      id: "textColor",
    },
    {
      label: t("hyperlink"),
      state: hyperLinkColor,
      setState: setHyperLinkColor,
      id: "hyperlinkColor",
    },
    {
      label: t("description"),
      state: descriptionColor,
      setState: setDescriptionColor,
      id: "descriptionColor",
    },
  ];

  return (
    <>
      {" "}
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
          id={item.id}
          label={item.label}
          state={item.state}
          setState={item.setState}
        />
      ))}
      <button
        onClick={reset}
        type="button"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all text-red-400 "
      >
        {t("resetColor")}
      </button>
    </>
  );
};

export default ColorMenu;
