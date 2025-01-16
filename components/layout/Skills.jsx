import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "../common/Button";
import CustomLink from "@/components/common/CustomLink";
import { FaPlus } from "react-icons/fa";
const Skills = () => {
  const { skills, addSkill, removeSkill } = useStore();

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill) {
      addSkill(newSkill);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    removeSkill(index);
  };

  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">Skills</h1>
      <div className="flex justify-between gap-2 mb-4">
        <Input
          state={newSkill}
          setState={setNewSkill}
          name={"skill"}
          label={"Add Skill"}
        />
        <Button onClick={handleAddSkill}>
          <FaPlus />
        </Button>
      </div>

      {/* Skills List */}
      <div className="mt-6 max-h-56 overflow-auto snap-y">
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
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Link */}
      <nav className="flex items-center gap-2 mt-4">
        <CustomLink
          prev={true}
          href={"/build?step=3"}
          shallow={true}
          replace
          animation={true}
        >
          Prev Step
        </CustomLink>
        <CustomLink
          href={"/build?step=5"}
          shallow={true}
          replace
          animation={true}
        >
          Next Step
        </CustomLink>
      </nav>
    </div>
  );
};

export default Skills;
