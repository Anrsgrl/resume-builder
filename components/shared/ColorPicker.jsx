const ColorPicker = ({ id, state, setState }) => {
  return (
    <div className="relative w-4 h-4 ">
      <input
        type="color"
        id={id}
        className="absolute opacity-0 cursor-pointer w-0 h-0 mt-4"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <span
        className="w-4 h-4 inline-block rounded-full border border-gray-300 cursor-pointer"
        style={{ backgroundColor: state }}
        onClick={() => document.getElementById(id).click()}
      ></span>
    </div>
  );
};

export default ColorPicker;
