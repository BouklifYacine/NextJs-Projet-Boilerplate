"use client";

import Component41 from "@/components/comp-41";
import InputFloatingLabel from "@/components/Inputs/InputFloatingLabel";
import React from "react";

function Testcomponents() {
  return (
    <div className="flex justify-center gap-6 mt-10">
      <Component41 />
      <InputFloatingLabel label="Email" type="email" />
    </div>
  );
}

export default Testcomponents;
