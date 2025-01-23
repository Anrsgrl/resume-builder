import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import { cn } from "@/utils/helpers";

const Menu = ({
  label,
  icon,
  children,
  className,
  className__button,
  className__children,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
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

  const adjustDropdownPosition = () => {
    if (!dropdownRef.current) return;
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (dropdownRect.right > viewportWidth) {
      dropdownRef.current.style.right = "0";
      dropdownRef.current.style.left = "auto";
    }
    if (dropdownRect.left < 0) {
      dropdownRef.current.style.left = "0";
      dropdownRef.current.style.right = "auto";
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      adjustDropdownPosition();
    }
  }, [dropdownOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn("relative inline-block text-left py-2", className)}
      ref={menuRef}
    >
      <Button
        id={`${label}-menu-button`}
        className={cn(
          `bg-zinc-800 border-2 border-zinc-700 text-white hover:bg-zinc-800/90`,
          className__button
        )}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        ref={buttonRef}
      >
        <div className="flex items-center gap-2">
          {label} {icon}
        </div>
      </Button>

      {dropdownOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-zinc-800 border-2 border-zinc-700 text-white ring-1 ring-black/5 focus:outline-none flex flex-col p-1 z-40",
            className__children
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          ref={dropdownRef}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Menu;
