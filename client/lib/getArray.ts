function isArrayOrJsonArray(input: any): input is Array<any> | string {
  return (
    Array.isArray(input) ||
    (typeof input === "string" &&
      input.trim().startsWith("[") &&
      input.trim().endsWith("]"))
  );
}

export function getArray(input: any = []): any[] {
  // Check if the input is an array or could be a JSON array string
  if (isArrayOrJsonArray(input)) {
    if (Array.isArray(input)) {
      return input;
    }

    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error("Input is a string but not a JSON array:", e);
    }
  }

  throw new Error("Input is neither an array nor a JSON array.");
}
