"use client";
import { useTranslations } from "next-intl";
import StarOnGithub from "@/components/layout/StarOnGithub";

const Link = ({ label, url }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      className="hover:underline"
    >
      {label}
    </a>
  );
};

export default function Footer() {
  const t = useTranslations("Footer");

  //* Copyright (c)
  const translatedCopyright = t("copyright", {
    year: new Date().getFullYear(),
  });

  //* Links
  const LINKS = [
    {
      label: t("codeOfConduct"),
      url: "https://github.com/Anrsgrl/resume-builder/blob/main/CODE_OF_CONDUCT.md",
    },
    {
      label: t("contributing"),
      url: "https://github.com/Anrsgrl/resume-builder/blob/main/CONTRIBUTING.md",
    },
    {
      label: t("security"),
      url: "https://github.com/Anrsgrl/resume-builder/blob/main/SECURITY.md",
    },
  ];

  return (
    <footer className="w-full bg-zinc-950 border-t border-main text-white py-6 text-center print:hidden">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <StarOnGithub label={t("starOnGitHub")} />
        <div className="flex flex-wrap justify-center gap-4 text-sm px-2">
          {LINKS.map((link, index) => (
            <Link key={index} label={link.label} url={link.url} />
          ))}
        </div>

        <p className="text-xs text-gray-400">{translatedCopyright}</p>
      </div>
    </footer>
  );
}
