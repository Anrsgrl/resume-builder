"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import Flag from "react-world-flags";
import Modal from "@/components/common/Modal";
import { LOCALES } from "@/utils/constants";
import { Link } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleHtmlLang = (lang) => {
    setTimeout(() => {
      document.documentElement.lang = lang;
    }, [250]);
  };

  const findLocale = (lang) => {
    const locale = LOCALES.find((e) => e.value === lang).label;
    return locale;
  };
  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="p-1 rounded-full shadow-sm hover:shadow-lg shadow-main animation-all aspect-square w-11 h-11"
      >
        <Flag code={findLocale(locale)} width={36} />
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {LOCALES.filter((localeItem) => localeItem.value !== locale).map(
          (localeItem) => (
            <Link
              locale={localeItem.value}
              key={localeItem.value}
              href={localeItem.value}
              onClick={() => handleHtmlLang(localeItem.value)}
              className="py-2 px-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center gap-2 animation-all"
            >
              <Flag code={findLocale(localeItem.value)} width={36} />
              <span className="text-base font-semibold">
                {localeItem.description}
              </span>
            </Link>
          )
        )}
      </Modal>
    </div>
  );
}
