import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return {};
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return {};
  }

  return { currentUser };
};

export default serverAuth;
