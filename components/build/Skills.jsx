import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import Stepper from "@/components/layout/Stepper";
import { useTranslations } from "next-intl";
import Example from "@/components/shared/Example";
import { handleMoveItem } from "@/utils/helpers";

const Skills = () => {
  const t = useTranslations("Skills");
  const {
    store: { skills },
    addItem,
    editItem,
    removeItem,
    updateOrder,
  } = useStore();

  const [newSkill, setNewSkill] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      if (editedIndex === null) {
        addItem("skills", newSkill);
      } else {
        editItem("skills", editedIndex, newSkill);
        setEditedIndex(null);
      }
      setNewSkill("");
    }
  };

  const handleEditSkill = (index) => {
    setEditedIndex(index);
    setNewSkill(skills[index]);
  };

  const handleCloseEdit = () => {
    setEditedIndex(null);
    setNewSkill("");
  };

  const handleRemoveSkill = (index) => {
    removeItem("skills", index);
  };

  //* Sort functions
  const handleMoveSkillUp = (index) => {
    handleMoveItem(skills, updateOrder, index, "up", "skills");
  };

  const handleMoveSkillDown = (index) => {
    handleMoveItem(skills, updateOrder, index, "down", "skills");
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
          label={t(editedIndex === null ? "add" : "edit")}
        />
        <Button onClick={handleAddSkill}>
          {editedIndex === null ? <FaPlus /> : <FaCheck />}
        </Button>
        {editedIndex !== null && (
          <Button onClick={handleCloseEdit} variant="danger">
            <FaTimes />
          </Button>
        )}
      </div>

      {/* Skills List */}
      <div className="max-h-56 overflow-auto snap-y">
        {skills.length > 0 && (
          <div className="space-y-4 text-white/80">
            {skills.map((skill, index) => (
              <Example
                key={index}
                index={index}
                up={handleMoveSkillUp}
                down={handleMoveSkillDown}
                remove={handleRemoveSkill}
                edit={handleEditSkill}
                title={skill}
                state={skills}
              ></Example>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=4`} next={"/build?step=6"} />
    </div>
  );
};

export default Skills;
