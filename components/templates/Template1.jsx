import React from "react";
import { cn, useFormattedTime } from "@/utils/helpers";
import {
  LANGUAGE_OPTIONS,
  LANGUAGE_OPTIONS_AZ,
  LOCALES,
  SOCIALS,
  uiSans,
} from "@/utils/constants";
import useStore from "@/store/store";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";
import useTemplateStore from "@/store/template";

const Section = ({
  id,
  title,
  children,
  color,
  align,
  size,
  titleCase,
  space,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "flex items-center justify-center flex-col gap-2 text-center w-full px-8",
        space
      )}
    >
      <h2
        style={{ color: color }}
        className={cn(
          "pb-1 border-b-2 font-bold w-full",
          size,
          align,
          titleCase
        )}
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

const handleFindStyle = (state, x, y, z) => {
  const xOptions = ["small", "left", "lower", "less"];
  const yOptions = ["large", "right", "normal", "more"];
  if (xOptions.includes(state)) {
    return x;
  } else if (yOptions.includes(state)) {
    return y;
  } else {
    return z;
  }
};

const Template1 = ({}) => {
  const { store } = useStore();
  const { template } = useTemplateStore();
  const t = useTranslations();
  const locale = useLocale();
  const LANG_OPTIONS = locale === "en" ? LANGUAGE_OPTIONS : LANGUAGE_OPTIONS_AZ;

  const localeIso = React.useMemo(
    () => LOCALES.find((lang) => lang.value === locale)?.iso || "en-US",
    [locale]
  );

  //* Colors
  const colorSettingsDefault = {
    h1Color: template.h1Color === "" ? "#000000" : template.h1Color,
    h2Color: template.h2Color === "" ? "#000000" : template.h2Color,
    h3Color: template.h3Color === "" ? "#0284c7" : template.h3Color,
    textColor: template.textColor === "" ? "" : template.textColor,
    descriptionColor:
      template.descriptionColor === "" ? "" : template.descriptionColor,
    hyperLinkColor:
      template.hyperLinkColor === "" ? "" : template.hyperLinkColor,
  };

  //* ↓ - ↑ - default - Fonts
  const fontSettingsDefault = {
    fontFamily: template.fontFamily === "" ? uiSans : template.fontFamily,
    h1FontSize: handleFindStyle(
      template.h1FontSize,
      "text-sm xs:text-base",
      "text-lg xs:text-xl",
      "text-base xs:text-lg"
    ),
    h2FontSize: handleFindStyle(
      template.h2FontSize,
      "text-xs xs:text-sm",
      "text-base xs:text-lg",
      "text-sm xs:text-base"
    ),
  };

  //* ↓ - ↑ - default - Sections
  const sectionSettingsDefault = {
    imageSize: template.imageSize === "" ? 80 : template.imageSize,
    spaceBetween: handleFindStyle(
      template.spaceBetween,
      "mt-2",
      "mt-6",
      "mt-4"
    ),
    h2Align: handleFindStyle(
      template.h2Align,
      "text-left",
      "text-right",
      "text-center"
    ),
    titleCase: handleFindStyle(
      template.titleCase,
      "lowercase",
      "normal-case",
      "uppercase"
    ),
    projectLink: template.projectLink,
  };

  return (
    <div
      style={{
        fontFamily: fontSettingsDefault.fontFamily,
      }}
      className="w-[240mm] min-h-[296mm] print:min-h-[296mm] bg-white my-0 mx-auto p-2 rounded overflow-x-hidden overflow-y-visible"
    >
      <div className="flex flex-col items-center justify-between w-full text-center">
        {store.image && (
          <Image
            src={store.image}
            height={sectionSettingsDefault.imageSize}
            width={sectionSettingsDefault.imageSize}
            alt={t("Personal.title")}
            className="rounded-full"
          />
        )}
        <h1
          style={{ color: colorSettingsDefault.h1Color }}
          className={cn(
            "whitespace-nowrap w-full uppercase font-bold",
            fontSettingsDefault.h1FontSize
          )}
        >
          {store.general.name} {store.general.surname}
        </h1>
        <p className="text-xs xs:text-sm">
          {store.general.city && store.general.city}
          {store.general.country &&
            `${store.general.city && ", "} ${store.general.country}`}
          {store.general.email && (
            <>
              {(store.general.city || store.general.country) && " • "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${store.general.email}`}
                style={{ color: colorSettingsDefault.hyperLinkColor }}
              >
                {store.general.email}
              </a>
            </>
          )}
          {store.general.phone && (
            <>
              {(store.general.city ||
                store.general.country ||
                store.general.email) &&
                " • "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`tel:${store.general.phone}`}
                style={{ color: colorSettingsDefault.hyperLinkColor }}
              >
                {store.general.phone}
              </a>
            </>
          )}
        </p>
      </div>
      {store.summary !== "" && (
        <Section
          id="summary"
          title={t("Personal.summary")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          <p
            dangerouslySetInnerHTML={{ __html: store.summary }}
            className="text-xs xs:text-sm"
          ></p>
        </Section>
      )}
      {Object.values(store.socialLinks || {}).some((link) => link) && (
        <Section
          id="socials"
          title={t("Social.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          <div className="flex items-center justify-center flex-wrap gap-4">
            {Object.keys(store.socialLinks).map((key) => {
              const social = SOCIALS.find((e) => e.name.toLowerCase() === key);
              if (social && store.socialLinks[key]) {
                const rawPart = store.socialLinks[key];
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
                        color: !colorSettingsDefault.hyperLinkColor
                          ? "#0ea5e9"
                          : colorSettingsDefault.hyperLinkColor,
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
      {store.experience?.length > 0 && (
        <Section
          id="experience"
          title={t("Experience.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          {store.experience.map((exp, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: colorSettingsDefault.color }}
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
      {store.education?.length > 0 && (
        <Section
          id="education"
          title={t("Education.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          {store.education.map((edu, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: colorSettingsDefault.color }}
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
      {store.skills?.length > 0 && (
        <Section
          id="skills"
          title={t("Skills.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          <p className="text-center">{store.skills.join(", ")}</p>
        </Section>
      )}
      {store.projects?.length > 0 && (
        <Section
          id="projects"
          title={t("Projects.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          <div className="flex flex-col gap-4 w-full">
            {store.projects.map((project, index) => (
              <div key={index} className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <h3
                    className="font-semibold"
                    style={{ color: colorSettingsDefault.hyperLinkColor }}
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
                        style={{ color: colorSettingsDefault.hyperLinkColor }}
                      >
                        {sectionSettingsDefault.projectLink === "icon" ? (
                          <MdArrowOutward />
                        ) : (
                          t("Projects.live")
                        )}
                      </a>
                    )}
                    {project.liveLink && project.githubLink && (
                      <span className="mx-2 opacity-50">|</span>
                    )}
                    {project.githubLink && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://${project.githubLink?.replace(
                          "https://",
                          ""
                        )}`}
                        style={{ color: colorSettingsDefault.hyperLinkColor }}
                      >
                        {sectionSettingsDefault.projectLink === "icon" ? (
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
      {store.certificates?.length > 0 && (
        <Section
          id="certificates"
          title={t("Certificates.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          {store.certificates.map((certificate, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: colorSettingsDefault.color }}
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
      {store.references?.length > 0 && (
        <Section
          id="references"
          title={t("References.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          {store.references.map((ref, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: colorSettingsDefault.color }}
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
      {store.languages?.length > 0 && (
        <Section
          id="languages"
          title={t("Languages.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          {store.languages.map((lang, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3
                  className="font-semibold"
                  style={{ color: colorSettingsDefault.color }}
                >
                  {lang.language}
                </h3>
                <p className="text-xs xs:text-sm">
                  {LANG_OPTIONS.find((e) => e.value === lang.level)?.label}
                </p>
              </div>
            </div>
          ))}
        </Section>
      )}
      {store.interests?.length > 0 && (
        <Section
          id="interests"
          title={t("Interests.title")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.h2Align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
        >
          <p>{store.interests.join(", ")}</p>
        </Section>
      )}
    </div>
  );
};

export default Template1;
