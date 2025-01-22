"use client";
import ImageUpload from "@/components/shared/ImageUpload";
import Input from "@/components/common/Input";
import useStore from "@/store/store";
import React from "react";
import Stepper from "@/components/layout/Stepper";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const Editor = dynamic(() => import("@/components/shared/Editor"), {
  ssr: false,
});

const Personal = () => {
  const { store, setStore } = useStore();

  const t = useTranslations("Personal");

  return (
    <div className="my-14 lg:my-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        {t("title")}
      </h1>
      <div className="flex items-center justify-center">
        <ImageUpload />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          state={store.general.name}
          setState={(value) => setStore("general.name", value)}
          name={"name"}
          label={t("name")}
        />
        <Input
          state={store.general.surname}
          setState={(value) => setStore("general.surname", value)}
          name={"surname"}
          label={t("surname")}
        />
        <Input
          state={store.general.email}
          setState={(value) => setStore("general.email", value)}
          name={"mail"}
          label={t("email")}
        />
        <Input
          state={store.general.phone}
          setState={(value) => setStore("general.phone", value)}
          name={"phone"}
          label={t("phone")}
        />
        <Input
          state={store.general.jobTitle}
          setState={(value) => setStore("general.jobTitle", value)}
          name={"jobtitle"}
          label={t("jobtitle")}
        />
        <Input
          state={store.general.driving}
          setState={(value) => setStore("general.driving", value)}
          name={"drivingLicense"}
          label={t("driving")}
        />
        <Input
          state={store.general.country}
          setState={(value) => setStore("general.country", value)}
          name={"country"}
          label={t("country")}
        />
        <Input
          state={store.general.city}
          setState={(value) => setStore("general.city", value)}
          name={"city"}
          label={t("city")}
        />
      </div>
      <div className="mt-2">
        <Editor
          state={store.summary}
          setState={(value) => setStore("summary", value)}
          name={"summary"}
          label={t("summary")}
        />
      </div>
      <Stepper prev={`/`} prevTitle={t("home")} next={"/build?step=2"} />
    </div>
  );
};

export default Personal;
