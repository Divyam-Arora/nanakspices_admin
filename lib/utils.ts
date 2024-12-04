import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function changePosition(list: any[], selected, direction: -1 | 1) {
  const selectedIndex = list.findIndex((f) => f == selected);
  if (
    selected &&
    ((selectedIndex > 0 && direction == -1) ||
      (selectedIndex < list.length - 1 && direction == 1))
  ) {
    let temp = list[selectedIndex];
    list[selectedIndex] = list[selectedIndex + direction];
    list[selectedIndex + direction] = temp;
    return [...list];
  }
  return list;
}
