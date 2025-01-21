import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTemplateStore = create(
  persist(
    (set) => ({
      //! Main
      name: "CV",
      templateNumber: 1,
      setName: (value) => set({ name: value }),
      setTemplateNumber: (value) => set({ templateNumber: value }),

      //! Colors
      h1Color: "",
      h2Color: "",
      h3Color: "",
      textColor: "",
      descriptionColor: "",
      hyperLinkColor: "",
      seth1Color: (value) => set({ h1Color: value }),
      seth2Color: (value) => set({ h2Color: value }),
      seth3Color: (value) => set({ h3Color: value }),
      setTextColor: (value) => set({ textColor: value }),
      setDescriptionColor: (value) => set({ descriptionColor: value }),
      setHyperLinkColor: (value) => set({ hyperLinkColor: value }),

      //! Section
      imageSize: "",
      projectLink: "",
      spaceBetween: "",
      h2Align: "",
      titleCase: "",
      setImageSize: (value) => set({ imageSize: value }),
      setProjectLink: (value) => set({ projectLink: value }),
      setSpaceBetween: (value) => set({ spaceBetween: value }),
      seth2Align: (value) => set({ h2Align: value }),
      setTitleCase: (value) => set({ titleCase: value }),

      //! Font
      fontFamily: "",
      h1FontSize: "",
      h2FontSize: "",
      h3FontSize: "",
      textFontSize: "",
      descriptionFontSize: "",
      hyperLinkFontSize: "#0284c7",
      setFontFamily: (value) => set({ fontFamily: value }),
      seth1FontSize: (value) => set({ h1FontSize: value }),
      seth2FontSize: (value) => set({ h2FontSize: value }),
      seth3FontSize: (value) => set({ h3FontSize: value }),
      setTextFontSize: (value) => set({ textFontSize: value }),
      setDescriptionFontSize: (value) => set({ descriptionFontSize: value }),
      setHyperLinkFontSize: (value) => set({ hyperLinkFontSize: value }),
    }),
    {
      name: "template",
      getStorage: () => localStorage,
    }
  )
);

export default useTemplateStore;
