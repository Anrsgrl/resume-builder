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
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { LOCALES } from "@/utils/constants";

const Experience = () => {
  const t = useTranslations("Experience");
  const { experience, addExperience, removeExperience } = useStore();

  const [newExperience, setNewExperience] = useState({
    company: "",
    jobTitle: "",
    city: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.jobTitle) {
      addExperience(newExperience);
      setNewExperience({
        company: "",
        jobTitle: "",
        city: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      toast.error(t("error"));
    }
  };

  const handleRemoveExperience = (index) => {
    removeExperience(index);
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
          state={newExperience.company}
          setState={(value) =>
            setNewExperience({ ...newExperience, company: value })
          }
          name={"company"}
          label={t("company") + "*"}
        />
        <Input
          state={newExperience.jobTitle}
          setState={(value) =>
            setNewExperience({ ...newExperience, jobTitle: value })
          }
          name={"jobTitle"}
          label={t("jobtitle") + "*"}
        />
        <Input
          state={newExperience.city}
          setState={(value) =>
            setNewExperience({ ...newExperience, city: value })
          }
          col={true}
          name={"city"}
          label={t("city")}
        />{" "}
        <Input
          state={newExperience.startDate}
          setState={(value) =>
            setNewExperience({ ...newExperience, startDate: value })
          }
          type="month"
          name={"startDate"}
          label={t("startDate")}
        />
        <Input
          state={newExperience.endDate}
          setState={(value) =>
            setNewExperience({ ...newExperience, endDate: value })
          }
          type="month"
          present={true}
          name={"endDate"}
          label={t("endDate")}
        />
      </div>
      <div className="mt-2">
        <Editor
          state={newExperience.description}
          setState={(value) =>
            setNewExperience({ ...newExperience, description: value })
          }
          label={t("description")}
        />
      </div>
      <Button onClick={handleAddExperience}>{t("add")}</Button>

      {/* List */}
      <div className="mt-6">
        {experience.length > 0 && (
          <div className="space-y-4 text-white/80">
            {experience.map((exp, index) => (
              <details
                key={index}
                className="border border-white/50 p-4 rounded-md animation-all"
              >
                <summary className="font-bold text-white/80">
                  {exp.company} - {exp.jobTitle}
                </summary>
                <p>{exp.city}</p>
                <p>
                  {useFormattedTime(exp.startDate, localeIso)} -{" "}
                  {useFormattedTime(exp.endDate, localeIso)}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                ></div>
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-500 mt-2"
                >
                  {t("remove")}
                </button>
              </details>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=2`} next={"/build?step=4"} />
    </div>
  );
};

export default Experience;
