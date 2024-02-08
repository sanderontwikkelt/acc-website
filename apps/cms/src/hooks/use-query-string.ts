import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "./use-debounce";

export const useQueryString = (
  value: string,
  selectedValue: string,
  filterVariety: string,
) => {
  const searchParams = useSearchParams();
  const debounceValue = useDebounce(value, 500);
  const router = useRouter();
  const pathname = usePathname();

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  React.useEffect(() => {
    if (debounceValue.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedValue]: `${debounceValue}${
            debounceValue.length > 0 ? `.${filterVariety}` : ""
          }`,
        })}`,
        {
          scroll: false,
        },
      );
    }

    if (debounceValue.length === 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedValue]: null,
        })}`,
        {
          scroll: false,
        },
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, filterVariety, selectedValue]);
  return createQueryString;
};
