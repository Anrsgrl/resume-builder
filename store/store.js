import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      store: {
        //! General
        general: {
          name: "",
          surname: "",
          email: "",
          phone: "",
          jobTitle: "",
          country: "",
          city: "",
          driving: "",
        },

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

        //! Photo
        image: null,

        //! Summary
        summary: "",

        //! Certificates
        certificates: [],

        //! Experiences
        experience: [],

        //! Languages
        languages: [],

        //! Education
        education: [],

        //! Skills
        skills: [],

        //! Projects
        projects: [],

        //! Interests
        interests: [],

        //! References
        references: [],
      },

      //! Generic setter
      setStore: (key, value) =>
        set((state) => {
          const keys = key.split(".");
          const lastKey = keys.pop();
          let nestedState = state.store;

          keys.forEach((k) => {
            nestedState = nestedState[k];
          });

          nestedState[lastKey] = value;
          return { store: { ...state.store } };
        }),

      //! Add, remove, edit, reorder utilities
      addItem: (section, newItem) =>
        set((state) => ({
          store: {
            ...state.store,
            [section]: [...state.store[section], newItem],
          },
        })),

      removeItem: (section, index) =>
        set((state) => ({
          store: {
            ...state.store,
            [section]: state.store[section].filter((_, i) => i !== index),
          },
        })),

      editItem: (section, index, updatedItem) =>
        set((state) => ({
          store: {
            ...state.store,
            [section]: state.store[section].map((item, i) =>
              i === index ? updatedItem : item
            ),
          },
        })),

      updateOrder: (section, updatedItems) =>
        set((state) => ({
          store: {
            ...state.store,
            [section]: updatedItems,
          },
        })),

      //! Load sample data
      loadSampleData: async () => {
        const response = await fetch("/sampleData.json");
        const sampleData = await response.json();
        set((state) => ({
          store: { ...state.store, ...sampleData },
        }));
      },

      //! Import data from JSON file (only for the store's specific sections)
      importDataFromFile: async (data) => {
        try {
          let finalData;
          if (data instanceof File) {
            const content = await data.text();
            const parsedData = JSON.parse(content);
            finalData = parsedData;
          } else if (typeof data === "object" && data !== null) {
            finalData = data;
          } else {
            throw new Error(
              "Invalid input: data must be a valid object or file"
            );
          }
          set((state) => ({
            store: {
              ...state.store,
              general:
                finalData.general || finalData.basics || finalData.personal,
              socialLinks:
                finalData.socialLinks ||
                finalData.social ||
                finalData.profiles ||
                state.store.socialLinks,
              image:
                finalData.image ||
                finalData.personal?.image ||
                finalData.basics?.image ||
                finalData.general?.image ||
                state.store.image,
              summary:
                finalData.summary ||
                finalData.personal?.summary ||
                finalData.general?.summary ||
                finalData.basics?.summary ||
                state.store.summary,
              certificates: finalData.certificates || state.store.certificates,
              experience:
                finalData.experience ||
                finalData.experiences ||
                finalData.work ||
                finalData.workExperience ||
                state.store.experience,
              languages: finalData.languages || state.store.languages,
              education: finalData.education || state.store.education,
              skills: finalData.skills || state.store.skills,
              projects: finalData.projects || state.store.projects,
              interests: finalData.interests || state.store.interests,
              references: finalData.references || state.store.references,
            },
          }));
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }),
    {
      name: "resume-data",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
