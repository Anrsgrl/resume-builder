import React, { useState } from "react";
import { useTranslations } from "next-intl";
import useStore from "@/store/store";
import Menu from "@/components/shared/settings/Menu";
import Button from "@/components/common/Button";
import { MdSaveAlt } from "react-icons/md";
import MainMenu from "./MainMenu";
import ColorMenu from "./ColorMenu";
import SectionMenu from "./SectionMenu";
import FontMenu from "./FontMenu";
import useTemplateStore from "@/store/template";
import toast from "react-hot-toast";

const TemplateSettings = () => {
  const {
    setFontFamily,
    seth1FontSize,
    seth2FontSize,
    seth3FontSize,
    setTextFontSize,
    setDescriptionFontSize,
    setHyperLinkFontSize,
    setName,
    seth1Color,
    seth2Color,
    seth3Color,
    setTextColor,
    setDescriptionColor,
    setHyperLinkColor,
    setImageSize,
    setProjectLink,
    setSpaceBetween,
    seth2Align,
  } = useTemplateStore();
  const [tabMenu, setTabMenu] = useState("main");
  const { name, surname } = useStore();
  const t = useTranslations("Template");

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = templateName || `${name} ${surname} - CV`;
    window.print();
    document.title = originalTitle;
  };

  const resetFonts = (message) => {
    try {
      setFontFamily("");
      seth1FontSize("");
      seth2FontSize("");
      seth3FontSize("");
      setTextFontSize("");
      setDescriptionFontSize("");
      setHyperLinkFontSize("");
      message && toast.success(t("success"));
    } catch (error) {
      console.error("Error: " + error);
    }
  };
  const resetColors = (message) => {
    try {
      seth1Color("");
      seth2Color("");
      seth3Color("");
      setTextColor("");
      setDescriptionColor("");
      setHyperLinkColor("#0284c7");
      message && toast.success(t("success"));
    } catch (error) {
      console.error("Error: " + error);
    }
  };
  const resetSections = (message) => {
    try {
      setImageSize("");
      setProjectLink("");
      setSpaceBetween("");
      seth2Align("");
      message && toast.success(t("success"));
    } catch (error) {
      console.error("Error: " + error);
    }
  };
  const resetAll = () => {
    try {
      setName("CV");
      resetColors(false);
      resetSections(false);
      resetFonts(false);
      toast.success(t("success"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4 text-center flex items-center justify-center gap-1 print:hidden">
      <Button onClick={handlePrint}>
        <div className="flex items-center gap-1">
          <MdSaveAlt size={20} /> {t("save")}
        </div>
      </Button>
      <Menu label={t("settings")}>
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
    </div>
  );
};

export default TemplateSettings;
