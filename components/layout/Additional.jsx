import React from "react";
import Certificates from "@/components/shared/Certificates";
import Interests from "@/components/shared/Interests";
import References from "@/components/shared/References";
import Languages from "@/components/shared/Languages";
import CustomLink from "@/components/common/CustomLink";

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
      {/* Navigation Link */}
      <nav className="flex items-center gap-2 mt-2">
        <CustomLink
          prev={true}
          href={"/build?step=5"}
          shallow={true}
          replace
          animation={true}
        >
          Prev Step
        </CustomLink>
      </nav>
    </div>
  );
};

export default Additional;
