"use server";

import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { onGetAllAccountDomains } from "../settings";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });
    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {
    return {error, status: 400 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) return redirectToSignIn();
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          id: true,
          fullname: true,
          type: true,
        },
      });
      if (authenticated) {
        const domains = await onGetAllAccountDomains();
        return { status: 200, user: authenticated, domains: domains?.domains };
      }
    } catch (error) {
      console.log(error);
    }
  }
};
