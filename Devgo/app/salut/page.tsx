"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { DarkMode } from "@/components/BoutonDarkMode/DarkMode";
import { RadioGroupBlock } from "@/components/RadioGroup/RadioGroupBlock";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const src =
    "https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg";

  return <>
  <RadioGroupBlock></RadioGroupBlock>
  </>;
};

export default Salut;
