"use client";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import useStore from "@/store/store";
import React from "react";
import Stepper from "@/components/shared/Stepper";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});

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
  const t = useTranslations("Personal");
  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        {t("title")}
      </h1>
      <div className="flex items-center justify-center">
        <ImageUpload />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={name}
          setState={setName}
          name={"name"}
          label={t("name")}
        />
        <Input
          state={surname}
          setState={setSurname}
          name={"surname"}
          label={t("surname")}
        />
        <Input
          state={email}
          setState={setEmail}
          name={"mail"}
          label={t("email")}
        />
        <Input
          state={phone}
          setState={setPhone}
          name={"phone"}
          label={t("phone")}
        />
        <Input
          state={jobTitle}
          setState={setJobTitle}
          name={"jobtitle"}
          label={t("jobtitle")}
        />
        <Input
          state={driving}
          setState={setDriving}
          name={"drivingLicense"}
          label={t("driving")}
        />
        <Input
          state={country}
          setState={setCountry}
          name={"country"}
          label={t("country")}
        />
        <Input
          state={city}
          setState={setCity}
          name={"city"}
          label={t("city")}
        />
      </div>
      <div className="mt-2">
        <Editor
          state={summary}
          setState={setSummary}
          name={"summary"}
          label={t("summary")}
        />
      </div>
      <Stepper prev={`/`} prevTitle={t("home")} next={"/build?step=2"} />
    </div>
  );
};

export default Personal;
