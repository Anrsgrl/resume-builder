import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Editor from "@/components/shared/Editor";
import Button from "@/components/common/Button";
import { useFormattedTime } from "@/utils/helpers";
import Stepper from "@/components/shared/Stepper";

const Experience = () => {
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
    }
  };

  const handleRemoveExperience = (index) => {
    removeExperience(index);
  };

  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        Experience
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={newExperience.company}
          setState={(value) =>
            setNewExperience({ ...newExperience, company: value })
          }
          name={"company"}
          label={"Company*"}
        />
        <Input
          state={newExperience.jobTitle}
          setState={(value) =>
            setNewExperience({ ...newExperience, jobTitle: value })
          }
          name={"jobTitle"}
          label={"Job Title*"}
        />
        <Input
          state={newExperience.city}
          setState={(value) =>
            setNewExperience({ ...newExperience, city: value })
          }
          name={"city"}
          label={"City"}
        />{" "}
        <Input
          state={newExperience.startDate}
          setState={(value) =>
            setNewExperience({ ...newExperience, startDate: value })
          }
          type="month"
          name={"startDate"}
          label={"Start Date"}
        />
        <Input
          state={newExperience.endDate}
          setState={(value) =>
            setNewExperience({ ...newExperience, endDate: value })
          }
          type="month"
          present={true}
          name={"endDate"}
          label={"End Date"}
        />
      </div>
      <div className="mt-2">
        <Editor
          state={newExperience.description}
          setState={(value) =>
            setNewExperience({ ...newExperience, description: value })
          }
          label={"Description"}
        />
      </div>
      <Button onClick={handleAddExperience}>Add Experience</Button>

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
                  {useFormattedTime(exp.startDate)} -{" "}
                  {useFormattedTime(exp.endDate)}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                ></div>
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
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
