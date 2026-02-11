import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function getPageNumbers(current: number, total: number) {
	const pages: (number | "ellipsis")[] = [];

	if (total <= 7) {
		for (let i = 1; i <= total; i++) pages.push(i);
	} else {
		pages.push(1);

		if (current > 3) pages.push("ellipsis");

		for (let i = current - 1; i <= current + 1; i++) {
			if (i > 1 && i < total) pages.push(i);
		}

		if (current < total - 2) pages.push("ellipsis");

		pages.push(total);
	}

	return pages;
}
