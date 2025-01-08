"use client";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import CustomLink from "@/components/common/CustomLink";
import useStore from "@/store/store";
import React from "react";

const Personal = () => {
  const {
    name,
    setName,
    surname,
    setSurname,
    email,
    setEmail,
    jobTitle,
    setJobTitle,
    driving,
    setDriving,
    phone,
    setPhone,
    country,
    setCountry,
    city,
    setCity,
    summary,
    setSummary,
  } = useStore();
  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        Personal Informations
      </h1>
      <div className="flex items-center justify-center">
        <ImageUpload />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input state={name} setState={setName} name={"name"} label={"Name"} />
        <Input
          state={surname}
          setState={setSurname}
          name={"surname"}
          label={"Surname"}
        />
        <Input state={email} setState={setEmail} name={"mail"} label={"Mail"} />
        <Input
          state={phone}
          setState={setPhone}
          name={"phone"}
          label={"Phone"}
        />
        <Input
          state={jobTitle}
          setState={setJobTitle}
          name={"jobtitle"}
          label={"Job Title"}
        />
        <Input
          state={driving}
          setState={setDriving}
          name={"drivingLicense"}
          label={"Driving License"}
        />
        <Input
          state={country}
          setState={setCountry}
          name={"country"}
          label={"Country"}
        />
        <Input state={city} setState={setCity} name={"city"} label={"City"} />
      </div>
      <div className="mt-2">
        <TextArea
          state={summary}
          setState={setSummary}
          name={"summary"}
          label={"Summary"}
        />
      </div>
      <CustomLink
        href={"/build?step=2"}
        shallow={true}
        replace
        animation={true}
        onClick={() => (window.location.href = "/build?step=2")}
      >
        Next Step
      </CustomLink>
    </div>
  );
};

export default Personal;
