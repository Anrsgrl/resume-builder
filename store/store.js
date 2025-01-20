import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      //! General
      name: "",
      surname: "",
      email: "",
      phone: "",
      jobTitle: "",
      country: "",
      city: "",
      driving: "",
      setName: (value) => set({ name: value }),
      setSurname: (value) => set({ surname: value }),
      setEmail: (value) => set({ email: value }),
      setPhone: (value) => set({ phone: value }),
      setJobTitle: (value) => set({ jobTitle: value }),
      setDriving: (value) => set({ driving: value }),
      setCountry: (value) => set({ country: value }),
      setCity: (value) => set({ city: value }),

      //! Social
      socialLinks: {
        linkedin: "",
        github: "",
        twitter: "",
        facebook: "",
        instagram: "",
        website: "",
        xing: "",
        medium: "",
        figma: "",
        dribbble: "",
      },
      setLinkedin: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, linkedin: url },
        })),
      setGithub: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, github: url },
        })),
      setTwitter: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, twitter: url },
        })),
      setFacebook: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, facebook: url },
        })),
      setInstagram: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, instagram: url },
        })),
      setWebsite: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, website: url },
        })),
      setXing: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, xing: url },
        })),
      setMedium: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, medium: url },
        })),
      setFigma: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, figma: url },
        })),
      setDribbble: (url) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, dribbble: url },
        })),

      //! Photo
      image: null,
      setImage: (imageBase64) => set({ image: imageBase64 }),

      //! Summary
      summary: "",
      setSummary: (newSummary) => set({ summary: newSummary }),

      //! Certificates
      certificates: [],
      addCertificate: (newCertificate) =>
        set((state) => ({
          certificates: [...state.certificates, newCertificate],
        })),
      removeCertificate: (index) =>
        set((state) => ({
          certificates: state.certificates.filter((_, i) => i !== index),
        })),
      editCertificate: (index, updatedCertificate) =>
        set((state) => ({
          certificates: state.certificates.map((cert, i) =>
            i === index ? updatedCertificate : cert
          ),
        })),
      updateCertificatesOrder: (updatedCertificates) =>
        set({ certificates: updatedCertificates }),

      //! Experiences
      experience: [],
      addExperience: (newExperience) =>
        set((state) => ({
          experience: [...state.experience, newExperience],
        })),
      removeExperience: (index) =>
        set((state) => ({
          experience: state.experience.filter((_, i) => i !== index),
        })),
      editExperience: (index, updatedExperience) =>
        set((state) => ({
          experience: state.experience.map((exp, i) =>
            i === index ? updatedExperience : exp
          ),
        })),
      updateExperienceOrder: (updatedExperience) =>
        set({ experience: updatedExperience }),

      //! Languages
      languages: [],
      addLanguage: (newLanguage) =>
        set((state) => ({
          languages: [...state.languages, newLanguage],
        })),
      removeLanguage: (index) =>
        set((state) => ({
          languages: state.languages.filter((_, i) => i !== index),
        })),
      editLanguage: (index, updatedLanguage) =>
        set((state) => ({
          languages: state.languages.map((lang, i) =>
            i === index ? updatedLanguage : lang
          ),
        })),
      updateLanguagesOrder: (updatedLanguage) =>
        set({ languages: updatedLanguage }),

      //! Education
      education: [],
      addEducation: (newEducation) =>
        set((state) => ({
          education: [...state.education, newEducation],
        })),
      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),
      editEducation: (index, updatedEducation) =>
        set((state) => ({
          education: state.education.map((edu, i) =>
            i === index ? updatedEducation : edu
          ),
        })),
      updateEducationOrder: (updatedEducation) =>
        set({ education: updatedEducation }),

      //! Skills
      skills: [],
      addSkill: (newSkill) =>
        set((state) => ({
          skills: [...state.skills, newSkill],
        })),
      removeSkill: (index) =>
        set((state) => ({
          skills: state.skills.filter((_, i) => i !== index),
        })),
      editSkill: (index, updatedSkill) =>
        set((state) => ({
          skills: state.skills.map((skill, i) =>
            i === index ? updatedSkill : skill
          ),
        })),
      updateSkillsOrder: (updatedSkills) => set({ skills: updatedSkills }),

      //! Projects
      projects: [],
      addProject: (newProject) =>
        set((state) => ({
          projects: [...state.projects, newProject],
        })),
      removeProject: (index) =>
        set((state) => ({
          projects: state.projects.filter((_, i) => i !== index),
        })),
      editProject: (index, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((proj, i) =>
            i === index ? updatedProject : proj
          ),
        })),
      updateProjectOrder: (updatedProjects) =>
        set({ projects: updatedProjects }),

      //! Interests
      interests: [],
      addInterest: (newInterest) =>
        set((state) => ({
          interests: [...state.interests, newInterest],
        })),
      removeInterest: (index) =>
        set((state) => ({
          interests: state.interests.filter((_, i) => i !== index),
        })),
      editInterest: (index, updatedInterest) =>
        set((state) => ({
          interests: state.interests.map((interest, i) =>
            i === index ? updatedInterest : interest
          ),
        })),
      updateInterestsOrder: (updatedInterests) =>
        set({ interests: updatedInterests }),

      //! References
      references: [],
      addReference: (newReference) =>
        set((state) => ({
          references: [...state.references, newReference],
        })),
      removeReference: (index) =>
        set((state) => ({
          references: state.references.filter((_, i) => i !== index),
        })),
      editReference: (index, updatedReference) =>
        set((state) => ({
          references: state.references.map((ref, i) =>
            i === index ? updatedReference : ref
          ),
        })),
      updateReferencesOrder: (updatedReference) =>
        set({ references: updatedReference }),
    }),
    {
      name: "resume-data",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
