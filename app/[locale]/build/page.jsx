"use client";
import Personal from "@/components/layout/Personal";
import { useSearchParams } from "next/navigation";
import React from "react";

const Build = () => {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return <div>{step == 1 && <Personal />}</div>;
};

export default Build;
