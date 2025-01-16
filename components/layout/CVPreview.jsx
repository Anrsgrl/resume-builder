"use client";
import { jsPDF } from "jspdf";
import { useState } from "react";
import Template1 from "@/components/templates/Template1";
const CVPreview = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = () => {
    setLoading(true);
    try {
      const pdf = new jsPDF("p", "px", "a4");
      const content = document.getElementById("template1");

      pdf.html(content, {
        callback: function (doc) {
          doc.save("CV.pdf");
        },
        x: 10,
        y: 10,
        autoPaging: "slice",
        html2canvas: {
          scale: 0.7,
          useCORS: true,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Template1 />
      <div className="mt-4 text-center">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Saving..." : "Save Resume as PDF"}
        </button>
      </div>
    </>
  );
};

export default CVPreview;
