"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/assets/images/logo.svg";
import { MdArrowRightAlt, MdKeyboardArrowDown } from "react-icons/md";
import { SiBuymeacoffee } from "react-icons/si";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { FaArrowDown } from "react-icons/fa";

export default function Home() {
  const t = useTranslations("Home");
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 sm:gap-8 p-6 relative">
      <Image
        src={logo}
        alt="logo"
        width={300}
        className="drop-shadow-lg"
        priority
      />
      <h1 className="text-white text-3xl font-bold text-center">
        {t("title")}{" "}
        <span className="font-bold relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-main to-main/80 animate-glow uppercase">
          {t("free")}
        </span>
      </h1>

      <div className="flex items-center flex-col-reverse md:flex-row gap-3 md:gap-4">
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
          <a
            href="https://buymeacoffee.com/asgarlianar"
            target="_blank"
            className="animation-all flex gap-1 whitespace-nowrap items-center justify-center p-3 rounded-full font-bold text-white cursor-pointer bg-yellow-600 hover:bg-yellow-600/80 w-fit aspect-square"
          >
            <SiBuymeacoffee size={20} />
          </a>
          <LanguageSwitcher />
        </div>
      </div>

      <button
        type="button"
        className="flex justify-center items-center absolute bottom-1"
        onClick={scrollToBottom}
      >
        <MdKeyboardArrowDown className="text-white/60 w-8 h-8 animate-bounce" />
      </button>
    </div>
  );
}
