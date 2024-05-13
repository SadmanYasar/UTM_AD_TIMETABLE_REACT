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