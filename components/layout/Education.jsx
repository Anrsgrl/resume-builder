import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import CustomLink from "@/components/common/CustomLink";
import Editor from "../shared/Editor";
import Button from "../common/Button";
import { useFormattedTime } from "@/utils/helpers";

const Education = () => {
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
    }
  };

  const handleRemoveEducation = (index) => {
    removeEducation(index);
  };

  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        Education
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={newEducation.institution}
          setState={(value) =>
            setNewEducation({ ...newEducation, institution: value })
          }
          name={"institution"}
          label={"Institution*"}
        />
        <Input
          state={newEducation.degree}
          setState={(value) =>
            setNewEducation({ ...newEducation, degree: value })
          }
          name={"degree"}
          label={"Degree*"}
        />
        <Input
          state={newEducation.fieldOfStudy}
          setState={(value) =>
            setNewEducation({ ...newEducation, fieldOfStudy: value })
          }
          name={"fieldOfStudy"}
          label={"Field of Study"}
        />
        <Input
          state={newEducation.city}
          setState={(value) =>
            setNewEducation({ ...newEducation, city: value })
          }
          name={"city"}
          label={"City"}
        />
        <Input
          state={newEducation.startDate}
          setState={(value) =>
            setNewEducation({ ...newEducation, startDate: value })
          }
          type="month"
          name={"startDate"}
          label={"Start Date"}
        />
        <Input
          state={newEducation.endDate}
          setState={(value) =>
            setNewEducation({ ...newEducation, endDate: value })
          }
          type="month"
          present={true}
          name={"endDate"}
          label={"End Date"}
        />
      </div>
      <div className="mt-2">
        <Editor
          state={newEducation.description}
          setState={(value) =>
            setNewEducation({ ...newEducation, description: value })
          }
          label={"Description"}
        />
      </div>
      <Button onClick={handleAddEducation}>Add Education</Button>

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
                  {useFormattedTime(edu.startDate)} -{" "}
                  {useFormattedTime(edu.endDate)}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                ></div>
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Link */}
      <nav className="flex items-center gap-2">
        <CustomLink
          prev={true}
          href={"/build?step=1"}
          shallow={true}
          replace
          animation={true}
        >
          Prev Step
        </CustomLink>
        <CustomLink
          href={"/build?step=3"}
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

export default Education;
