"use client";
import Input from "@/components/common/Input";
import useStore from "@/store/store";
import React from "react";
import Stepper from "@/components/shared/Stepper";
import { useTranslations } from "next-intl";
import { SOCIALS } from "@/utils/constants";

const Social = () => {
  const {
    socialLinks,
    setLinkedin,
    setGithub,
    setTwitter,
    setFacebook,
    setInstagram,
    setWebsite,
    setXing,
    setMedium,
    setFigma,
    setDribbble,
  } = useStore();
  const t = useTranslations("Social");

  const socialMap = {
    linkedin: setLinkedin,
    github: setGithub,
    twitter: setTwitter,
    facebook: setFacebook,
    instagram: setInstagram,
    website: setWebsite,
    xing: setXing,
    medium: setMedium,
    figma: setFigma,
    dribbble: setDribbble,
  };

  return (
    <div className="my-14 lg:my-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SOCIALS.map((social) => (
          <Input
            key={social.name}
            state={socialLinks[social.name.toLowerCase()] || ""}
            setState={socialMap[social.name.toLowerCase()]}
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
