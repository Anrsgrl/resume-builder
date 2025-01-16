import React from "react";
import Certificates from "../shared/Certificates";

const Additional = () => {
  return (
    <div className="mt-20 px-10 flex flex-col gap-2">
      <h1 className="text-center font-bold text-3xl text-main mb-4">
        Additional Informations
      </h1>
      <Certificates />
      {/* Navigation Link */}
      <nav className="flex items-center gap-2">
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
