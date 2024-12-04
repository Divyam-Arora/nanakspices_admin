"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const refresh = (productId: string) => {
  revalidatePath(`/inventory/${productId}`, "page");
};
