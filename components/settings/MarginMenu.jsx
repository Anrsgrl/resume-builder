import useTemplateStore from "@/store/template";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";

const CustomMargin = ({ setTabMenu }) => {
  const t = useTranslations();
  const {
    template: { spaceBetween },
  } = useTemplateStore();
  const space =
    spaceBetween === "less" ? "8" : spaceBetween === "more" ? "24" : "16";
  const [selectedSectionID, setSelectedSectionID] = useState("");
  const [customMargin, setCustomMargin] = useState(space);
  const SECTIONS = [
    { value: "summary", label: t("Personal.summary") },
    { value: "socials", label: t("Social.title") },
    { value: "education", label: t("Education.title") },
    { value: "experience", label: t("Experience.title") },
    { value: "skills", label: t("Skills.title") },
    { value: "interests", label: t("Interests.title") },
    { value: "references", label: t("References.title") },
    { value: "certificates", label: t("Certificates.title") },
    { value: "projects", label: t("Projects.title") },
    { value: "languages", label: t("Languages.title") },
  ];

  const id = `template1-${selectedSectionID}`;
  const addCustomMargin = () => {
    if (selectedSectionID === "" || customMargin.trim() === "") {
      toast.error(t("Template.customError"));
      return;
    }
    try {
      const element = document.getElementById(id);
      element.style.marginTop = `${Number(customMargin)}px`;
      toast.success(t("Template.customSuccess"));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <button
        onClick={() => setTabMenu("main")}
        type="button"
        className="px-4 py-2 text-sm flex items-center cursor-pointer animation-all hover:opacity-90 border-b border-zinc-100/20 mb-1"
      >
        <MdKeyboardArrowLeft /> {t("Template.back")}
      </button>
      <div className="menu-item">
        {t("Template.section")}
        <select
          value={selectedSectionID}
          onChange={(e) => setSelectedSectionID(e.target.value)}
          name="section-margin"
          className="bg-transparent text-white/80 outline-none border-0 cursor-pointer animation-all max-w-[70px] truncate"
        >
          <option value="" hidden className="max-w-[70px] truncate">
            {t("Template.select")}
          </option>
          {SECTIONS.map((item, index) => (
            <option
              key={index}
              value={item.value}
              className="bg-zinc-900 text-white max-w-[70px] truncate"
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="menu-item">
        <label htmlFor="">{t("Template.margin")}</label>
        <div className="flex items-center justify-end w-full gap-0.5">
          <input
            type="number"
            name="custom-margin-input"
            className="outline-0 border-0 bg-transparent border-b border-transparent border-white/50 text-xs text-white/80 w-1/3 appearance-none relative"
            value={customMargin}
            onChange={(e) => setCustomMargin(e.target.value)}
          />
          <span className="text-xs text-white/40">px</span>
        </div>
      </div>
      <button type="button" onClick={addCustomMargin} className="menu-item">
        {t("Template.customAdd")}
      </button>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="text-red-400 menu-item"
      >
        {t("Template.customReset")}
      </button>
    </>
  );
};

export default CustomMargin;
