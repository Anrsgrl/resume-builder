import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "../common/Button";
import { useFormattedTime } from "@/utils/helpers";
import { MdPlayArrow } from "react-icons/md";
import Select from "../common/Select";

const Languages = () => {
  const { languages, addLanguage, removeLanguage } = useStore();

  const [show, setShow] = useState(false);

  const [newLanguage, setNewLanguage] = useState({
    title: "",
    level: "",
  });

  const handleAddLanguage = () => {
    if (newLanguage.title && newLanguage.level) {
      addLanguage(newLanguage);
      setNewLanguage({
        title: "",
        level: "",
      });
    }
  };

  const handleRemoveLanguage = (index) => {
    removeLanguage(index);
  };

  const OPTIONS = [
    { value: "elementary", label: "Elementary Proficiency" },
    { value: "limited_working", label: "Limited Working Proficiency" },
    {
      value: "professional_working",
      label: "Professional Working Proficiency",
    },
    { value: "full_professional", label: "Full Professional Proficiency" },
    { value: "native_or_bilingual", label: "Native or Bilingual Proficiency" },
  ];

  return (
    <div className="flex flex-col gap-2 border-b border-dashed border-gray-400">
      <h2
        className="font-bold text-2xl text-main hover:text-main/80 animation-all mb-4 cursor-pointer flex items-center gap-1"
        onClick={() => setShow(!show)}
      >
        Languages
        <MdPlayArrow
          size={18}
          className={`mt-1 animation-all ${show ? "rotate-90" : ""}`}
        />
      </h2>

      {show && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Input
              state={newLanguage.title}
              setState={(value) =>
                setNewLanguage({ ...newLanguage, title: value })
              }
              name="title"
              label="Title*"
            />
            <Select
              options={OPTIONS}
              state={newLanguage.level}
              setState={(value) =>
                setNewLanguage({ ...newLanguage, level: value })
              }
              name="level"
              label="Level*"
            />
          </div>

          <Button onClick={handleAddLanguage}>Add Language</Button>

          {/* List */}
          <div className="my-6">
            {languages.length > 0 && (
              <div className="space-y-4 text-white/80">
                {languages.map((lang, index) => (
                  <details
                    key={index}
                    className="border border-white/50 p-4 rounded-md animation-all"
                  >
                    <summary className="font-bold text-white/80">
                      {lang.title}
                    </summary>
                    <p>{OPTIONS.find((e) => e.value === lang.level).label}</p>
                    <button
                      onClick={() => handleRemoveLanguage(index)}
                      className="text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </details>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Languages;
