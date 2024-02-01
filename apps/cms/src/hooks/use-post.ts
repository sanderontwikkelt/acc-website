import type { EntityEnum } from "types/permissions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { api } from "~/trpc/react";

interface ReturnType {
  mutate: (id: string) => void;
}

export const useDelete = (entity: EntityEnum, route: string): ReturnType => {
  const utils = api.useUtils();
  const router = useRouter();
  return api[entity].create.useMutation({
    onSuccess: async () => {
      await utils[entity].invalidate();
      router.push(route);
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "Log opnieuw in om te verwijderen."
          : "Verwijderen is mislukt.",
      );
    },
  }) as ReturnType;
};
