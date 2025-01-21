import useStore from "@/store/store";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineAdd } from "react-icons/md";
import { TbWashDrycleanOff } from "react-icons/tb";

const Settings = () => {
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
      console.error("Error clearing resume data:", error);
    }
  };

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
      {" "}
      <button
        type="button"
        onClick={clearResumeData}
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all w-full font-normal text-red-400"
      >
        {t("clean")}
        <TbWashDrycleanOff />
      </button>
      <button
        type="button"
        onClick={handleLoadSampleData}
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all w-full font-normal "
      >
        {t("sample")}
        <MdOutlineAdd />
      </button>
    </>
  );
};

export default Settings;
