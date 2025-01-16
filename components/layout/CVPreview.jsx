"use client";
import Template1 from "@/components/templates/Template1";

const CVPreview = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="mb-4 text-center">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 print:hidden"
        >
          Save Resume as PDF
        </button>
      </div>
      <div className="max-h-[90dvh] overflow-auto mb-4 scale-90">
        <Template1 />
      </div>
    </>
  );
};

export default CVPreview;
