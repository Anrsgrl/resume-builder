"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import React, { useState } from "react";

const Build = () => {
  const [name, setName] = useState("");
  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <Input state={name} setState={setName} label="Name" name="name" />
      <Button onClick={() => alert("namne")} animation={true}>
        Name
      </Button>
    </div>
  );
};

export default Build;
