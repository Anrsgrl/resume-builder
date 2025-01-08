import { useTranslations } from "next-intl";
import {
  BsFillQuestionOctagonFill,
  BsPencilFill,
  BsPaperclip,
  BsDownload,
} from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
const HowItWorks = ({ setHowModal }) => {
  const t = useTranslations("How");
  return (
    <div
      onClick={() => setHowModal(false)}
      className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center relative"
      >
        <button
          onClick={() => setHowModal(false)}
          type="button"
          className="absolute top-0 right-0 hover:rotate-90 animation-all"
        >
          <IoCloseCircleSharp size={36} className="text-red-400" />
        </button>
        <div className="flex flex-col items-center justify-center gap-2 my-1 text-emerald-700 mb-4">
          <BsFillQuestionOctagonFill size={36} />
          <h2 className="text-xl font-semibold">{t("how")}</h2>
        </div>
        <ol className="text-gray-700 text-left space-y-2 px-4">
          <li>
            <span className="font-semibold flex items-center gap-2 my-1 text-emerald-800 hover:text-emerald-600 animation-all cursor-help">
              <BsPencilFill size={12} />
              {t("step1")}:
            </span>{" "}
            {t("step1text")}
          </li>
          <li className="flex flex-col justify-end">
            <span className="font-semibold flex items-center gap-2 my-1 text-emerald-800 hover:text-emerald-600 animation-all cursor-help">
              <BsPaperclip size={16} /> {t("step2")}:
            </span>{" "}
            {t("step2text")}
          </li>
          <li>
            <span className="font-semibold flex items-center gap-2 my-1 text-emerald-800 hover:text-emerald-600 animation-all cursor-help">
              <BsDownload size={16} /> {t("step3")}:
            </span>{" "}
            {t("step3text")}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowItWorks;
