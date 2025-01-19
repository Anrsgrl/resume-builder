import { useState } from "react";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});
import Button from "@/components/common/Button";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa";
import Stepper from "@/components/shared/Stepper";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { TbClick } from "react-icons/tb";
import { handleMoveItem } from "@/utils/helpers";
const Project = () => {
  const t = useTranslations("Projects");
  const {
    projects,
    addProject,
    editProject,
    removeProject,
    updateProjectOrder,
  } = useStore();

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

  //* Edit
  const [editedIndex, setEditedIndex] = useState(null);
  const handleEditProject = () => {
    try {
      editProject(editedIndex, newProject);
      toast.success(t("success"));
      setEditedIndex(null);
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        githubLink: "",
        liveLink: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  const handleChooseProject = (index) => {
    setEditedIndex(index);
    const project = projects[index];
    console.log("Project", project);
    console.log("Project", project.title);
    setNewProject({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubLink: project.githubLink,
      liveLink: project.liveLink,
    });
    // Temporary solution
    setTimeout(() => {
      setNewProject({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
      });
    }, [200]);
  };

  const handleCloseEdit = () => {
    setEditedIndex(null);
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      githubLink: "",
      liveLink: "",
    });
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

  //* Sort functions
  const handleMoveProjectUp = (index) => {
    handleMoveItem(projects, updateProjectOrder, index, "up");
  };

  const handleMoveProjectDown = (index) => {
    handleMoveItem(projects, updateProjectOrder, index, "down");
  };

  return (
    <div className="my-14 lg:my-20 px-10 flex flex-col gap-2">
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
              {newProject?.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="cursor-pointer hover:underline"
                  onClick={() =>
                    setNewProject((prev) => ({
                      ...prev,
                      technologies: prev.technologies.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  {tech}
                  {index !== newProject.technologies.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Editor
          editedIndex={editedIndex}
          state={newProject.description}
          setState={(value) =>
            setNewProject({ ...newProject, description: value })
          }
          label={t("description")}
        />
      </div>
      <Button
        onClick={() =>
          editedIndex === null ? handleAddProject() : handleEditProject()
        }
      >
        {t(editedIndex !== null ? "edit" : "add")}
      </Button>
      {editedIndex !== null && (
        <Button onClick={() => handleCloseEdit()}>{t("close")}</Button>
      )}

      {/* List */}
      <div className="mt-6">
        {projects.length > 0 && (
          <div className="space-y-4 text-white/80">
            {projects.map((project, index) => (
              <details
                key={index}
                className="border border-white/50 p-4 rounded-md animation-all"
              >
                <summary className="font-bold text-white/80 flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-1">
                    {project.title} <TbClick />
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleMoveProjectUp(index)}
                      disabled={index === 0}
                      className="disabled:opacity-50"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      onClick={() => handleMoveProjectDown(index)}
                      disabled={index === projects.length - 1}
                      className="disabled:opacity-50"
                    >
                      <FaArrowDown />
                    </button>
                  </div>
                </summary>
                {project?.technologies?.length > 0 && (
                  <p>
                    <strong className="text-main">{t("tech")}:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>
                )}

                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      project?.description !== "<p><br></p>"
                        ? project.description
                        : "",
                  }}
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
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleChooseProject(index)}
                    className="text-blue-500"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleRemoveProject(index)}
                    className="text-red-500"
                  >
                    {t("remove")}
                  </button>
                </div>
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
