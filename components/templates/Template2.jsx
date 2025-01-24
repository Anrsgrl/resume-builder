import React from "react";
import { cn, useFormattedTime } from "@/utils/helpers";
import { LOCALES, SOCIALS, uiSans } from "@/utils/constants";
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
  className,
}) => {
  return (
    <section
      id={`template1-${id}`}
      className={cn(
        "flex items-center justify-center flex-col gap-2 text-center w-full",
        space,
        className
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

const Description = ({ state, color, size }) => {
  if (state === "<p><br></p>") return;
  return (
    <p
      style={{ color: color }}
      dangerouslySetInnerHTML={{ __html: state }}
      className={cn("text-left mt-2 opacity-80", size)}
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

  const localeIso = React.useMemo(
    () => LOCALES.find((lang) => lang.value === locale)?.iso || "en-US",
    [locale]
  );

  //* Colors
  const colorSettingsDefault = {
    h1Color: template.h1Color === "" ? "#000000" : template.h1Color,
    h2Color: template.h2Color === "" ? "#000000" : template.h2Color,
    h3Color: template.h3Color === "" ? "#000000" : template.h3Color,
    textColor: template.textColor === "" ? "" : template.textColor,
    descriptionColor:
      template.descriptionColor === "" ? "" : template.descriptionColor,
    hyperLinkColor:
      template.hyperLinkColor === "" ? "#0284c7" : template.hyperLinkColor,
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
    h3FontSize: handleFindStyle(
      template.h3FontSize,
      "text-xs xs:text-sm",
      "text-base xs:text-lg",
      "text-sm xs:text-base"
    ),
    textFontSize: handleFindStyle(
      template.textFontSize,
      "text-xs",
      "text-sm xs:text-base",
      "text-xs xs:text-sm"
    ),
    hyperLinkFontSize: handleFindStyle(
      template.hyperLinkFontSize,
      "text-xs",
      "text-sm xs:text-base",
      "text-xs xs:text-sm"
    ),
    descriptionFontSize: handleFindStyle(
      template.descriptionFontSize,
      "text-xs",
      "text-sm xs:text-base",
      "text-xs xs:text-sm"
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
    align: handleFindStyle(
      template.align,
      "text-left",
      "text-right",
      "text-left"
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
      className="w-[240mm] min-h-[286mm] bg-white my-0 mx-auto p-2 rounded overflow-x-hidden overflow-y-visible"
    >
      <div
        className={`flex items-center gap-1 px-8 ${
          sectionSettingsDefault.align === "text-right"
            ? "flex-row-reverse"
            : "flex-row"
        }`}
      >
        {store.image && (
          <Image
            src={store.image}
            height={sectionSettingsDefault.imageSize}
            width={sectionSettingsDefault.imageSize}
            alt={t("Personal.title")}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col items-center w-full text-center px-4">
          <h1
            style={{ color: colorSettingsDefault.h1Color }}
            className={cn(
              `whitespace-nowrap w-full uppercase font-bold`,
              sectionSettingsDefault.align,
              fontSettingsDefault.h1FontSize
            )}
          >
            {store.general.name} {store.general.surname}
          </h1>
          <h2
            style={{ color: colorSettingsDefault.h2Color }}
            className={cn(
              "whitespace-nowrap w-full font-semibold",
              sectionSettingsDefault.align,
              fontSettingsDefault.h2FontSize
            )}
          >
            {store.general.jobTitle}
          </h2>
          <p
            style={{ color: colorSettingsDefault.textColor }}
            className={cn(
              "w-full mt-1",
              fontSettingsDefault.textFontSize,
              sectionSettingsDefault.align
            )}
          >
            {store.general.city && store.general.city}
            {store.general.country &&
              `${store.general.city && ", "} ${store.general.country}`}
            {store.general.email && (
              <>
                {(store.general.city || store.general.country) && " • "}
                <a
                  className={cn(fontSettingsDefault.hyperLinkFontSize)}
                  style={{ color: colorSettingsDefault.hyperLinkColor }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${store.general.email}`}
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
                  className={cn(fontSettingsDefault.hyperLinkFontSize)}
                  style={{ color: colorSettingsDefault.hyperLinkColor }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`tel:${store.general.phone}`}
                >
                  {store.general.phone}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
      {store.summary !== "" && store.summary !== "<p><br></p>" && (
        <Section
          id="summary"
          title={t("Personal.summary")}
          color={colorSettingsDefault.h2Color}
          size={fontSettingsDefault.h2FontSize}
          align={sectionSettingsDefault.align}
          titleCase={sectionSettingsDefault.titleCase}
          space={sectionSettingsDefault.spaceBetween}
          className={`px-8`}
        >
          <p
            dangerouslySetInnerHTML={{ __html: store.summary }}
            style={{ color: colorSettingsDefault.textColor }}
            className={cn(
              fontSettingsDefault.textFontSize,
              sectionSettingsDefault.align
            )}
          ></p>
        </Section>
      )}
      <div className="grid grid-cols-[25%_65%] gap-4 mt-4 w-full justify-between px-8">
        <div className="flex flex-col">
          {Object.values(store.socialLinks || {}).some((link) => link) && (
            <Section
              id="socials"
              title={t("Social.title")}
              color={colorSettingsDefault.h2Color}
              size={fontSettingsDefault.h2FontSize}
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              <div
                className={`flex items-center flex-wrap gap-4 w-full ${
                  template.align === "left"
                    ? "justify-start"
                    : template.align === "right"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {Object.keys(store.socialLinks).map((key) => {
                  const social = SOCIALS.find(
                    (e) => e.name.toLowerCase() === key
                  );
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
                        className={cn(
                          "flex items-center gap-1",
                          fontSettingsDefault.hyperLinkFontSize
                        )}
                      >
                        <span
                          style={{ color: colorSettingsDefault.hyperLinkColor }}
                        >
                          {social.logo}
                        </span>
                        <span>{username}</span>
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </Section>
          )}

          {store.skills?.length > 0 && (
            <Section
              id="skills"
              title={t("Skills.title")}
              color={colorSettingsDefault.h2Color}
              size={fontSettingsDefault.h2FontSize}
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              <p
                style={{ color: colorSettingsDefault.textColor }}
                className={cn(
                  `w-full flex flex-wrap gap-1 print-exact ${
                    sectionSettingsDefault.align === "text-right"
                      ? "justify-end"
                      : ""
                  }`,
                  fontSettingsDefault.textFontSize,
                  sectionSettingsDefault.align
                )}
              >
                {store.skills?.map((e, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: colorSettingsDefault.hyperLinkColor,
                    }}
                    className="px-2 py-1 rounded-md text-white block"
                  >
                    {e}
                  </span>
                ))}
              </p>
            </Section>
          )}
          {store.references?.length > 0 && (
            <Section
              id="references"
              title={t("References.title")}
              color={colorSettingsDefault.h2Color}
              size={fontSettingsDefault.h2FontSize}
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              {store.references.map((ref, index) => (
                <div key={index} className="flex flex-col w-full mb-2">
                  <div className="flex flex-col w-full">
                    <h3
                      className={cn(
                        `font-semibold flex flex-col ${
                          sectionSettingsDefault.align === "text-right"
                            ? "items-end"
                            : "items-start"
                        }`,
                        fontSettingsDefault.h3FontSize
                      )}
                      style={{ color: colorSettingsDefault.h3Color }}
                    >
                      <span>{ref.name}</span>
                      <span className="whitespace-nowrap">{ref.company}</span>
                    </h3>
                    <div
                      className={cn(
                        `flex flex-col ${
                          sectionSettingsDefault.align === "text-right"
                            ? "items-end"
                            : "items-start"
                        }`,
                        fontSettingsDefault.textFontSize
                      )}
                    >
                      {ref.email && (
                        <a
                          className={cn(fontSettingsDefault.hyperLinkFontSize)}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`mailto:${ref.email}`}
                          style={{ color: colorSettingsDefault.hyperLinkColor }}
                        >
                          {ref.email}
                        </a>
                      )}
                      {ref.phone && (
                        <a
                          className={cn(fontSettingsDefault.hyperLinkFontSize)}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`tel:${ref.phone}`}
                          style={{ color: colorSettingsDefault.hyperLinkColor }}
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
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              {store.languages.map((lang, index) => (
                <div key={index} className="flex flex-col w-full mb-2">
                  <div
                    className={cn(
                      "flex flex-col w-full",
                      sectionSettingsDefault.align
                    )}
                  >
                    <h3
                      className={cn(
                        "font-semibold",
                        fontSettingsDefault.h3FontSize
                      )}
                      style={{ color: colorSettingsDefault.h3Color }}
                    >
                      {lang.language}
                    </h3>
                    <p
                      style={{ color: colorSettingsDefault.textColor }}
                      className={cn(
                        "whitespace-nowrap",
                        fontSettingsDefault.textFontSize
                      )}
                    >
                      {t(`Languages.${lang.level}`)}
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
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              <p
                style={{ color: colorSettingsDefault.textColor }}
                className={cn(
                  "w-full",
                  fontSettingsDefault.textFontSize,
                  sectionSettingsDefault.align
                )}
              >
                {store.interests.join(", ")}
              </p>
            </Section>
          )}
        </div>
        <div className="flex flex-col">
          {store.experience?.length > 0 && (
            <Section
              id="experience"
              title={t("Experience.title")}
              color={colorSettingsDefault.h2Color}
              size={fontSettingsDefault.h2FontSize}
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              {store.experience.map((exp, index) => (
                <div key={index} className="flex flex-col w-full mb-2">
                  <div className="flex items-center justify-between w-full">
                    <h3
                      className={cn(
                        "font-semibold",
                        fontSettingsDefault.h3FontSize
                      )}
                      style={{ color: colorSettingsDefault.h3Color }}
                    >
                      {exp.jobTitle}
                    </h3>
                    <p
                      style={{ color: colorSettingsDefault.textColor }}
                      className={cn(fontSettingsDefault.textFontSize)}
                    >
                      {useFormattedTime(exp.startDate, localeIso)} -{" "}
                      {exp.endDate
                        ? useFormattedTime(exp.endDate, localeIso)
                        : t("General.present")}
                    </p>
                  </div>
                  <h4
                    style={{ color: colorSettingsDefault.textColor }}
                    className={cn(
                      "font-normal me-auto",
                      fontSettingsDefault.h3FontSize
                    )}
                  >
                    {exp.company}, {exp.city}
                  </h4>
                  <Description
                    color={colorSettingsDefault.descriptionColor}
                    size={fontSettingsDefault.descriptionFontSize}
                    state={exp.description}
                  />
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
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              {store.education.map((edu, index) => (
                <div key={index} className="flex flex-col w-full mb-2">
                  <div className="flex items-center justify-between w-full">
                    <h3
                      className={cn(
                        "font-semibold",
                        fontSettingsDefault.h3FontSize
                      )}
                      style={{ color: colorSettingsDefault.h3Color }}
                    >
                      {edu.degree} {locale === "en" ? "of" : "-"}{" "}
                      {edu.fieldOfStudy}
                    </h3>
                    <p
                      style={{ color: colorSettingsDefault.textColor }}
                      className={cn(fontSettingsDefault.textFontSize)}
                    >
                      {useFormattedTime(edu.startDate, localeIso)} -{" "}
                      {edu.endDate
                        ? useFormattedTime(edu.endDate, localeIso)
                        : t("General.present")}
                    </p>
                  </div>
                  <h4
                    style={{ color: colorSettingsDefault.textColor }}
                    className={cn(
                      "font-normal me-auto",
                      fontSettingsDefault.h3FontSize
                    )}
                  >
                    {edu.institution}, {edu.city}
                  </h4>
                  <Description
                    color={colorSettingsDefault.descriptionColor}
                    size={fontSettingsDefault.descriptionFontSize}
                    state={edu.description}
                  />
                </div>
              ))}
            </Section>
          )}
          {store.projects?.length > 0 && (
            <Section
              id="projects"
              title={t("Projects.title")}
              color={colorSettingsDefault.h2Color}
              size={fontSettingsDefault.h2FontSize}
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              <div className="flex flex-col gap-4 w-full">
                {store.projects.map((project, index) => (
                  <div key={index} className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full">
                      <h3
                        className={cn(
                          "font-semibold",
                          fontSettingsDefault.h3FontSize
                        )}
                        style={{ color: colorSettingsDefault.h3Color }}
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
                            className={cn(
                              fontSettingsDefault.hyperLinkFontSize
                            )}
                            style={{
                              color: colorSettingsDefault.hyperLinkColor,
                            }}
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
                            className={cn(
                              fontSettingsDefault.hyperLinkFontSize
                            )}
                            style={{
                              color: colorSettingsDefault.hyperLinkColor,
                            }}
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
                      <p
                        style={{ color: colorSettingsDefault.textColor }}
                        className={cn(
                          "text-left",
                          fontSettingsDefault.textFontSize
                        )}
                      >
                        <span
                          style={{ color: colorSettingsDefault.textColor }}
                          className={cn(fontSettingsDefault.h3FontSize)}
                        >
                          {t("Projects.tech")}:
                        </span>{" "}
                        {project.technologies.join(", ")}
                      </p>
                    )}
                    <Description
                      color={colorSettingsDefault.descriptionColor}
                      size={fontSettingsDefault.descriptionFontSize}
                      state={project.description}
                    />
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
              align={sectionSettingsDefault.align}
              titleCase={sectionSettingsDefault.titleCase}
              space={sectionSettingsDefault.spaceBetween}
            >
              {store.certificates.map((certificate, index) => (
                <div key={index} className="flex flex-col w-full mb-2">
                  <div className="flex items-center justify-between w-full">
                    <h3
                      className={cn(
                        "font-semibold",
                        fontSettingsDefault.h3FontSize
                      )}
                      style={{ color: colorSettingsDefault.h3Color }}
                    >
                      {certificate.title}
                    </h3>
                    <p
                      style={{ color: colorSettingsDefault.textColor }}
                      className={cn(fontSettingsDefault.textFontSize)}
                    >
                      {useFormattedTime(certificate.date, localeIso)}
                    </p>
                  </div>
                  <Description
                    color={colorSettingsDefault.descriptionColor}
                    size={fontSettingsDefault.descriptionFontSize}
                    state={certificate.description}
                  />
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;
