"use client";
import Link from "next/link";
import Image from "next/image";
import { MdArrowRightAlt, MdKeyboardArrowDown } from "react-icons/md";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import logo from "@/assets/images/logo.svg";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/utils/helpers";

const Heading = ({ title, free }) => {
  return (
    <h1 className="text-white text-3xl font-bold text-center">
      {title}
      <span className="font-bold relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-main to-main/80 animate-glow uppercase  ml-2">
        {free}
      </span>
    </h1>
  );
};

const StartButton = ({ text, iconSize }) => {
  return (
    <Link
      href="/build?step=1"
      className="w-full flex items-center gap-1 animation-all group overflow-hidden bg-main/95 w-fit py-3 px-1.5 rounded-full font-bold text-white cursor-pointer hover:bg-main/80"
    >
      <MdArrowRightAlt
        size={iconSize}
        className="transform -translate-x-5 animation-all group-hover:translate-x-0 opacity-0 group-hover:opacity-100 group-hover:ml-2"
      />
      <span className="uppercase text-sm animation-all -translate-x-3 group-hover:translate-x-0 text-white">
        {text}
      </span>
      <MdArrowRightAlt
        size={iconSize}
        className="transform -translate-x-5 animation-all group-hover:translate-x-0 group-hover:opacity-0 opacity-100 ml-2 group-hover:ml-0"
      />
    </Link>
  );
};

const Hero = () => {
  const t = useTranslations("Home");
  return (
    <>
      {" "}
      <Image
        src={logo}
        alt="logo"
        width={300}
        height={300}
        className="drop-shadow-lg"
        priority
      />
      <Heading title={t("title")} free={t("free")} />
      <div className="flex items-center flex-row-reverse gap-3 md:gap-4">
        <StartButton text={t("startButton")} iconSize={24} />
        <LanguageSwitcher />
      </div>
      <button
        type="button"
        className="flex justify-center items-center absolute bottom-1"
        aria-label="scroll-down"
        onClick={() => scrollToSection(document.documentElement.scrollHeight)}
      >
        <MdKeyboardArrowDown className="text-white/60 w-8 h-8 animate-bounce" />
      </button>
    </>
  );
};

export default Hero;
