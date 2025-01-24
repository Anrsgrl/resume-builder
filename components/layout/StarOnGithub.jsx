import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { BsStarFill } from "react-icons/bs";
import { SiGithub } from "react-icons/si";

const StarOnGithub = ({ label }) => {
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Anrsgrl/resume-builder")
      .then((res) => res.json())
      .then((data) => setGithubStars(data.stargazers_count))
      .catch((err) => console.error("Failed to fetch GitHub stars:", err));
  }, []);

  return (
    <a
      href="https://github.com/Anrsgrl/resume-builder"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white hover:bg-gray-700 hover:bg-gray-600 transition duration-300"
    >
      <SiGithub size={20} />
      <span>{label}</span>

      <span className="flex items-center gap-1 bg-gray-800 text-yellow-400 px-2 py-1 rounded-full text-sm">
        <BsStarFill size={12} />
        {githubStars === null ? (
          "?"
        ) : (
          <CountUp start={0} end={githubStars} duration={2.5} />
        )}
      </span>
    </a>
  );
};

export default StarOnGithub;
