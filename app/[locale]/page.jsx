"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import logo from "@/assets/images/logo.svg";
import HowItWorks from "@/components/layout/HowItWorks";
import { MdArrowRightAlt } from "react-icons/md";
import { BsPatchQuestionFill, BsStarFill } from "react-icons/bs";
import { SiBuymeacoffee, SiGithub } from "react-icons/si";
import CountUp from "react-countup";

export default function Home() {
  const [howModal, setHowModal] = useState(false);
  const t = useTranslations("Home");
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Anrsgrl/resume-builder")
      .then((res) => res.json())
      .then((data) => setGithubStars(data.stargazers_count))
      .catch((err) => console.error("Failed to fetch GitHub stars:", err));
  }, []);
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-8 p-6">
      <Image src={logo} alt="logo" width={300} className="drop-shadow-lg" />
      <h1 className="text-white text-3xl font-bold text-center">
        {t("title")}{" "}
        <span className="font-bold relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-main to-main/80 animate-glow uppercase">
          {t("free")}
        </span>
      </h1>
      <a
        href="https://github.com/Anrsgrl/resume-builder"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white hover:bg-gray-700 hover:bg-gray-600 transition duration-300"
      >
        <SiGithub size={20} />
        <span className="hidden md:block">Star on GitHub</span>

        <span className="flex items-center gap-1 bg-gray-800 text-yellow-400 px-2 py-1 rounded-full text-sm">
          <BsStarFill size={12} />
          {githubStars === null ? (
            "?"
          ) : (
            <CountUp start={0} end={githubStars} duration={2.5} />
          )}
        </span>
      </a>
      <div className="flex items-center flex-col-reverse md:flex-row gap-4">
        <Link
          href="/build?step=1"
          className="w-full flex items-center gap-1 animation-all group overflow-hidden bg-main w-fit p-3 rounded-full font-bold text-white cursor-pointer hover:bg-main/80"
        >
          <MdArrowRightAlt
            size={24}
            className="transform -translate-x-5 animation-all group-hover:translate-x-0 opacity-0 group-hover:opacity-100 group-hover:ml-2"
          />
          <span className="uppercase text-sm animation-all -translate-x-3 group-hover:translate-x-0">
            {t("startButton")}
          </span>
          <MdArrowRightAlt
            size={24}
            className="transform -translate-x-5 animation-all group-hover:translate-x-0 group-hover:opacity-0 opacity-100 ml-2 group-hover:ml-0"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHowModal(true)}
            type="button"
            className="animation-all flex gap-1 whitespace-nowrap items-center justify-center p-3 rounded-full font-bold text-white cursor-help bg-sky-800 hover:bg-sky-800/80 w-fit aspect-square"
          >
            <BsPatchQuestionFill size={20} />
          </button>
          <a
            href="https://buymeacoffee.com/asgarlianar"
            target="_blank"
            className="animation-all flex gap-1 whitespace-nowrap items-center justify-center p-3 rounded-full font-bold text-white cursor-pointer bg-yellow-600 hover:bg-yellow-600/80 w-fit aspect-square"
          >
            <SiBuymeacoffee size={20} />
          </a>
        </div>
      </div>
      <HowItWorks howModal={howModal} setHowModal={setHowModal} />
    </div>
  );
}
