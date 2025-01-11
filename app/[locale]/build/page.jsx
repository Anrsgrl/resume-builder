"use client";
import Personal from "@/components/layout/Personal";
import { useSearchParams } from "next/navigation";

const Build = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return <div className="max-w-xl mx-auto">{step == 1 && <Personal />}</div>;
};

export default Build;
