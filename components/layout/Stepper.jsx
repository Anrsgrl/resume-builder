import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CustomLink from "@/components/common/CustomLink";
import Modal from "@/components/shared/Modal";
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
    { value: 7, label: t("7") },
  ];
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <nav className="flex items-center gap-2 mt-2">
      {prev && (
        <CustomLink
          prev={true}
          className__children="hidden xs:block translate-x-4 group-hover:translate-x-0"
          className__animation="xs:translate-x-5  group-hover:xs:translate-x-0 xs:opacity-0"
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
        <CustomLink
          className__children="-translate-x-3 group-hover:translate-x-0"
          className__animation="-translate-x-5  group-hover:translate-x-0 opacity-0"
          animation={true}
          href={`/`}
        >
          {t("8")}
        </CustomLink>
        {STEPS.map((step, index) => (
          <CustomLink
            className__children="-translate-x-3 group-hover:translate-x-0"
            className__animation="-translate-x-5  group-hover:translate-x-0 opacity-0"
            animation={true}
            key={index}
            href={`/build?step=${step.value}`}
          >
            {step.label}
          </CustomLink>
        ))}
      </Modal>
      {next && (
        <CustomLink
          className__children="hidden xs:block -translate-x-3 group-hover:translate-x-0"
          className__animation="xs:-translate-x-5  group-hover:xs:translate-x-0 xs:opacity-0"
          href={next}
          shallow={true}
          replace
          animation={true}
        >
          {nextTitle ? nextTitle : t("next")}
        </CustomLink>
      )}
    </nav>
  );
};

export default Stepper;
