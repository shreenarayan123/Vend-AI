"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const getUserAppointments = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const bookings = await client.bookings.count({
        where: {
          Customer: {
            Domain: {
              User: {
                clerkId: user.id,
              },
            },
          },
        },
      });
      if(bookings){
        return bookings
      }
    }
  } catch (error) {
    console.log(error);
  }
};
