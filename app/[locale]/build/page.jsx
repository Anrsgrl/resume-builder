"use client";
import Loading from "@/components/shared/Loading";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const Additional = dynamic(() => import("@/components/layout/Additional"), {
  ssr: false,
  loading: () => <Loading />,
});
const Education = dynamic(
  () => import("@/components/shared/layout/Education"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const Experience = dynamic(
  () => import("@/components/shared/layout/Experience"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const Personal = dynamic(() => import("@/components/shared/layout/Personal"), {
  ssr: false,
  loading: () => <Loading />,
});
const Project = dynamic(() => import("@/components/shared/layout/Project"), {
  ssr: false,
  loading: () => <Loading />,
});
const Skills = dynamic(() => import("@/components/shared/layout/Skills"), {
  ssr: false,
  loading: () => <Loading />,
});
const Social = dynamic(() => import("@/components/shared/layout/Social"), {
  ssr: false,
  loading: () => <Loading />,
});
const Something = dynamic(() => import("@/components/shared/Something"), {
  ssr: false,
  loading: () => <Loading />,
});

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
