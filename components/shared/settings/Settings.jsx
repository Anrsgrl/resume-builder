import useStore from "@/store/store";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowRight, MdOutlineAdd } from "react-icons/md";
import { TbWashDrycleanOff } from "react-icons/tb";

const Settings = ({ setSettingTab }) => {
  const { loadSampleData } = useStore();
  const t = useTranslations("Template");

  //* Reset all data
  const clearResumeData = () => {
    if (!window.confirm(t("cleanConfirm"))) {
      return;
    }
    try {
      localStorage.removeItem("resume-data");
      toast.success(t("cleanSuccess"));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //* Load sample data
  const handleLoadSampleData = async () => {
    try {
      await loadSampleData();
      toast.success(t("sampleSuccess"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={clearResumeData}
        className="menu-item w-full font-normal text-red-400"
      >
        {t("clean")}
        <TbWashDrycleanOff />
      </button>
      <button
        type="button"
        onClick={handleLoadSampleData}
        className="menu-item w-full font-normal "
      >
        {t("sample")}
        <MdOutlineAdd />
      </button>
      <button
        type="button"
        onClick={() => setSettingTab("export")}
        className="menu-item w-full font-normal"
      >
        {t("jsonExport")}
        <MdKeyboardArrowRight />
      </button>
      <button
        type="button"
        onClick={() => setSettingTab("import")}
        className="menu-item w-full font-normal"
      >
        {t("jsonImport")}
        <MdKeyboardArrowRight />
      </button>
    </>
  );
};

export default Settings;
