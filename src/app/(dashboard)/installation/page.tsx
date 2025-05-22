import InfoBar from "@/components/infobar";
import React from "react";
import Installation from "@/components/installation";

const page = () => {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full  px-4  pt-5">
        <Installation />
      </div>
    </>
  );
};

export default page;
