import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});
import Button from "@/components/common/Button";
import { useFormattedTime } from "@/utils/helpers";
import Stepper from "@/components/shared/Stepper";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES } from "@/utils/constants";

const Education = () => {
  const t = useTranslations("Education");
  const { education, addEducation, removeEducation } = useStore();

  const [newEducation, setNewEducation] = useState({
    institution: "",
    city: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        institution: "",
        city: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      toast.error(t("error"));
    }
  };

  const handleRemoveEducation = (index) => {
    removeEducation(index);
  };

  const locale = useLocale();
  const localeIso = LOCALES.find((lang) => lang.value === locale).iso;

  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={newEducation.institution}
          setState={(value) =>
            setNewEducation({ ...newEducation, institution: value })
          }
          name={"institution"}
          label={t("institution")}
        />
        <Input
          state={newEducation.degree}
          setState={(value) =>
            setNewEducation({ ...newEducation, degree: value })
          }
          name={"degree"}
          label={t("degree")}
        />
        <Input
          state={newEducation.fieldOfStudy}
          setState={(value) =>
            setNewEducation({ ...newEducation, fieldOfStudy: value })
          }
          name={"fieldOfStudy"}
          label={t("field")}
        />
        <Input
          state={newEducation.city}
          setState={(value) =>
            setNewEducation({ ...newEducation, city: value })
          }
          name={"city"}
          label={t("city")}
        />
        <Input
          state={newEducation.startDate}
          setState={(value) =>
            setNewEducation({ ...newEducation, startDate: value })
          }
          type="month"
          name={"startDate"}
          label={t("startDate")}
        />
        <Input
          state={newEducation.endDate}
          setState={(value) =>
            setNewEducation({ ...newEducation, endDate: value })
          }
          type="month"
          present={true}
          name={"endDate"}
          label={t("endDate")}
        />
      </div>
      <div className="mt-2">
        <Editor
          state={newEducation.description}
          setState={(value) =>
            setNewEducation({ ...newEducation, description: value })
          }
          label={t("description")}
        />
      </div>
      <Button onClick={handleAddEducation}>{t("add")}</Button>

      {/* List */}
      <div className="mt-6">
        {education.length > 0 && (
          <div className="space-y-4 text-white/80">
            {education.map((edu, index) => (
              <details
                key={index}
                className="border border-white/50 p-4 rounded-md animation-all"
              >
                <summary className="font-bold text-white/80">
                  {edu.institution} - {edu.degree}
                </summary>
                <p>{edu.fieldOfStudy}</p>
                <p>
                  {useFormattedTime(edu.startDate, localeIso)} -{" "}
                  {useFormattedTime(edu.endDate, localeIso)}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                ></div>
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="text-red-500 mt-2"
                >
                  {t("remove")}
                </button>
              </details>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=1`} next={"/build?step=3"} />
    </div>
  );
};

export default Education;
