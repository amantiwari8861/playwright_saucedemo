import crypto from "node:crypto";

export type UserPayload = {
  name: string;
  email: string;
  password: string;
};

export type ProductPayload = {
  title: string;
  price: number;
  description: string;
  category: string;
  rating: { rate: number; count: number };
};

/**
 * `users.email` is unique, so a fixed address makes every spec pass at most
 * once. Scoping to a random suffix keeps parallel workers and repeat runs from
 * colliding.
 */
export function uniqueEmail(prefix = "pwtest"): string {
  return `${prefix}.${crypto.randomUUID().slice(0, 8)}@example.com`;
}

export function uniqueUser(overrides: Partial<UserPayload> = {}): UserPayload {
  return {
    name: "Playwright User",
    email: uniqueEmail(),
    password: "Test@1234",
    ...overrides,
  };
}

export function productPayload(
  overrides: Partial<ProductPayload> = {},
): ProductPayload {
  return {
    title: `Playwright Product ${crypto.randomUUID().slice(0, 6)}`,
    price: 49.99,
    description: "Created by the Playwright API suite.",
    category: "test",
    rating: { rate: 4, count: 12 },
    ...overrides,
  };
}

/** 1x1 transparent PNG, so the multipart tests send a genuinely decodable image. */
export const TINY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);
