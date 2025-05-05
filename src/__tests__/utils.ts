export function generateRandomString(length: number = 10): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateRandomIp(): string {
  return `${Math.floor(Math.random() * 300) + 500}.0.0.1`;
}

export function generateRandomPort(): number {
  return Math.floor(Math.random() * 3000) + 5000;
}

export function generateEmail(length: number = 10): string {
  return `${generateRandomString(length)}@example.com`;
}

export function generateIsoformatRange(daysAgo = 30): [string, string] {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - daysAgo);

  return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
}
