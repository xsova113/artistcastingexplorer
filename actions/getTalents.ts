"use server";

import prisma from "@/lib/client";
import { TalentProfileType } from "@/types/talentProfileType";
import { City, GenderType, Province, Role } from "@prisma/client";

export const getTalents = async (): Promise<
  TalentProfileType[] | undefined
> => {
  try {
    const recentlyUpdatedTalents = await prisma.talentProfile.findMany({
      include: {
        images: true,
        videos: true,
        location: true,
        performerType: true,
        skills: true,
        credits: true,
        savedByUsers: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return recentlyUpdatedTalents;
  } catch (error) {
    console.log("Error fetching talents data: " + error);
  }
};

export const getApprovedTalents = async ({
  currentPage,
  itemsPerPage,
  name,
  ageMax,
  ageMin,
  role,
  city,
  gender,
  heightMax,
  heightMin,
  keyword,
  province,
  orderBy,
}: {
  currentPage?: number;
  itemsPerPage?: number;
  name?: string;
  ageMax?: number;
  ageMin?: number;
  city?: City;
  province?: Province;
  gender?: GenderType;
  role?: Role;
  heightMax?: number;
  heightMin?: number;
  keyword?: string;
  orderBy?: "name-a" | "name-z" | "recently_updated";
}): Promise<TalentProfileType[] | undefined> => {
  try {
    const recentlyUpdatedTalents = await prisma.talentProfile.findMany({
      where: {
        isApproved: true,
        firstName: { contains: name, mode: "insensitive" },
        ageMax: { lte: ageMax || undefined },
        ageMin: { gte: ageMin || undefined },
        location: {
          city: { equals: city || undefined },
          province: { equals: province || undefined },
        },
        gender: { equals: gender || undefined },
        performerType: {
          role: { equals: role || undefined },
        },
        height: {
          gte: heightMin || undefined,
          lte: heightMax || undefined,
        },
        stageName: { contains: keyword || undefined },
      },
      include: {
        images: true,
        videos: true,
        location: true,
        performerType: true,
        skills: true,
        credits: true,
        savedByUsers: true,
      },
      orderBy: {
        firstName:
          orderBy === "name-a"
            ? "asc"
            : orderBy === "name-z"
            ? "desc"
            : undefined,
        createdAt: orderBy === "recently_updated" ? "desc" : undefined,
      },
      take:
        itemsPerPage && currentPage
          ? itemsPerPage * (currentPage + 1)
          : undefined,
    });

    return recentlyUpdatedTalents;
  } catch (error) {
    console.log("Error fetching talents data: " + error);
  }
};
