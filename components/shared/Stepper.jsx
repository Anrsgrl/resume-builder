import React from "react";
import CustomLink from "../common/CustomLink";

const Stepper = ({ prev, next, prevTitle, nextTitle }) => {
  return (
    <nav className="flex items-center gap-2">
      {prev && (
        <CustomLink
          prev={true}
          href={prev}
          shallow={true}
          replace
          animation={true}
        >
          {prevTitle ? prevTitle : "Prev Step"}
        </CustomLink>
      )}
      {next && (
        <CustomLink href={next} shallow={true} replace animation={true}>
          {nextTitle ? nextTitle : "Next Step"}
        </CustomLink>
      )}
    </nav>
  );
};

export default Stepper;
