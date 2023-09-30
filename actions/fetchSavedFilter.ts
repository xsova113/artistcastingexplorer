import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

export const fetchSavedFilter = async () => {
  const user = await currentUser();

  if (!user) return console.log("User not found");

  const savedFilter = await prisma.userSavedFilter.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      savedFilters: true,
    },
  });

  return savedFilter;
};
