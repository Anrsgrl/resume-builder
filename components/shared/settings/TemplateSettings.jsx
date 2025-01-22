import React, { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import useStore from "@/store/store";
import useTemplateStore from "@/store/template";
import Menu from "@/components/shared/settings/Menu";
import Button from "@/components/common/Button";
import MainMenu from "@/components/shared/settings/MainMenu";
import ColorMenu from "@/components/shared/settings/ColorMenu";
import SectionMenu from "@/components/shared/settings/SectionMenu";
import FontMenu from "@/components/shared/settings/FontMenu";
import { MdSaveAlt } from "react-icons/md";
import Settings from "./Settings";
import { FaPaintBrush } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import JSONMenu from "./JSONMenu";

const TemplateSettings = () => {
  const { template, setTemplate } = useTemplateStore();
  const [tabMenu, setTabMenu] = useState("main");
  const [settingTab, setSettingTab] = useState("main");
  const { name, surname } = useStore();
  const t = useTranslations("Template");

  //* Print function
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = template.name || `${name} ${surname} - CV`;
    window.print();
    document.title = originalTitle;
  };

  //* Template reset functions
  const resetFonts = (message) => {
    try {
      setTemplate("fontFamily", "");
      setTemplate("h1FontSize", "");
      setTemplate("h2FontSize", "");
      setTemplate("h3FontSize", "");
      setTemplate("textFontSize", "");
      setTemplate("descriptionFontSize", "");
      setTemplate("hyperLinkFontSize", "");
      message && toast.success(t("success"));
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const resetColors = (message) => {
    try {
      setTemplate("h1Color", "");
      setTemplate("h2Color", "");
      setTemplate("h3Color", "");
      setTemplate("textColor", "");
      setTemplate("descriptionColor", "");
      setTemplate("hyperLinkColor", "#0284c7");
      message && toast.success(t("success"));
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const resetSections = (message) => {
    try {
      setTemplate("imageSize", "");
      setTemplate("projectLink", "");
      setTemplate("spaceBetween", "");
      setTemplate("h2Align", "");
      setTemplate("titleCase", "");
      message && toast.success(t("success"));
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const resetAll = () => {
    try {
      setTemplate("name", "CV");
      resetColors(false);
      resetSections(false);
      resetFonts(false);
      toast.success(t("success"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4 text-center flex flex-col xs:flex-row items-center justify-center gap-1 sticky top-0 lg:left-2/4 print:hidden">
      <Button
        onClick={handlePrint}
        className={`bg-sky-800 border-2 border-sky-700 text-white hover:bg-sky-800/90 block`}
      >
        <div className="flex items-center gap-1">
          {t("save")}
          <MdSaveAlt size={16} />
        </div>
      </Button>
      <div className="flex items-center gap-1">
        <Menu label={t("customize")} icon={<FaPaintBrush size={16} />}>
          {
            {
              main: <MainMenu setTabMenu={setTabMenu} reset={resetAll} />,
              sections: (
                <SectionMenu
                  setTabMenu={setTabMenu}
                  reset={() => resetSections(true)}
                />
              ),
              colors: (
                <ColorMenu
                  setTabMenu={setTabMenu}
                  reset={() => resetColors(true)}
                />
              ),
              fonts: (
                <FontMenu
                  setTabMenu={setTabMenu}
                  reset={() => resetFonts(true)}
                />
              ),
            }[tabMenu || "main"]
          }
        </Menu>
        <Menu label={t("settings")} icon={<RiSettings3Fill size={16} />}>
          {
            {
              main: <Settings setSettingTab={setSettingTab} />,
              import: (
                <JSONMenu setSettingTab={setSettingTab} action="import" />
              ),
              export: (
                <JSONMenu setSettingTab={setSettingTab} action="export" />
              ),
            }[settingTab || "main"]
          }
        </Menu>
      </div>
    </div>
  );
};

export default TemplateSettings;
