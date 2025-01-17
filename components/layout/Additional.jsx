import React from "react";
import Certificates from "@/components/shared/Certificates";
import Interests from "@/components/shared/Interests";
import References from "@/components/shared/References";
import Languages from "@/components/shared/Languages";
import Stepper from "@/components/shared/Stepper";

const Additional = () => {
  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        Additional Informations
      </h1>
      <Certificates />
      <Interests />
      <References />
      <Languages />
      <Stepper prev={`/build?step=5`} />
    </div>
  );
};

export default Additional;
