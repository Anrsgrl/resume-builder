import Divider from "@/components/common/Divider";
import useStore from "@/store/store";
import { copyToClipboard } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { VscJson } from "react-icons/vsc";

const JSONMenu = ({ setSettingTab, action }) => {
  const { importDataFromFile } = useStore();
  const [json, setJson] = useState("");
  const t = useTranslations("Template");

  //* Import resume data from file
  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      await importDataFromFile(file);
      toast.success(t("importSuccess"));
    } else {
      toast.error(t("error"));
      console.error("Error:", error);
    }
  };

  const handleFileImportText = async () => {
    try {
      const parsedData = JSON.parse(json);
      if (parsedData) {
        await importDataFromFile(parsedData);
        toast.success(t("importSuccess"));
      } else {
        toast.error(t("error"));
        return;
      }
    } catch (error) {
      toast.error(t("invalidJson"));
    }
  };

  //* Export resume data
  const downloadJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume-data.json";
    link.click();
  };
  const data = JSON.parse(localStorage.getItem("resume-data"));
  const stringData = JSON.stringify(data?.state?.store, null, 2);
  const getResumeData = (download) => {
    try {
      if (data?.version === 0) {
        delete data.version;
      }
      if (download) {
        downloadJSON(data?.state?.store);
        toast.success(t("exportSuccess"));
        return;
      } else {
        copyToClipboard(stringData);
        toast.success(t("copied"));
        return;
      }
    } catch (error) {
      toast.error(t("error"));
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setSettingTab("main")}
        type="button"
        className="px-4 py-2 text-sm flex items-center cursor-pointer animation-all hover:opacity-90 border-b border-zinc-100/20 mb-1"
      >
        <MdKeyboardArrowLeft /> {t("back")}
      </button>
      {action === "import" ? (
        <>
          <label
            htmlFor="importFile"
            className="menu-item w-full truncate font-normal"
          >
            <span className="max-w-[90%] truncate">{t("jsonImport")}</span>
            <VscJson />
          </label>
          <input
            id="importFile"
            type="file"
            onChange={handleFileImport}
            accept=".json"
            className="hidden"
          />
          <Divider text={t("or")} />
          <div className="flex flex-col gap-1 px-4 py-2 text-sm cursor-pointer rounded-md animation-all w-full font-normal">
            <label htmlFor="import-json" className="sr-only">
              {t("import")}
            </label>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              name="import-json"
              id="import-json"
              className="bg-zinc-700 hover:bg-zinc-700/80 rounded-md outline-none border-0 p-2"
            ></textarea>
            <button
              type="button"
              onClick={handleFileImportText}
              className="hover:bg-zinc-700 rounded-md animation-all"
            >
              {t("import")}
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => getResumeData(true)}
            type="button"
            className="menu-item"
          >
            {t("jsonExport")}
            <VscJson />
          </button>
          <Divider text={t("or")} />
          <div className="flex flex-col gap-1 px-4 py-2 text-sm cursor-pointer rounded-md animation-all w-full font-normal">
            <label htmlFor="export-json" className="sr-only">
              {t("copy")}
            </label>
            <textarea
              value={stringData}
              name="export-json"
              id="export-json"
              readOnly
              className="bg-zinc-700 hover:bg-zinc-700/80 rounded-md outline-none border-0 p-2"
            ></textarea>
            <button
              type="button"
              onClick={() => getResumeData(false)}
              className="hover:bg-zinc-700 rounded-md animation-all"
            >
              {t("copy")}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default JSONMenu;
