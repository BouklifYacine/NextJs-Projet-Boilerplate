"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function Test() {
  const { data: session } = authClient.useSession();

  console.log(session);
  // const user = await prisma.user.findUnique()
  return (
    <div>
      <p>saluttt</p>
      {session?.user.image && (
        <Image
          alt="logo"
          src={session.user.image}
          width={30}
          height={30}
          unoptimized
        />
      )}
    </div>
  );
}

export default Test;
