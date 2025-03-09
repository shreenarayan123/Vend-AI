"use server";

import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { truncateByDomain } from "recharts/types/util/ChartUtils";

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const subscription = await client.user.findUnique({
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
          },
        },
      },
    });
    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == "STANDARD" &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == "PRO" &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == "ULTIMATE" &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: "Hey there, have  a question? Text us here",
                  },
                },
              },
            },
          },
        });

        if (newDomain) {
          return { status: 200, message: "Domain successfully added" };
        }
      }
      return {
        status: 400,
        message:
          "You've reached the maximum number of domains, upgrade your plan",
      };
    }
    return {
      status: 400,
      message: "Domain already exists",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;
  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    console.log(error);
  }
};

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;
    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdatePassword = async (password: string) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const updatedPassword = await clerkClient.users.updateUser(user.id, {
      password,
    });
    if (updatedPassword) {
      return { status: 200, message: "Password updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetCurrentDomainInfo = async (domain: string) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const domainInfo = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (domainInfo) {
      return domainInfo;
    }
  } catch (error) {
    console.log(error);
  }
};
export const onUpdateDomain = async (name: string, id: string) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const domainExists = await client.domain.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });
    if (!domainExists) {
      const updatedDomain = await client.domain.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      if (updatedDomain) {
        return { status: 200, message: "Domain updated" };
      }
      return { status: 400, message: "oops something went wrong" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const onChatBotImageUpdate = async (id: string, icon: string) => {
  const user = await currentUser();

  if (!user) return;
  try {
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            },
          },
        },
      },
    });
    if (domain) {
      return { status: 200, message: "Chatbot updated" };
    }
    return {
      status: 400,
      message: "oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};
export const onUpdateWelcomeMessage = async (
  message: string,
  domainId: string
) => {
  try {
    const update = await client.domain.update({
      where: {
        id: domainId,
      },
      data: {
        chatBot: {
          update: {
            data: {
              welcomeMessage: message,
            },
          },
        },
      },
    });
    if (update) {
      return { status: 200, message: "Welcome message updated" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const onDeletUserDomain = async (id: string) => {
  const user = await currentUser();

  if (!user) return;

  try {
    const validUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });
    if (validUser) {
      const deletedDomain = await client.domain.delete({
        where: {
          userId: validUser.id,
          id,
        },
        select: {
          name: true,
        },
      });
      if (deletedDomain) {
        return {
          status: 200,
          message: `${deletedDomain.name} was deleted successfully`,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateHelpDeskQuestion = async (
  question: string,
  id: string,
  answer: string
) => {
  try {
    const helpDeskQuestion = await client.domain.update({
      where: {
        id,
      },
      data: {
        helpdesk: {
          create: {
            question,
            answer,
          },
        },
      },
      include: {
        helpdesk: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });
    if (helpDeskQuestion) {
      return {
        status: 200,
        message: "New help desk Question Created !",
        questions: helpDeskQuestion.helpdesk,
      };
    }
    return {
      status: 400,
      message: "oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllHelpDeskQuestions = async (id: string) => {
  try {
    const questions = await client.helpDesk.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        answer: true,
        id: true,
      },
    });
    return {
      staus: 200,
      questions,
      message: " New Questions added successfully",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onCreateFilterQuestions = async (id: string, question: string) => {
  try {
    const filterQuestions = await client.domain.update({
      where: {
        id,
      },

      data: {
        filterQuestions: {
          create: {
            question,
          },
        },
      },
      include: {
        filterQuestions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });
    if (filterQuestions) {
      return {
        status: 200,
        message: "New Filter Question Created",
        questions: filterQuestions.filterQuestions,
      };
    }
    return {
      status: 400,
      message: "Oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllFilterQuestions = async (id: string) => {
  try {
    const filterQuestions = await client.filterQuestions.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        id: true,
      },
      orderBy: {
        question: "asc",
      },
    });
    return {
      status: 200,
      questions: filterQuestions,
      message: "Filter Questions added successfully",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetPaymentConnected = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connected = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });
      if (connected) {
        return connected.stripeId;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const onCreateNewDomainProduct = async (
  id: string,
  name: string,
  price: string,
  image: string
) => {
  try {
    const products = await client.domain.update({
      where: {
        id,
      },
      data: {
        products: {
          create: {
            name,
            id,
            price: parseInt(price),
            image,
          },
        },
      },
    });
    if (products) {
      return {
        status: 200,
        message: "Product created successfully",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
