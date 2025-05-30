import React from "react";
// import ComponentPage from "./components/componentspage";

import { AdminMiddlewareClient } from "../(middleware)/AdminMiddlewareClient";
import BoutonConnexionProviders from "@/components/Boutons/BoutonConnexionProviders";

const DashboardServer = async () => {
 
  await AdminMiddlewareClient()



  return (
    // <> <ComponentPage></ComponentPage> </>
     <> <BoutonConnexionProviders></BoutonConnexionProviders> </>
  );
};

export default DashboardServer;
