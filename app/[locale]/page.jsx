import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";
import HowItWorks from "@/components/HowItWorks";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-emerald-900 h-screen flex flex-col items-center justify-center gap-8 p-6">
      <Image src={logo} alt="logo" width={300} className="drop-shadow-lg" />
      <h1 className="text-white text-3xl font-bold text-center">
        {t("title")}
      </h1>
      <div className="w-full flex items-center gap-1 animation-all group overflow-hidden bg-emerald-400 w-fit p-3 rounded-full font-bold text-white cursor-pointer hover:bg-emerald-500/80">
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
      </div>
      <HowItWorks />
    </div>
  );
}
