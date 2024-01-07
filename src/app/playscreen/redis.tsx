import { kv } from "@vercel/kv";

export const setData = async (key: string, value: any) => {
  await kv.set(key, JSON.stringify(value));
};