import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTemplateStore = create(
  persist(
    (set) => ({
      template: {
        //! Main
        name: "CV",
        templateNumber: 1,

        //! Colors
        h1Color: "",
        h2Color: "",
        h3Color: "",
        textColor: "",
        descriptionColor: "",
        hyperLinkColor: "",

        //! Section
        imageSize: "",
        projectLink: "",
        spaceBetween: "",
        h2Align: "",
        titleCase: "",

        //! Font
        fontFamily: "",
        h1FontSize: "",
        h2FontSize: "",
        h3FontSize: "",
        textFontSize: "",
        descriptionFontSize: "",
        hyperLinkFontSize: "#0284c7",
      },

      setTemplate: (key, value) =>
        set((state) => ({
          template: {
            ...state.template,
            [key]: value,
          },
        })),
    }),
    {
      name: "template",
      getStorage: () => localStorage,
    }
  )
);

export default useTemplateStore;
