const Input = ({ state, setState, label, name }) => {
  return (
    <div class="relative">
      <input
        type="text"
        name={name}
        id={name}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 appearance-none text-white border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer border"
        placeholder=" "
        onChange={(e) => setState(e.target.value)}
      />
      <label
        for={name}
        className={`absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
          state !== "" && "bg-gray-900 text-main"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
