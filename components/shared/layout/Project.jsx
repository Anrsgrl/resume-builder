import { useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import useStore from "@/store/store";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Stepper from "@/components/shared/Stepper";
import Example from "@/components/shared/Example";
import { handleMoveItem } from "@/utils/helpers";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});
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
          <p className="text-gray-400 text-xs mt-2">
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
              <Example
                key={index}
                index={index}
                remove={handleRemoveProject}
                edit={handleChooseProject}
                down={handleMoveProjectDown}
                up={handleMoveProjectUp}
                title={project.title}
                state={projects}
              >
                {project?.technologies?.length > 0 && (
                  <p>
                    <strong className="text-main">{t("tech")}:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>
                )}
                <div className="flex flex-col gap-1 mt-2">
                  {project.githubLink && (
                    <div className="flex items-center gap-1">
                      <strong className="text-main">
                        <SiGithub />
                      </strong>{" "}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.githubLink}
                      </a>
                    </div>
                  )}
                  {project.liveLink && (
                    <div className="flex items-center gap-1">
                      <strong className="text-main">
                        <MdOutlineArrowOutward />
                      </strong>{" "}
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.liveLink}
                      </a>
                    </div>
                  )}

                  <div
                    className="text-left mt-2 text-sm opacity-80"
                    dangerouslySetInnerHTML={{
                      __html:
                        project?.description !== "<p><br></p>"
                          ? project.description
                          : "",
                    }}
                  ></div>
                </div>
              </Example>
            ))}
          </div>
        )}
      </div>

      <Stepper prev={`/build?step=5`} next={"/build?step=7"} />
    </div>
  );
};

export default Project;
