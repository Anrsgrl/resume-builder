import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CustomLink from "@/components/common/CustomLink";
import Modal from "@/components/common/Modal";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const Stepper = ({ prev, next, prevTitle, nextTitle }) => {
  const t = useTranslations("Steps");
  const [modal, setModal] = useState(false);
  const STEPS = [
    { value: 1, label: t("1") },
    { value: 2, label: t("2") },
    { value: 3, label: t("3") },
    { value: 4, label: t("4") },
    { value: 5, label: t("5") },
    { value: 6, label: t("6") },
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
          {prevTitle ? prevTitle : t("prev")}
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
        <CustomLink closeXs={true} full={true} animation={true} href={`/`}>
          {t("7")}
        </CustomLink>
        {STEPS.map((step, index) => (
          <CustomLink
            closeXs={true}
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
          {nextTitle ? nextTitle : t("next")}
        </CustomLink>
      )}
    </nav>
  );
};

export default Stepper;
