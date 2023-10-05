import { SavedFilter, UserSavedFilter } from "@prisma/client";

export type UserSavedFilterType = UserSavedFilter & {
  savedFilters: SavedFilter[];
};
