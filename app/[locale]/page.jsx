"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import HowItWorks from "@/components/HowItWorks";
import { MdArrowRightAlt, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { BsPatchQuestionFill } from "react-icons/bs";

export default function Home() {
  const [howModal, setHowModal] = useState(false);
  const t = useTranslations("Home");

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 p-6">
      <Image src={logo} alt="logo" width={300} className="drop-shadow-lg" />
      <h1 className="text-white text-3xl font-bold text-center">
        {t("title")}{" "}
        <span className="text-main font-bold uppercase underline">
          {t("free")}
        </span>
      </h1>
      <div className="flex items-center gap-1 text-main text-base">
        <a
          href={"https://anarr.dev"}
          target="_blank"
          className="underline hover:opacity-90 animation-all"
        >
          anarr.dev
        </a>
        <MdKeyboardArrowRight size={16} />
        <span className="font-bold">Resume Builder</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="w-full flex items-center gap-1 animation-all group overflow-hidden bg-main w-fit p-3 rounded-full font-bold text-white cursor-pointer hover:bg-main/80">
          <MdArrowRightAlt
            size={24}
            className="transform -translate-x-5 animation-all group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
          />
          <Link
            href="/build?step=1"
            className="uppercase text-sm animation-all -translate-x-3 group-hover:translate-x-0"
          >
            {t("startButton")}
          </Link>
          <MdArrowRightAlt
            size={24}
            className="transform -translate-x-5 animation-all group-hover:translate-x-0 group-hover:opacity-0 opacity-100 ml-2"
          />
        </div>
        <button
          onClick={() => setHowModal(true)}
          type="button"
          className="animation-all flex gap-1 whitespace-nowrap items-center justify-center p-3 rounded-full font-bold text-white cursor-help bg-red-400 hover:bg-red-400/80"
        >
          {t("how")}
          <BsPatchQuestionFill size={16} />
        </button>
      </div>
      {howModal && <HowItWorks setHowModal={setHowModal} />}
    </div>
  );
}
