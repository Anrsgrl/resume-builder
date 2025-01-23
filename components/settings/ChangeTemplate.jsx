import React from "react";
import template1 from "@/assets/templates/template1.webp";
import template2 from "@/assets/templates/template2.webp";
import useTemplateStore from "@/store/template";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { MdCancel } from "react-icons/md";
import { useTranslations } from "next-intl";

const ChangeTemplate = ({ open, setOpen }) => {
  const t = useTranslations("Template");
  const { template, setTemplate } = useTemplateStore();
  const TEMPLATES = [template1, template2];

  const handleChooseTemplate = (index) => {
    setTemplate("templateNumber", index + 1);
    toast.success(
      t("templateSuccess", {
        number: index + 1,
      })
    );
    setOpen(false);
  };
  if (!open) return;
  return (
    <div className="grid p-4 overflow-auto fixed left-0 top-0 inset-0 z-[9999] w-full bg-zinc-900/90 backdrop-blur-lg h-lvh flex items-center justify-center">
      <div className="w-full xs:w-3/4 lg:w-2/4 mx-auto p-4 relative border border-2 rounded-md border-zinc-700">
        <Button
          onClick={() => setOpen(false)}
          className=" bg-red-400 text-white border-red-400 hover:bg-red-400/90 absolute right-2 top-2"
          className__children={`flex items-center justify-center gap-1`}
        >
          <MdCancel size={20} />
        </Button>
        <div className="grid grid-cols-1 grid-cols-1 sm:grid-cols-2 items-center gap-4 mt-8">
          {TEMPLATES.map((e, index) => (
            <div
              key={index}
              className="w-fit flex flex-col items-center justify-center"
            >
              <img
                onClick={() => handleChooseTemplate(index)}
                src={e.src}
                alt={`template-${index}`}
                className="w-3/4 object-contain rounded-lg shadow-lg cursor-pointer animation-all hover:scale-95"
              />
              <span className="text-lg font-semibold text-white">{`${t(
                "template"
              )} ${index + 1}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeTemplate;
