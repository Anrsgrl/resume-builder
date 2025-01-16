import CVPreview from "@/components/layout/CVPreview";
import React from "react";

const BuildLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-2">
      {children}
      <div className="border-l border-main ps-4 mt-4">
        <CVPreview />
      </div>
    </div>
  );
};

export default BuildLayout;
