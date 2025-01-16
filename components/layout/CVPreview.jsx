"use client";
import Template1 from "@/components/templates/Template1";

const CVPreview = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="mb-2 text-center">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 print:hidden"
        >
          Save Resume as PDF
        </button>
      </div>
      <Template1 />
    </>
  );
};

export default CVPreview;
