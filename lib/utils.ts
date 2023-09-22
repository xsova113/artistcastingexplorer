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
  searchParams: { lastName: string; status: string; email: string },
) => {
  const filteredTalents =
    !searchParams.email && !searchParams.lastName && !searchParams.status
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
            (searchParams.lastName?.toLowerCase()
              ? talent.lastName.toLowerCase() ===
                searchParams.lastName.toLowerCase()
              : true) &&
            (!searchParams.email
              ? true
              : talent.email.toLowerCase() ===
                searchParams.email.toLowerCase().replace("%40", "@")),
        );

  return filteredTalents;
};
