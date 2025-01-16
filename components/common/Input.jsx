import { useState } from "react";
import { FaCalendarTimes } from "react-icons/fa";
const Input = ({
  state,
  setState,
  label,
  name,
  type = "text",
  present,
  col,
}) => {
  const [presentStatus, setPresentStatus] = useState(false);
  const setPresent = () => {
    setState("");
    setPresentStatus(!presentStatus);
  };
  // Normally, of course, I use twMerge and clsx for className merging in components. But I didn't see the need for this project.
  return (
    <div className={`relative w-full ${col ? "col-span-2" : ""}`}>
      <input
        type={type}
        name={name}
        value={state}
        id={name}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 appearance-none text-white border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer border disabled:opacity-50"
        placeholder=" "
        disabled={presentStatus}
        onChange={(e) => setState(e.target.value)}
      />
      <label
        title={state}
        htmlFor={name}
        className={`absolute flex items-center gap-1 text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
          (state !== "" || state?.length > 0) && "bg-gray-900 text-main"
        }`}
      >
        {label}{" "}
        {present && (
          <button
            type="button"
            className={`bg-gray-800 px-2 rounded-lg flex items-center gap-1 ${
              presentStatus ? "text-main" : "text-gray-400"
            }`}
            onClick={setPresent}
          >
            Present <FaCalendarTimes />
          </button>
        )}
      </label>
    </div>
  );
};

export default Input;
