import { useCallback, useEffect, useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Example from "@/components/shared/Example";
import { handleMoveItem } from "@/utils/helpers";
import { MdPlayArrow } from "react-icons/md";

const Interests = () => {
  const t = useTranslations("Interests");
  const {
    store: { interests },
    addItem,
    editItem,
    removeItem,
    updateOrder,
  } = useStore();
  const [newInterests, setNewInterests] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleAddInterests = () => {
    if (newInterests.trim() !== "") {
      if (editedIndex === null) {
        addItem("interests", newInterests);
      } else {
        editItem("interests", editedIndex, newInterests);
        setEditedIndex(null);
      }
      setNewInterests("");
    }
  };

  const handleEditInterests = (index) => {
    setEditedIndex(index);
    setNewInterests(interests[index]);
  };

  const handleCloseEdit = () => {
    setEditedIndex(null);
    setNewInterests("");
  };

  const handleRemoveInterests = (index) => {
    removeItem("interests", index);
  };

  //* Sort functions
  const handleMoveInterestsUp = (index) => {
    handleMoveItem(interests, updateOrder, index, "up", "interests");
  };

  const handleMoveInterestsDown = (index) => {
    handleMoveItem(interests, updateOrder, index, "down", "interests");
  };

  //* Shortcuts
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && newInterests.trim() !== "") {
        handleAddInterests();
      }
    },
    [newInterests, handleAddInterests]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col gap-2 border-b border-dashed border-gray-400">
      <h2
        className="font-bold text-xl text-main hover:text-main/80 animation-all mb-4 cursor-pointer flex items-center gap-1"
        onClick={() => setShow(!show)}
      >
        {t("title")}
        <MdPlayArrow
          size={18}
          className={`mt-1 animation-all ${show ? "rotate-90" : ""}`}
        />
      </h2>
      {show && (
        <>
          <div className="flex justify-between gap-2 mb-4">
            <Input
              state={newInterests}
              setState={setNewInterests}
              name={"interests"}
              label={t(editedIndex === null ? "add" : "edit")}
            />
            <Button onClick={handleAddInterests}>
              {editedIndex === null ? <FaPlus /> : <FaCheck />}
            </Button>
            {editedIndex !== null && (
              <Button onClick={handleCloseEdit} variant="danger">
                <FaTimes />
              </Button>
            )}
          </div>

          <div className="max-h-56 overflow-auto snap-y mb-6">
            {interests.length > 0 && (
              <div className="space-y-4 text-white/80">
                {interests.map((interests, index) => (
                  <Example
                    key={index}
                    index={index}
                    up={handleMoveInterestsUp}
                    down={handleMoveInterestsDown}
                    remove={handleRemoveInterests}
                    edit={handleEditInterests}
                    title={interests}
                    state={interests}
                    cursor={false}
                  ></Example>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Interests;
