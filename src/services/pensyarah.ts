import { redirect } from "@tanstack/react-router";
import { getSessionDetails } from "@/lib/utils";

const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";

export type LecturerResponse = Lecturer[];

export interface Lecturer {
    bil_subjek: number;
    bil_seksyen: number;
    no_pekerja: number;
    bil_pelajar: number;
    nama: string;
}

/**
 * Fetches the list of lecturers.
 * @param {number} semester - The semester.
 * @returns {Promise<LecturerResponse | undefined>} - A promise that resolves with the lecturer response data.
 */
export async function getLecturers(semester: number): Promise<LecturerResponse | undefined> {
    const sessionDetails = getSessionDetails();
    if (!sessionDetails) {
        redirect({
            to: "/login",
        });
        return;
    }

    const lecturerParams = {
        entity: 'pensyarah',
        session_id: sessionDetails.session_id,
        sesi: sessionDetails.admin_session_id,
        semester: semester.toString(),
    };
    const lecturerQuery = new URLSearchParams(lecturerParams).toString();

    try {
        const response = await fetch(`${baseURL}?${lecturerQuery}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Response text:", text); // Log the raw response text for debugging

        if (!text) {
            throw new Error("Empty response from server");
        }

        try {
            const data = JSON.parse(text) as LecturerResponse;
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error parsing JSON:", error, "Response text:", text);
            throw new Error("Error parsing JSON");
        }
    } catch (error) {
        console.error("Error fetching lecturers:", error);
        return undefined; // Return undefined if an error occurs
    }
}
