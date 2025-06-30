import {clsx} from "clsx";
import {twMerge} from "tailwind-merge"

/**
 * Combines class names using `clsx` and merges Tailwind CSS classes using `twMerge`.
 *
 * @param {...any} inputs - Class names, arrays, or objects to be combined.
 * @returns {string} - The resulting merged class name string.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
