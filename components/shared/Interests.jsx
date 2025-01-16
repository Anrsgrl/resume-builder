import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "../common/Button";
import { MdPlayArrow } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
const Interests = () => {
  const { interests, addInterest, removeInterest } = useStore();

  const [show, setShow] = useState(false);

  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest) {
      addInterest(newInterest);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index) => {
    removeInterest(index);
  };

  return (
    <div className="flex flex-col gap-2 border-b border-dashed border-gray-400">
      <h2
        className="font-bold text-2xl text-main hover:text-main/80 animation-all mb-4 cursor-pointer flex items-center gap-1"
        onClick={() => setShow(!show)}
      >
        Interests
        <MdPlayArrow
          size={18}
          className={`mt-1 animation-all ${show ? "rotate-90" : ""}`}
        />
      </h2>

      {show && (
        <>
          <div className="flex justify-between gap-2 mb-4">
            <Input
              state={newInterest}
              setState={setNewInterest}
              name={"Interests"}
              label={"Add Interests"}
            />
            <Button onClick={handleAddInterest}>
              <FaPlus />
            </Button>
          </div>

          {/* Interests List */}
          <div className="max-h-56 overflow-auto snap-y mb-6">
            {interests.length > 0 && (
              <div className="space-y-4 text-white/80">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="border border-white/50 p-4 rounded-md flex justify-between items-center"
                  >
                    <span className="max-w-32 truncate">{interest}</span>
                    <button
                      onClick={() => handleRemoveInterest(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
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
