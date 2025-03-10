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

export const getUserBalance = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });
      if (connectedStripe) {
        const transaction = await stripe.balance.retrieve({
          stripeAccount: connectedStripe.stripeId!,
        });
        if (transaction) {
          const sales = transaction.pending.reduce((total, next) => {
            return total + next.amount;
          }, 0);
          return sales / 100;
        }
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

export const getUserTotalProductPrices = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const products = await client.product.findMany({
        where: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
        select: {
          price: true,
        },
      });
      if (products) {
        const total = products.reduce((total, next) => {
          return total + next.price;
        }, 0);
        return total;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserTransactions = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });
      if (connectedStripe) {
        const transaction = await stripe.charges.list({
          stripeAccount: connectedStripe.stripeId!,
        });
        if (transaction) {
          return transaction;
        }
      }
    }
  } catch (error) {}
};
