import { Filter, FilterKeys } from "@/routes/subjects"
import { AppStorage } from "@/services/auth"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
* @description
* Check if the user is authenticated
* 
* @return {boolean} - Returns true if the user is authenticated, false otherwise
* 
* @example
* if (isAuthenticated()) {
*   // Do something
* }
*/
export function isAuthenticated(): boolean {
  return sessionStorage.getItem("web_fc_utm_my_ttms") !== null
}

export function getUser() {
  //gets the user from session storage and parses to AppStorage type
  const user: AppStorage | null = JSON.parse(sessionStorage.getItem('web_fc_utm_my_ttms') || 'null')

  return user
}

/**
 * Checks if the given filter query is empty.
 * @param filterQuery - The filter query object.
 * @returns True if the filter query is empty, false otherwise.
 */
export const isFilterEmpty = (filterQuery: Filter) => {
  return Object.values(filterQuery).every((value) => value === "" || value === 0);
};

/**
 * Creates a new filter query object by removing empty or zero values from the input filter query object.
 * @param filterQuery - The filter query object to be filtered.
 * @returns A new filter query object with empty or zero values removed.
 */
export const newfilterQuery = (filterQuery: Filter) => {
  return Object.entries(filterQuery).reduce((acc, [key, value]) => {
    if (value !== "" && value !== 0) {
      acc[key as FilterKeys] = value;
    }
    return acc;
  }, {} as Filter);
};