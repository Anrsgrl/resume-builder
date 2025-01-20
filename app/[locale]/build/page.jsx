"use client";
import Additional from "@/components/layout/Additional";
import Education from "@/components/shared/Education";
import Experience from "@/components/shared/Experience";
import Something from "@/components/shared/Something";
import Personal from "@/components/shared/Personal";
import Project from "@/components/shared/Project";
import Skills from "@/components/shared/Skills";
import Social from "@/components/shared/Social";
import { useSearchParams } from "next/navigation";

const Build = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return (
    <div className="max-w-xl mx-auto">
      {(step == 1 || step == null) && <Personal />}
      {step == 2 && <Social />}
      {step == 3 && <Education />}
      {step == 4 && <Experience />}
      {step == 5 && <Skills />}
      {step == 6 && <Project />}
      {step == 7 && <Additional />}
      {step > 7 && <Something />}
    </div>
  );
};

export default Build;
