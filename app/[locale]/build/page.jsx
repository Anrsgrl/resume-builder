"use client";
import Education from "@/components/layout/Education";
import Experience from "@/components/layout/Experience";
import Personal from "@/components/layout/Personal";
import { useSearchParams } from "next/navigation";

const Build = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return (
    <div className="max-w-xl mx-auto">
      {step == 1 && <Personal />}
      {step == 2 && <Education />}
      {step == 3 && <Experience />}
    </div>
  );
};

export default Build;
