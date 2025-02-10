"use server";

import { cookies } from "next/headers";

export const setDarkModeCookie = async (darkMode: boolean) => {
  const cookieStore = await cookies();

  cookieStore.set("darkMode", darkMode ? "true" : "false");
};

export const getDarkModeCookie = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("darkMode");
};
