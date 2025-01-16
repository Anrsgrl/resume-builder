import React from "react";
import { useFormattedTime } from "@/utils/helpers";
import useStore from "@/store/store";
import { LANGUAGE_OPTIONS } from "@/utils/constants";

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

  return (
    <div className="w-[240mm] min-h-[296mm] bg-white my-0 mx-auto p-2 rounded">
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
            Summary
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
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="flex flex-col w-full mb-5">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{exp.jobTitle}</h3>
                <p>
                  {useFormattedTime(exp.startDate)} -{" "}
                  {useFormattedTime(exp.endDate)}
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
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">
                  {edu.degree} of {edu.fieldOfStudy}
                </h3>
                <p>
                  {useFormattedTime(edu.startDate)} -{" "}
                  {useFormattedTime(edu.endDate)}
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
            Skills & Other
          </h2>
          <div className="">
            <h3 className="mr-1 float-left font-semibold">Skills:</h3>{" "}
            {skills.join(", ")}
          </div>
        </section>
      )}
      {projects?.length > 0 && (
        <section
          id="projects"
          className="flex items-center justify-center flex-col gap-2 w-full mt-4 px-8"
        >
          <h2 className="pb-1 border-b-2 font-bold uppercase w-full text-base text-center">
            Projects
          </h2>
          <div className="flex flex-col gap-4 w-full">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p>
                    {project.liveLink && (
                      <a href={project.liveLink} className="text-sky-600">
                        Live link
                      </a>
                    )}
                    {project.liveLink && project.githubLink && (
                      <span className="mx-2 font-light">|</span>
                    )}
                    {project.githubLink && (
                      <>
                        <a href={project.githubLink} className="text-sky-600">
                          Project link
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
            Certificates & Awards
          </h2>
          {certificates.map((certificate, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{certificate.title}</h3>
                <p>{useFormattedTime(certificate.date)}</p>
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
            References
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
            Languages
          </h2>
          {languages.map((lang, index) => (
            <div key={index} className="flex flex-col w-full mb-2">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-semibold">{lang.language}</h3>
                <p>
                  {LANGUAGE_OPTIONS.find((e) => e.value === lang.level).label}
                </p>
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
            Interests & Hobbies
          </h2>
          <div>
            <h3 className="mr-1 float-left font-semibold">Interests:</h3>{" "}
            {interests.join(", ")}
          </div>
        </section>
      )}
    </div>
  );
};

export default Template1;
