/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { EntityEnum } from "types/permissions";
import { useRouter } from "next/navigation";

import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";

const toastMessage = {
  delete: "Succesvol verwijderd!",
  create: "Succesvol aangemaakt!",
  update: "Succesvol opgeslagen!",
};

export const useMutation = (
  entity: EntityEnum,
  method: "delete" | "create" | "update",
  route?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((data: any) => Promise<any>) => {
  const utils = api.useUtils();
  const router = useRouter();
  return api[entity][method].useMutation({
    onSuccess: async () => {
      router.refresh();
      await utils[entity].invalidate();
      toast.success(toastMessage[method]);
      if (route) router.push(route);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "Niet ingelogd. Log opnieuw in en probeer opnieuw."
          : "Actie is mislukt.",
      );
    },
  }).mutateAsync;
};
