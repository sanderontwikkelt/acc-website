import * as React from "react";

export function useDebounce<T>(v: T, delay?: number): T {
  const [value, setValue] = React.useState<T>(v);

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(v), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [v, delay]);

  return value;
}
