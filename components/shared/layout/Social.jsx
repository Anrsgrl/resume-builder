"use client";
import Input from "@/components/common/Input";
import useStore from "@/store/store";
import React from "react";
import Stepper from "@/components/shared/Stepper";
import { useTranslations } from "next-intl";
import { SOCIALS } from "@/utils/constants";

const Social = () => {
  const { store, setStore } = useStore();
  const t = useTranslations("Social");

  return (
    <div className="my-14 lg:my-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SOCIALS.map((social) => (
          <Input
            key={social.name}
            state={store.socialLinks[social.name.toLowerCase()] || ""}
            setState={(value) =>
              setStore(`socialLinks.${social.name.toLowerCase()}`, value)
            }
            name={social.name.toLowerCase()}
            label={
              <>
                {social.logo} {social.name}
              </>
            }
          />
        ))}
      </div>
      <Stepper prev={`/build?step=1`} next={"/build?step=3"} />
    </div>
  );
};

export default Social;
