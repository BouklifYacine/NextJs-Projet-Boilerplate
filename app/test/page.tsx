"use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";


 function Test() {
  const { data: session } = authClient.useSession()

  
  console.log(session)
  // const user = await prisma.user.findUnique()
  return (
    <div>
      <p>saluttt</p>
    <Image alt="logo" src={session?.user.image || ""} width={30} height={30}></Image>
    </div>
  );
}

export default Test;
