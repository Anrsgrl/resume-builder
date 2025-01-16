import React from "react";
import { useFormattedTime } from "@/utils/helpers";
import useStore from "@/store/store";
import "@/styles/template1.css";

const Template1 = ({}) => {
  const {
    name,
    surname,
    email,
    phone,
    jobTitle,
    country,
    city,
    summary,
    image,
    certificates,
    experience,
    education,
    skills,
    projects,
    languages,
    interests,
    references,
    awards,
    driving,
  } = useStore();
  return (
    <div id="template1" className="resume-container">
      {/* Header */}
      <header className="resume-header">
        <img src={image} alt="Profile" />
        <h1>
          {name} {surname}
        </h1>
        <h2>{jobTitle}</h2>
        <p>
          {email} | {phone} | {city}, {country} |{" "}
          {driving && `Driving License: ${driving}`}
        </p>
      </header>

      {/* Summary */}
      {summary && (
        <section className="resume-section">
          <h3>Summary</h3>
          <p dangerouslySetInnerHTML={{ __html: summary }}></p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-20">
        {/* Education */}
        {education.length > 0 && (
          <section className="resume-section">
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>
                  {edu.degree} in {edu.fieldOfStudy}
                </h4>
                <p className="education-institution">
                  {edu.institution}, {edu.city}
                </p>
                <p className="education-dates">
                  {useFormattedTime(edu.startDate)} -{" "}
                  {useFormattedTime(edu.endDate) || "Present"}
                </p>
              </div>
            ))}
          </section>
        )}
        {/* Experience */}
        {experience.length > 0 && (
          <section className="resume-section">
            <h3>Experience</h3>
            {experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h4>
                  {exp.jobTitle} at {exp.company}
                </h4>
                <p className="experience-location">
                  {exp.city || "Location not provided"}
                </p>
                <p className="experience-dates">
                  {useFormattedTime(exp.startDate)} -{" "}
                  {useFormattedTime(exp.endDate) || "Present"}
                </p>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                ></div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="resume-section">
          <h3>Skills</h3>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-section">
          <h3>Projects</h3>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <h4>{project.title}</h4>
                <p
                  className="description"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></p>
                <p>Technologies: {project.technologies.join(", ")}</p>
                <div className="flex items-center gap-2">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Repo
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Project
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Template1;
