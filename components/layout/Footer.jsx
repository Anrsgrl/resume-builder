"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { BsStarFill } from "react-icons/bs";
import { SiGithub } from "react-icons/si";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Anrsgrl/resume-builder")
      .then((res) => res.json())
      .then((data) => setGithubStars(data.stargazers_count))
      .catch((err) => console.error("Failed to fetch GitHub stars:", err));
  }, []);

  const translatedCopyright = t("copyright", {
    year: new Date().getFullYear(),
  });
  return (
    <footer className="w-full bg-back border-t border-main text-white py-6 text-center">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <a
          href="https://github.com/Anrsgrl/resume-builder"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white hover:bg-gray-700 hover:bg-gray-600 transition duration-300"
        >
          <SiGithub size={20} />
          <span>{t("starOnGitHub")}</span>

          <span className="flex items-center gap-1 bg-gray-800 text-yellow-400 px-2 py-1 rounded-full text-sm">
            <BsStarFill size={12} />
            {githubStars === null ? (
              "?"
            ) : (
              <CountUp start={0} end={githubStars} duration={2.5} />
            )}
          </span>
        </a>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Anrsgrl/resume-builder/blob/main/CODE_OF_CONDUCT.md"
            className="hover:underline"
          >
            {t("codeOfConduct")}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Anrsgrl/resume-builder/blob/main/CONTRIBUTING.md"
            className="hover:underline"
          >
            {t("contributing")}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Anrsgrl/resume-builder/blob/main/SECURITY.md"
            className="hover:underline"
          >
            {t("security")}
          </a>
        </div>

        <p className="text-xs text-gray-400">{translatedCopyright}</p>
      </div>
    </footer>
  );
}
