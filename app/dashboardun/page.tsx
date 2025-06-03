import { AdminMiddlewareClient } from "../(middleware)/AdminMiddlewareClient";
import ComponentPage from "../dashboard/components/componentspage";

export default async function Page() {
  await AdminMiddlewareClient();

  return (
    <div className="flex justify-center gap-4">
     <p>yacine</p>
     <p>yacine</p>
     <p>yacine</p>
    </div>
  );
}
