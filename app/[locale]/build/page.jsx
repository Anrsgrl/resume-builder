"use client";
import Additional from "@/components/layout/Additional";
import Education from "@/components/layout/Education";
import Experience from "@/components/layout/Experience";
import Personal from "@/components/layout/Personal";
import Project from "@/components/layout/Project";
import Skills from "@/components/layout/Skills";
import { useSearchParams } from "next/navigation";

const Build = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return (
    <div className="max-w-xl mx-auto">
      {step == 1 && <Personal />}
      {step == 2 && <Education />}
      {step == 3 && <Experience />}
      {step == 4 && <Skills />}
      {step == 5 && <Project />}
      {step == 6 && <Additional />}
    </div>
  );
};

export default Build;
