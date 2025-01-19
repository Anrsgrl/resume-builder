import React from "react";
import { useFormattedTime } from "@/utils/helpers";
import {
  LANGUAGE_OPTIONS,
  LANGUAGE_OPTIONS_AZ,
  LOCALES,
} from "@/utils/constants";
import useStore from "@/store/store";
import { useLocale, useTranslations } from "next-intl";

const Template1 = ({}) => {
  const {
    name,
    surname,
    email,
    phone,
    country,
    city,
    summary,
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
  const localeIso = LOCALES.find((lang) => lang.value === locale).iso;
  return (
    <div className="w-[240mm] min-h-[296mm] bg-white my-0 mx-auto p-2 rounded overflow-x-hidden">
      <div className="flex flex-col items-center justify-between w-full bg- text-center">
        <h1 className="text-lg font-medium whitespace-nowrap w-full uppercase font-bold">
          {name} {surname}
        </h1>
        <p className="text-sm">
          {city && city}
          {country && <>, {country}</>}
          {email && (
            <>
              {" • "}
              <a href={`mailto:${email}`} className="text-sky-600">
                {email}
              </a>
            </>
          )}
          {phone && (
            <>
              {" • "}
              <a href={`tel:${phone}`} className="text-sky-600">
                {phone}
              </a>
            </>
          )}
        </p>
      </div>
      {summary !== "" && (
        <section
          id="summary"
          className="flex items-center justify-center flex-col gap-2 text-center w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base">
            {t("Personal.summary")}
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: summary }}
            className="text-sm"
          ></p>
        </section>
      )}
      {experience?.length > 0 && (
        <section
          id="experience"
          className="flex items-center justify-center flex-col gap-2 text-center w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base">
            {t("Experience.title")}
          </h2>
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
        </section>
      )}
      {education?.length > 0 && (
        <section
          id="experience"
          className="flex items-center justify-center flex-col gap-2 text-center w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base">
            {t("Education.title")}
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">
                  {edu.degree} of {edu.fieldOfStudy}
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
            </div>
          ))}
        </section>
      )}
      {skills?.length > 0 && (
        <section
          id="skills"
          className="flex items-center justify-center flex-col gap-2 w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base text-center">
            {t("Skills.title")}
          </h2>
          <p className="text-center">{skills.join(", ")}</p>
        </section>
      )}
      {projects?.length > 0 && (
        <section
          id="projects"
          className="flex items-center justify-center flex-col gap-2 w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base text-center">
            {t("Projects.title")}
          </h2>
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
                      <span className="mx-2 font-light">|</span>
                    )}
                    {project.githubLink && (
                      <>
                        <a href={project.githubLink} className="text-sky-600">
                          {t("Projects.github")}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                {project?.technologies?.length > 0 && (
                  <div className="font-normal me-auto">
                    <h3 className="mr-1 float-left font-semibold">Tech:</h3>{" "}
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
        </section>
      )}
      {certificates?.length > 0 && (
        <section
          id="certificates"
          className="flex items-center justify-center flex-col gap-2 text-center w-full px-8 mt-4"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base">
            {t("Certificates.title")}
          </h2>
          {certificates.map((certificate, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{certificate.title}</h3>
                <p>{useFormattedTime(certificate.date, localeIso)}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      {references?.length > 0 && (
        <section
          id="references"
          className="flex items-center justify-center flex-col gap-2 text-center w-full px-8 mt-4"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base">
            {t("References.title")}
          </h2>
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
        </section>
      )}
      {languages?.length > 0 && (
        <section
          id="languages"
          className="flex items-center justify-center flex-col gap-2 text-center w-full px-8 mt-4"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base">
            {t("Languages.title")}
          </h2>
          {languages.map((lang, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{lang.language}</h3>
                <p>{LANG_OPTIONS.find((e) => e.value === lang.level).label}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      {interests?.length > 0 && (
        <section
          id="interests"
          className="flex items-center justify-center flex-col gap-2 w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base text-center">
            {t("Interests.title")}
          </h2>
          <p>{interests.join(", ")}</p>
        </section>
      )}
    </div>
  );
};

export default Template1;
