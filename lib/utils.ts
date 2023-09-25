import { TalentProfileType } from "@/types/talentProfileType";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getAge(dateString: string) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const fetchFilteredTalents = (
  talents: TalentProfileType[],
  searchParams: { name: string; status: string; email: string },
) => {
  const filteredTalents = !searchParams
    ? talents
    : talents?.filter(
        (talent) =>
          (!searchParams.status
            ? true
            : talent.isApproved ===
              (searchParams.status === "approved"
                ? true
                : searchParams.status === "rejected"
                ? false
                : searchParams.status === "pending" && null)) &&
          (!searchParams.name
            ? true
            : talent.lastName
                .toLowerCase()
                .replaceAll(" ", "")
                .includes(
                  searchParams.name.toLowerCase().replaceAll("%20", ""),
                ) ||
              talent.firstName
                .toLowerCase()
                .replaceAll(" ", "")
                .includes(
                  searchParams.name.toLowerCase().replaceAll("%20", ""),
                )) &&
          (!searchParams.email
            ? true
            : talent.email
                .toLowerCase()
                .includes(
                  searchParams.email.toLowerCase().replace("%40", "@"),
                )),
      );

  return filteredTalents;
};
