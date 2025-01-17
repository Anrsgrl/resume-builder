import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import CustomLink from "@/components/common/CustomLink";
import Editor from "../shared/Editor";
import Button from "../common/Button";
import { FaPlus } from "react-icons/fa";

const Project = () => {
  const { projects, addProject, removeProject } = useStore();

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    liveLink: "",
  });

  const [newTechnology, setNewTechnology] = useState("");

  const handleAddProject = () => {
    if (newProject.title) {
      addProject(newProject);
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        githubLink: "",
        liveLink: "",
      });
    }
  };

  const handleRemoveProject = (index) => {
    removeProject(index);
  };

  const handleAddTechnology = () => {
    if (newTechnology) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={newProject.title}
          setState={(value) => setNewProject({ ...newProject, title: value })}
          name={"title"}
          label={"Project Title*"}
        />
        <Input
          state={newProject.githubLink}
          setState={(value) =>
            setNewProject({ ...newProject, githubLink: value })
          }
          name={"githubLink"}
          label={"GitHub Link"}
        />
        <Input
          state={newProject.liveLink}
          setState={(value) =>
            setNewProject({ ...newProject, liveLink: value })
          }
          col={true}
          name={"liveLink"}
          label={"Live Link"}
        />
        <div className="sm:col-span-2">
          <div className="flex gap-2">
            <Input
              state={newTechnology}
              setState={setNewTechnology}
              name={"newTechnology"}
              label={"Add Technology"}
            />
            <Button onClick={handleAddTechnology}>
              <FaPlus />
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-gray-400">
              {newProject.technologies.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Editor
          state={newProject.description}
          setState={(value) =>
            setNewProject({ ...newProject, description: value })
          }
          label={"Description"}
        />
      </div>
      <Button onClick={handleAddProject}>Add Project</Button>

      {/* List */}
      <div className="mt-6">
        {projects.length > 0 && (
          <div className="space-y-4 text-white/80">
            {projects.map((project, index) => (
              <details
                key={index}
                className="border border-white/50 p-4 rounded-md animation-all"
              >
                <summary className="font-bold text-white/80">
                  {project.title}
                </summary>
                <p>
                  <strong className="text-main">Tech:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></div>
                <div className="flex flex-col gap-1 mt-2">
                  {project.githubLink && (
                    <div className="flex items-center gap-1">
                      GitHub Repo:
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-main"
                      >
                        {project.githubLink}
                      </a>
                    </div>
                  )}
                  {project.liveLink && (
                    <div className="flex items-center gap-1">
                      Live link:
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-main"
                      >
                        {project.liveLink}
                      </a>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Link */}
      <nav className="flex items-center gap-2">
        <CustomLink
          prev={true}
          href={"/build?step=4"}
          shallow={true}
          replace
          animation={true}
        >
          Prev Step
        </CustomLink>
        <CustomLink
          href={"/build?step=6"}
          shallow={true}
          replace
          animation={true}
        >
          Next Step
        </CustomLink>
      </nav>
    </div>
  );
};

export default Project;
