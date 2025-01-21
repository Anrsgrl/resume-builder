"use client";
import Additional from "@/components/layout/Additional";
import Education from "@/components/shared/layout/Education";
import Experience from "@/components/shared/layout/Experience";
import Personal from "@/components/shared/layout/Personal";
import Project from "@/components/shared/layout/Project";
import Skills from "@/components/shared/layout/Skills";
import Social from "@/components/shared/layout/Social";
import Something from "@/components/shared/Something";
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
