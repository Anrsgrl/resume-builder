import CVPreview from "@/components/layout/CVPreview";
import React from "react";

const BuildLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-2 print:grid-cols-1">
      <div className="print:hidden">{children}</div>
      <div className="border-l border-main ps-4 mt-4 print:border-0 print:p-0 print:m-0">
        <CVPreview />
      </div>
    </div>
  );
};

export default BuildLayout;
