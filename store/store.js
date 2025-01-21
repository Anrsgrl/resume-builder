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

      //! Example data
      loadSampleData: async () => {
        const response = await fetch("/sampleData.json");
        const sampleData = await response.json();
        set((state) => ({
          store: { ...state.store, ...sampleData },
        }));
      },
    }),
    {
      name: "resume-data",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
