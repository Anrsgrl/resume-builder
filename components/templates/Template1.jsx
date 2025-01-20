import React from "react";
import { useFormattedTime } from "@/utils/helpers";
import {
  LANGUAGE_OPTIONS,
  LANGUAGE_OPTIONS_AZ,
  LOCALES,
  SOCIALS,
} from "@/utils/constants";
import useStore from "@/store/store";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";
import useTemplateStore from "@/store/template";

const Section = ({ id, title, children, headingColor }) => {
  return (
    <section
      id={id}
      className={`flex items-center justify-center flex-col gap-2 text-center w-full px-8 mt-4`}
    >
      <h2
        style={{ color: headingColor }}
        className={`pb-1 border-b-2 font-bold uppercase w-full text-sm xs:text-base text-center`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
};

const Description = ({ state }) => {
  if (state === "<p><br></p>") return;
  return (
    <p
      dangerouslySetInnerHTML={{ __html: state }}
      className="text-left mt-2 text-xs xs:text-sm opacity-80"
    ></p>
  );
};

const Template1 = ({}) => {
  const {
    image,
    name,
    surname,
    email,
    phone,
    country,
    city,
    summary,
    socialLinks,
    experience,
    education,
    skills,
    projects,
    certificates,
    references,
    languages,
    interests,
  } = useStore();
  const {
    sectionHeadingColor,
    headingColor,
    hyperlinkColor,
    projectLink,
    fontFamily,
  } = useTemplateStore();
  const t = useTranslations();
  const locale = useLocale();
  const LANG_OPTIONS = locale === "en" ? LANGUAGE_OPTIONS : LANGUAGE_OPTIONS_AZ;

  const localeIso = React.useMemo(
    () => LOCALES.find((lang) => lang.value === locale)?.iso || "en-US",
    [locale]
  );

  const uiSans = `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji`;

  const settingsDefault = {
    sectionHeadingColor:
      sectionHeadingColor === "" ? "#000000" : sectionHeadingColor,
    headingColor: headingColor === "" ? "#000000" : headingColor,
    hyperlinkColor: hyperlinkColor === "" ? "#0284c7" : hyperlinkColor,
    projectLink: projectLink === "" ? "" : projectLink,
    fontFamily: fontFamily === "" ? uiSans : fontFamily,
  };

  return (
    <div
      style={{
        fontFamily: settingsDefault.fontFamily,
      }}
      className="w-[240mm] min-h-[296mm] print:min-h-[296mm] bg-white my-0 mx-auto p-2 rounded overflow-x-hidden overflow-y-visible"
    >
      <div className="flex flex-col items-center justify-between w-full text-center">
        {image && (
          <Image
            src={image}
            height={80}
            width={80}
            alt={t("Personal.title")}
            className="rounded-full"
          />
        )}
        <h1 className="text-base xs:text-lg whitespace-nowrap w-full uppercase font-bold">
          {name} {surname}
        </h1>
        <p className="text-xs xs:text-sm">
          {city && city}
          {country && `${city && ", "} ${country}`}
          {email && (
            <>
              {(city || country) && " • "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${email}`}
                style={{ color: settingsDefault.hyperlinkColor }}
              >
                {email}
              </a>
            </>
          )}
          {phone && (
            <>
              {(city || country || email) && " • "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`tel:${phone}`}
                style={{ color: settingsDefault.hyperlinkColor }}
              >
                {phone}
              </a>
            </>
          )}
        </p>
      </div>
      {summary !== "" && (
        <Section
          id="summary"
          title={t("Personal.summary")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          <p
            dangerouslySetInnerHTML={{ __html: summary }}
            className="text-xs xs:text-sm"
          ></p>
        </Section>
      )}
      {Object.values(socialLinks || {}).some((link) => link) && (
        <Section
          id="socials"
          title={t("Social.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          <div className="flex items-center justify-center flex-wrap gap-4">
            {Object.keys(socialLinks).map((key) => {
              const social = SOCIALS.find((e) => e.name.toLowerCase() === key);
              if (social && socialLinks[key]) {
                const rawPart = socialLinks[key];
                const url =
                  rawPart.startsWith("http://") ||
                  rawPart.startsWith("https://")
                    ? rawPart
                    : `https://${rawPart}`;
                const username = url
                  .replace(
                    /^https?:\/\/(?:www\.)?(?:linkedin\.com\/in\/|github\.com\/|twitter\.com\/|facebook\.com\/|instagram\.com\/|xing\.com\/|medium\.com\/)(.*)$/,
                    "$1"
                  )
                  .replace(/^(https?:\/\/)?(www\.)?/, "")
                  .replace(/\/$/, "");

                return (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={key}
                    className="flex items-center gap-1"
                  >
                    <span
                      style={{
                        color: !settingsDefault.hyperlinkColor
                          ? "#0ea5e9"
                          : settingsDefault.hyperlinkColor,
                      }}
                    >
                      {social.logo}
                    </span>
                    <span className="text-xs xs:text-sm">{username}</span>
                  </a>
                );
              }
              return null;
            })}
          </div>
        </Section>
      )}
      {experience?.length > 0 && (
        <Section
          id="experience"
          title={t("Experience.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          {experience.map((exp, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: settingsDefault.headingColor }}
                >
                  {exp.jobTitle}
                </h3>
                <p className="text-xs xs:text-sm">
                  {useFormattedTime(exp.startDate, localeIso)} -{" "}
                  {exp.endDate
                    ? useFormattedTime(exp.endDate, localeIso)
                    : t("General.present")}
                </p>
              </div>
              <h4 className="font-normal me-auto">
                {exp.company}, {exp.city}
              </h4>
              <Description state={exp.description} />
            </div>
          ))}
        </Section>
      )}
      {education?.length > 0 && (
        <Section
          id="education"
          title={t("Education.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          {education.map((edu, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: settingsDefault.headingColor }}
                >
                  {edu.degree} {locale === "en" ? "of" : "-"} {edu.fieldOfStudy}
                </h3>
                <p className="text-xs xs:text-sm">
                  {useFormattedTime(edu.startDate, localeIso)} -{" "}
                  {edu.endDate
                    ? useFormattedTime(edu.endDate, localeIso)
                    : t("General.present")}
                </p>
              </div>
              <h4 className="font-normal me-auto">
                {edu.institution}, {edu.city}
              </h4>
              <Description state={edu.description} />
            </div>
          ))}
        </Section>
      )}
      {skills?.length > 0 && (
        <Section
          id="skills"
          title={t("Skills.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          <p className="text-center">{skills.join(", ")}</p>
        </Section>
      )}
      {projects?.length > 0 && (
        <Section
          id="projects"
          title={t("Projects.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          <div className="flex flex-col gap-4 w-full">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <h3
                    className="font-semibold"
                    style={{ color: settingsDefault.headingColor }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    {project.liveLink && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://${project.liveLink?.replace(
                          "https://",
                          ""
                        )}`}
                        style={{ color: settingsDefault.hyperlinkColor }}
                      >
                        {settingsDefault.projectLink === "icon" ? (
                          <MdArrowOutward />
                        ) : (
                          t("Projects.live")
                        )}
                      </a>
                    )}
                    {project.liveLink && project.githubLink && (
                      <span className="mx-2 opacity-75">|</span>
                    )}
                    {project.githubLink && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://${project.githubLink?.replace(
                          "https://",
                          ""
                        )}`}
                        style={{ color: settingsDefault.hyperlinkColor }}
                      >
                        {settingsDefault.projectLink === "icon" ? (
                          <SiGithub />
                        ) : (
                          t("Projects.github")
                        )}
                      </a>
                    )}
                  </div>
                </div>
                {project?.technologies?.length > 0 && (
                  <div className="font-normal me-auto">
                    <h3 className="mr-1 float-left font-normal">
                      {t("Projects.tech")}:
                    </h3>{" "}
                    {project.technologies.join(", ")}
                  </div>
                )}
                <Description state={project.description} />
              </div>
            ))}
          </div>
        </Section>
      )}
      {certificates?.length > 0 && (
        <Section
          id="certificates"
          title={t("Certificates.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          {certificates.map((certificate, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: settingsDefault.headingColor }}
                >
                  {certificate.title}
                </h3>
                <p className="text-xs xs:text-sm">
                  {useFormattedTime(certificate.date, localeIso)}
                </p>
              </div>
              <Description state={certificate.description} />
            </div>
          ))}
        </Section>
      )}
      {references?.length > 0 && (
        <Section
          id="references"
          title={t("References.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          {references.map((ref, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: settingsDefault.headingColor }}
                >
                  {ref.name} - {ref.company}
                </h3>
                <div className="flex items-center text-xs xs:text-sm">
                  {ref.email && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`mailto:${ref.email}`}
                      className="text-sky-600"
                    >
                      {ref.email}
                    </a>
                  )}
                  {ref.email && ref.phone && (
                    <span className="mx-2 font-light">|</span>
                  )}
                  {ref.phone && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`tel:${ref.phone}`}
                      className="text-sky-600"
                    >
                      {ref.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}
      {languages?.length > 0 && (
        <Section
          id="languages"
          title={t("Languages.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          {languages.map((lang, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: settingsDefault.headingColor }}
                >
                  {lang.language}
                </h3>
                <p className="text-xs xs:text-sm">
                  {LANG_OPTIONS.find((e) => e.value === lang.level).label}
                </p>
              </div>
            </div>
          ))}
        </Section>
      )}
      {interests?.length > 0 && (
        <Section
          id="interests"
          title={t("Interests.title")}
          headingColor={settingsDefault.sectionHeadingColor}
        >
          <p>{interests.join(", ")}</p>
        </Section>
      )}
    </div>
  );
};

export default Template1;
