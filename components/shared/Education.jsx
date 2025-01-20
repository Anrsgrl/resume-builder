import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import dynamic from "next/dynamic";
import Button from "@/components/common/Button";
import Stepper from "@/components/shared/Stepper";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { handleMoveItem, useFormattedTime } from "@/utils/helpers";
import Example from "@/components/shared/Example";
import { LOCALES } from "@/utils/constants";
import { MdDateRange, MdTextFields } from "react-icons/md";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});

const Education = () => {
  const t = useTranslations("Education");
  const {
    education,
    addEducation,
    editEducation,
    removeEducation,
    updateEducationOrder,
  } = useStore();

  const [newEducation, setNewEducation] = useState({
    institution: "",
    city: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Edit state
  const [editedIndex, setEditedIndex] = useState(null);

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

  const handleEditEducation = () => {
    try {
      editEducation(editedIndex, newEducation);
      toast.success(t("success"));
      setEditedIndex(null);
      setNewEducation({
        institution: "",
        city: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleChooseEducation = (index) => {
    setEditedIndex(index);
    const educationItem = education[index];
    setNewEducation({
      institution: educationItem.institution,
      city: educationItem.city,
      degree: educationItem.degree,
      fieldOfStudy: educationItem.fieldOfStudy,
      startDate: educationItem.startDate,
      endDate: educationItem.endDate,
      description: educationItem.description,
    });
    // Temporary solution
    setTimeout(() => {
      setNewEducation({
        institution: educationItem.institution,
        city: educationItem.city,
        degree: educationItem.degree,
        fieldOfStudy: educationItem.fieldOfStudy,
        startDate: educationItem.startDate,
        endDate: educationItem.endDate,
        description: educationItem.description,
      });
    }, [200]);
  };

  const handleCloseEdit = () => {
    setEditedIndex(null);
    setNewEducation({
      institution: "",
      city: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleRemoveEducation = (index) => {
    removeEducation(index);
  };

  //* Sort functions
  const handleMoveEducationUp = (index) => {
    handleMoveItem(education, updateEducationOrder, index, "up");
  };

  const handleMoveEducationDown = (index) => {
    handleMoveItem(education, updateEducationOrder, index, "down");
  };

  //* ISO
  const locale = useLocale();
  const localeIso = LOCALES.find((lang) => lang.value === locale).iso;

  return (
    <div className="my-14 lg:my-20 px-10 flex flex-col gap-2">
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
          label={t("institution") + "*"}
        />
        <Input
          state={newEducation.degree}
          setState={(value) =>
            setNewEducation({ ...newEducation, degree: value })
          }
          name={"degree"}
          label={t("degree") + "*"}
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
          name={"endDate"}
          label={t("endDate")}
        />
      </div>

      <div className="mt-2">
        <Editor
          editedIndex={editedIndex}
          state={newEducation.description}
          setState={(value) =>
            setNewEducation({ ...newEducation, description: value })
          }
          label={t("description")}
        />
      </div>

      <Button
        onClick={() =>
          editedIndex === null ? handleAddEducation() : handleEditEducation()
        }
      >
        {t(editedIndex !== null ? "edit" : "add")}
      </Button>
      {editedIndex !== null && (
        <Button onClick={() => handleCloseEdit()}>{t("close")}</Button>
      )}

      {/* List */}
      <div className="mt-6">
        {education.length > 0 && (
          <div className="space-y-4 text-white/80">
            {education.map((item, index) => (
              <Example
                key={index}
                index={index}
                remove={handleRemoveEducation}
                edit={handleChooseEducation}
                down={handleMoveEducationDown}
                up={handleMoveEducationUp}
                title={item.institution}
                state={education}
              >
                <p className="flex items-center gap-1">
                  <strong className="text-main">
                    <MdTextFields />
                  </strong>{" "}
                  {item.degree}
                  {` - ${item.fieldOfStudy}`}
                </p>
                <p className="flex items-center gap-1">
                  <strong className="text-main">
                    <MdDateRange />
                  </strong>{" "}
                  {useFormattedTime(item.startDate, localeIso)} -{" "}
                  {item.endDate
                    ? useFormattedTime(item.endDate, localeIso)
                    : t("present")}
                </p>
                <div
                  className="text-left mt-2 text-sm opacity-80"
                  dangerouslySetInnerHTML={{
                    __html:
                      item?.description !== "<p><br></p>"
                        ? item.description
                        : "",
                  }}
                ></div>
              </Example>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=1`} next={"/build?step=3"} />
    </div>
  );
};

export default Education;
