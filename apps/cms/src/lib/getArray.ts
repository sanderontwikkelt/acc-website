/* eslint-disable @typescript-eslint/no-unsafe-return */
export const getArray = (data) => {
  if (data && typeof data === "object" && Array.isArray(data)) {
    return data;
  } else {
    return [];
  }
};
