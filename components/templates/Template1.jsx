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

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="flex items-center justify-center flex-col gap-2 text-center w-full px-8 mt-4"
  >
    <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base text-center">
      {title}
    </h2>
    {children}
  </section>
);

const Template1 = ({}) => {
  const {
    image,
    name,
    surname,
    email,
    phone,
    driving,
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
  const t = useTranslations();
  const locale = useLocale();
  const LANG_OPTIONS = locale === "en" ? LANGUAGE_OPTIONS : LANGUAGE_OPTIONS_AZ;

  const localeIso = React.useMemo(
    () => LOCALES.find((lang) => lang.value === locale)?.iso || "en-US",
    [locale]
  );

  return (
    <div className="w-[240mm] min-h-[296mm] bg-white my-0 mx-auto p-2 rounded overflow-x-hidden">
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
        <h1 className="text-lg font-medium whitespace-nowrap w-full uppercase font-bold">
          {name} {surname}
        </h1>
        <p className="text-sm">
          {city && city}
          {country && `${city && ", "} ${country}`}
          {email && (
            <>
              {(city || country) && " • "}
              <a href={`mailto:${email}`} className="text-sky-600">
                {email}
              </a>
            </>
          )}
          {phone && (
            <>
              {(city || country || email) && " • "}
              <a href={`tel:${phone}`} className="text-sky-600">
                {phone}
              </a>
            </>
          )}
          {driving && (
            <>
              {(city || country || email || phone) && " • "}
              <span className="text-sky-600">{`${t(
                "Personal.driving"
              )}: ${driving}`}</span>
            </>
          )}
        </p>
      </div>
      {summary !== "" && (
        <Section id="summary" title={t("Personal.summary")}>
          <p
            dangerouslySetInnerHTML={{ __html: summary }}
            className="text-sm"
          ></p>
        </Section>
      )}
      {Object.values(socialLinks || {}).some((link) => link) && (
        <Section id="socials" title={t("Social.title")}>
          <div className="flex items-center justify-center flex-wrap gap-4">
            {Object.keys(socialLinks).map((key) => {
              const social = SOCIALS.find((e) => e.name.toLowerCase() === key);
              if (social && socialLinks[key]) {
                const url = socialLinks[key];
                const username = url.replace(
                  /^https?:\/\/(?:www\.)?(?:linkedin\.com\/in\/|github\.com\/|twitter\.com\/|facebook\.com\/|instagram\.com\/|xing\.com\/|medium\.com\/)(.*)$/,
                  "$1"
                );

                return (
                  <div key={key} className="flex items-center gap-1">
                    <span className="text-sky-600">{social.logo}</span>
                    <a
                      href={socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm"
                    >
                      {username}
                    </a>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Section>
      )}
      {experience?.length > 0 && (
        <Section id="experience" title={t("Experience.title")}>
          {experience.map((exp, index) => (
            <div key={index} className="flex flex-col w-full mb-5">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{exp.jobTitle}</h3>
                <p>
                  {useFormattedTime(exp.startDate, localeIso)} -{" "}
                  {exp.endDate
                    ? useFormattedTime(exp.endDate, localeIso)
                    : t("General.present")}
                </p>
              </div>
              <h4 className="font-normal me-auto">
                {exp.company}, {exp.city}
              </h4>
              <p
                dangerouslySetInnerHTML={{ __html: exp.description }}
                className="text-left mt-2 text-sm opacity-80"
              ></p>
            </div>
          ))}
        </Section>
      )}
      {education?.length > 0 && (
        <Section id="education" title={t("Education.title")}>
          {education.map((edu, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">
                  {edu.degree} {locale === "en" ? "of" : "-"} {edu.fieldOfStudy}
                </h3>
                <p>
                  {useFormattedTime(edu.startDate, localeIso)} -{" "}
                  {edu.endDate
                    ? useFormattedTime(edu.endDate, localeIso)
                    : t("General.present")}
                </p>
              </div>
              <h4 className="font-normal me-auto">
                {edu.institution}, {edu.city}
              </h4>
              <p
                dangerouslySetInnerHTML={{ __html: edu.description }}
                className="text-left mt-2 text-sm opacity-80"
              ></p>
            </div>
          ))}
        </Section>
      )}
      {skills?.length > 0 && (
        <Section id="skills" title={t("Skills.title")}>
          <p className="text-center">{skills.join(", ")}</p>
        </Section>
      )}
      {projects?.length > 0 && (
        <Section id="projects" title={t("Projects.title")}>
          <div className="flex flex-col gap-4 w-full">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p>
                    {project.liveLink && (
                      <a href={project.liveLink} className="text-sky-600">
                        {t("Projects.live")}
                      </a>
                    )}
                    {project.liveLink && project.githubLink && (
                      <span className="mx-2 opacity-75">|</span>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} className="text-sky-600">
                        {t("Projects.github")}
                      </a>
                    )}
                  </p>
                </div>
                {project?.technologies?.length > 0 && (
                  <div className="font-normal me-auto">
                    <h3 className="mr-1 float-left font-semibold">
                      {t("Projects.tech")}:
                    </h3>{" "}
                    {project.technologies.join(", ")}
                  </div>
                )}

                <p
                  dangerouslySetInnerHTML={{ __html: project.description }}
                  className="text-left mt-2 text-sm opacity-80"
                ></p>
              </div>
            ))}
          </div>
        </Section>
      )}
      {certificates?.length > 0 && (
        <Section id="certificates" title={t("Certificates.title")}>
          {certificates.map((certificate, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{certificate.title}</h3>
                <p>{useFormattedTime(certificate.date, localeIso)}</p>
              </div>
            </div>
          ))}
        </Section>
      )}
      {references?.length > 0 && (
        <Section id="references" title={t("References.title")}>
          {references.map((ref, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">
                  {ref.name} - {ref.company}
                </h3>
                <div className="flex">
                  {ref.email && (
                    <a href={`mailto:${ref.email}`} className="text-sky-600">
                      {ref.email}
                    </a>
                  )}
                  {ref.email && ref.phone && (
                    <span className="mx-2 font-light">|</span>
                  )}
                  {ref.phone && (
                    <a href={`tel:${ref.phone}`} className="text-sky-600">
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
        <Section id="languages" title={t("Languages.title")}>
          {languages.map((lang, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{lang.language}</h3>
                <p>{LANG_OPTIONS.find((e) => e.value === lang.level).label}</p>
              </div>
            </div>
          ))}
        </Section>
      )}
      {interests?.length > 0 && (
        <Section id="interests" title={t("Interests.title")}>
          <p>{interests.join(", ")}</p>
        </Section>
      )}
    </div>
  );
};

export default Template1;
