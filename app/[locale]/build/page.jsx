"use client";
import EasterEgg from "@/components/EasterEgg";
import Additional from "@/components/layout/Additional";
import Education from "@/components/shared/Education";
import Experience from "@/components/shared/Experience";
import Personal from "@/components/shared/Personal";
import Project from "@/components/shared/Project";
import Skills from "@/components/shared/Skills";
import { useSearchParams } from "next/navigation";

const Build = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return (
    <div className="max-w-xl mx-auto">
      {(step == 1 || step == null) && <Personal />}
      {step == 2 && <Education />}
      {step == 3 && <Experience />}
      {step == 4 && <Skills />}
      {step == 5 && <Project />}
      {step == 6 && <Additional />}
      {step > 6 && <EasterEgg />}
    </div>
  );
};

export default Build;
