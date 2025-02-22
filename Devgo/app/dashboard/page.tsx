import React from "react";
import ComponentPage from "./components/componentspage";

import { AdminMiddleware } from "../(middleware)/AdminMiddleware";

const DashboardServer = async () => {
 
  await AdminMiddleware()

  return (
    <>
      <ComponentPage></ComponentPage>
    </>
  );
};

export default DashboardServer;
