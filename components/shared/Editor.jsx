import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState, useRef } from "react";

export default function Editor({ state, setState, editedIndex, label }) {
  const [editorFocused, setEditorFocused] = useState(false);
  const isInitialLoad = useRef(true);
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const placeholder = "";

  const formats = ["bold", "italic", "underline", "strike", "list", "link"];

  const { quillRef, quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  useEffect(() => {
    if (quill && isInitialLoad.current && state) {
      quill.clipboard.dangerouslyPasteHTML(state);
      isInitialLoad.current = false;
    }
  }, [quill, state]);

  useEffect(() => {
    if (quill && editedIndex !== null) {
      quill.clipboard.dangerouslyPasteHTML(state);
    }
  }, [editedIndex]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setState(quill.root.innerHTML.trim());
      });

      quill.on("selection-change", (range) => {
        setEditorFocused(!!range);
      });
    }
  }, [quill, setState]);

  useEffect(() => {
    if (quill && !state) {
      quill.root.innerHTML = "";
    }
  }, [quill, state]);

  return (
    <div className="relative border-gray-600 focus:outline-none focus:ring-0 focus:border-main border rounded-md !font-[inherit]">
      <div
        className={`absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 ${
          (state || editorFocused) && "bg-gray-900 text-main"
        } peer-focus:bg-gray-900 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 select-none`}
      >
        {label}
      </div>
      <div
        ref={quillRef}
        className="block w-full text-sm bg-transparent rounded-md border-1 appearance-none text-white"
      />
    </div>
  );
}
