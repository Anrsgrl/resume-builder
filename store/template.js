import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTemplateStore = create(
  persist(
    (set) => ({
      name: "CV",
      templateNumber: 1,
      sectionHeadingColor: "",
      headingColor: "",
      hyperlinkColor: "",
      projectLink: "icon",
      fontFamily: "",
      setName: (value) => set({ name: value }),
      setTemplateNumber: (value) => set({ templateNumber: value }),
      setSectionHeadingColor: (value) => set({ sectionHeadingColor: value }),
      setHeadingColor: (value) => set({ headingColor: value }),
      setHyperlinkColor: (value) => set({ hyperlinkColor: value }),
      setProjectLink: (value) => set({ projectLink: value }),
      setFontFamily: (value) => set({ fontFamily: value }),
    }),
    {
      name: "template",
      getStorage: () => localStorage,
    }
  )
);

export default useTemplateStore;
