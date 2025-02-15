export function convertToTitleCaseForDisplay(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export function convertToTitleCaseForPath(str: string) {
  const parts = str.split("_");
  const convertedParts = parts.map((part, index) =>
    index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
  );

  return convertedParts.join("");
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}
