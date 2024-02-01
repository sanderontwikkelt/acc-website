import type { ClassValue } from "clsx";
import type { ActionEnum, EntityEnum } from "types/permissions";
import { useMemo } from "react";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const useHasPermissions = (
  ...permissions: [entity: EntityEnum, action: ActionEnum][]
): boolean[] => {
  const session = useSession();

  const permissionChecks = useMemo(() => {
    if (!session?.data) return permissions.map(() => false);

    return permissions.map(
      ([entity, action]) =>
        session.data.user.permissions?.some(
          (p) =>
            [entity, "all"].includes(p.entity!) &&
            [action, "all"].includes(p.action!),
        ) || false,
    );
  }, [session.data, permissions]);

  return permissionChecks;
};

export const getDateString = (daysToSubtract = 0, date = new Date()) => {
  let yourDate = date;
  yourDate.setDate(yourDate.getDate() - daysToSubtract);
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return yourDate.toISOString().split("T")[0];
};

export const formatDate = (date: Date) => {
  const twoDigits = (num: number) => (num < 10 ? "0" + num : num);

  const day = twoDigits(date.getDate());
  const month = twoDigits(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = twoDigits(date.getHours());
  const minutes = twoDigits(date.getMinutes());

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
