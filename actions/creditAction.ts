"use server";

import { CreditFormValues } from "@/app/(main)/(routes)/profile/_components/CreditFormDialog";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

type createCreditValeus = {
  values: CreditFormValues;
  talentId: string;
};

type updateCreditValues = {
  values: CreditFormValues;
  creditId: string;
};

export const createCredit = async ({
  values,
  talentId,
}: createCreditValeus) => {
  const { userId } = auth();

  if (!userId) return console.log("User ID is missing.");
  if (!talentId) return console.log("talent ID is missing.");

  try {
    const credit = await prisma.credit.create({
      data: {
        ...values,
        talentProfileId: talentId,
      },
    });

    return credit;
  } catch (error) {
    console.log("Failed to update credit", error);
  }
};

export const updateCredit = async ({
  values,
  creditId,
}: updateCreditValues) => {
  const { userId } = auth();

  if (!userId) return console.log("User ID is missing.");

  try {
    const credit = await prisma.credit.update({
      where: {
        id: creditId,
      },
      data: {
        ...values,
      },
    });

    return credit;
  } catch (error) {
    console.log("Failed to update credit", error);
  }
};
