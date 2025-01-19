import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";
import Stepper from "@/components/shared/Stepper";
import { useTranslations } from "next-intl";
const Skills = () => {
  const t = useTranslations("Skills");
  const { skills, addSkill, removeSkill } = useStore();

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      addSkill(newSkill);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    removeSkill(index);
  };

  return (
    <div className="my-14 lg:my-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        {t("title")}
      </h1>
      <div className="flex justify-between gap-2 mb-4">
        <Input
          state={newSkill}
          setState={setNewSkill}
          name={"skill"}
          label={t("add")}
        />
        <Button onClick={handleAddSkill}>
          <FaPlus />
        </Button>
      </div>

      {/* Skills List */}
      <div className="max-h-56 overflow-auto snap-y">
        {skills.length > 0 && (
          <div className="space-y-4 text-white/80">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="border border-white/50 p-4 rounded-md flex justify-between items-center"
              >
                <span className="max-w-32 truncate">{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500"
                >
                  {t("remove")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=3`} next={"/build?step=5"} />
    </div>
  );
};

export default Skills;
