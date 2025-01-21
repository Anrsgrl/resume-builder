import React, { useState, useEffect, useRef } from "react";
import { AiFillSetting } from "react-icons/ai";
import Button from "../../common/Button";

const Menu = ({ label, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left py-2" ref={menuRef}>
      <Button
        id="menu-button"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        ref={buttonRef}
      >
        <div className="flex items-center gap-1">
          {label} <AiFillSetting size={20} />
        </div>
      </Button>

      {dropdownOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-800 border-2 border-zinc-700 text-white ring-1 ring-black/5 focus:outline-none flex flex-col p-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Menu;
