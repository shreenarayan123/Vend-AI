"use server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { userAgent } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const getUserClients = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const clients = await client.customer.count({
        where: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
      });
      if (clients) {
        return clients;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlanInfo = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const plan = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          _count: {
            select: {
              domains: true,
            },
          },
          subscription: {
            select: {
              plan: true,
              credits: true,
            },
          },
        },
      });
      if (plan) {
        return {
          plan: plan?.subscription?.plan,
          credits: plan?.subscription?.credits,
          domains: plan?._count?.domains,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};