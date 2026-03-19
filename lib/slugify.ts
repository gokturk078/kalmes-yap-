export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ş: "s",
    ü: "u",
    ı: "i",
    ö: "o",
    Ç: "C",
    Ğ: "G",
    Ş: "S",
    Ü: "U",
    İ: "I",
    Ö: "O",
  };

  return text
    .split("")
    .map((char) => trMap[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
