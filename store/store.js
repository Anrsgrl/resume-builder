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
      setName: (newName) => set({ name: newName }),
      setSurname: (newSurname) => set({ surname: newSurname }),
      setEmail: (newEmail) => set({ email: newEmail }),
      setPhone: (newPhone) => set({ phone: newPhone }),
      setJobTitle: (newJobTitle) => set({ jobTitle: newJobTitle }),
      setDriving: (newDriving) => set({ driving: newDriving }),
      setCountry: (newCountry) => set({ country: newCountry }),
      setCity: (newCity) => set({ city: newCity }),

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
    }),
    {
      name: "resume-data",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
