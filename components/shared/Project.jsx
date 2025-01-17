import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";
import Stepper from "@/components/shared/Stepper";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const Project = () => {
  const t = useTranslations("Projects");
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
    } else {
      toast.error(t("error"));
    }
  };

  const handleRemoveProject = (index) => {
    removeProject(index);
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "") {
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
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={newProject.title}
          setState={(value) => setNewProject({ ...newProject, title: value })}
          name={"title"}
          label={t("project") + "*"}
        />
        <Input
          state={newProject.githubLink}
          setState={(value) =>
            setNewProject({ ...newProject, githubLink: value })
          }
          name={"githubLink"}
          label={t("github")}
        />
        <Input
          state={newProject.liveLink}
          setState={(value) =>
            setNewProject({ ...newProject, liveLink: value })
          }
          col={true}
          name={"liveLink"}
          label={t("live")}
        />
        <div className="sm:col-span-2">
          <div className="flex gap-2">
            <Input
              state={newTechnology}
              setState={setNewTechnology}
              name={"newTechnology"}
              label={t("tech")}
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
          label={t("description")}
        />
      </div>
      <Button onClick={handleAddProject}>{t("add")}</Button>

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
                  <strong className="text-main">{t("tech")}:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></div>
                <div className="flex flex-col gap-1 mt-2">
                  {project.githubLink && (
                    <div className="flex items-center gap-1">
                      {t("github")}:
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
                      {t("live")}:
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
                  {t("remove")}
                </button>
              </details>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=4`} next={"/build?step=6"} />
    </div>
  );
};

export default Project;
