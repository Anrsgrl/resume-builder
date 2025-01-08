"use client";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import React, { useState } from "react";

const Build = () => {
  const [name, setName] = useState("");
  return (
    <div className="mt-20 px-10">
      <Input state={name} setState={setName} label="Name" name="name" />
    </div>
  );
};

export default Build;
