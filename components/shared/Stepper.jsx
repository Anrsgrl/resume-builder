import React, { useState } from "react";
import CustomLink from "@/components/common/CustomLink";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import Modal from "../common/Modal";
const Stepper = ({ prev, next, prevTitle, nextTitle }) => {
  const [modal, setModal] = useState(false);
  const STEPS = [
    { value: 1, label: "Personal Informations" },
    { value: 2, label: "Education" },
    { value: 3, label: "Experience" },
    { value: 4, label: "Skills" },
    { value: 5, label: "Projects" },
    { value: 6, label: "Additional Informations" },
  ];
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <nav className="flex items-center gap-2">
      {prev && (
        <CustomLink
          prev={true}
          href={prev}
          shallow={true}
          replace
          animation={true}
        >
          {prevTitle ? prevTitle : "Prev Step"}
        </CustomLink>
      )}
      <button
        onClick={toggleModal}
        type="button"
        className="bg-main hover:bg-main/90 animation-all p-1 rounded-full text-white"
      >
        <PiDotsThreeOutlineFill />
      </button>
      <Modal isOpen={modal} onClose={toggleModal}>
        <CustomLink full={true} animation={true} href={`/`}>
          Home
        </CustomLink>
        {STEPS.map((step, index) => (
          <CustomLink
            full={true}
            animation={true}
            key={index}
            href={`/build?step=${step.value}`}
          >
            {step.label}
          </CustomLink>
        ))}
      </Modal>
      {next && (
        <CustomLink href={next} shallow={true} replace animation={true}>
          {nextTitle ? nextTitle : "Next Step"}
        </CustomLink>
      )}
    </nav>
  );
};

export default Stepper;
