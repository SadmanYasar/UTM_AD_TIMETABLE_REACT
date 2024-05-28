const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";

export type SubjectTableResponse = SubjectTable[];

export interface SubjectTable {
    hari: number; // Day of the week, 0 for Sunday, 1 for Monday, etc.
    seksyen: number;
    id_jws: string;
    kod_subjek: string;
    masa: number; // Time in 24-hour format, e.g., 700 for 7:00 AM
    ruang: Ruang;
}

export interface Ruang {
    kod_ruang: string;
    nama_ruang_singkatan: string;
    nama_ruang: string;
}

/**
 * Fetches the timetable for a given subject.
 * @param {string} sesi - The session.
 * @param {string} semester - The semester.
 * @param {string} kod_subjek - The subject code.
 * @param {string} seksyen - The section.
 * @returns {Promise<SubjectTableResponse | undefined>} - A promise that resolves with the subject table response data.
 */
export async function getTimeTable(sesi: string, semester: string, kod_subjek: string, seksyen: string): Promise<SubjectTableResponse | undefined> {
    const subjectParams = { entity: 'jadual_subjek', sesi, semester, kod_subjek, seksyen };
    const subjectQuery = new URLSearchParams(subjectParams).toString();

    try {
        const response = await fetch(`${baseURL}?${subjectQuery}`);
        const data = await response.json() as SubjectTableResponse;
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching timetable:", error);
    }
}

/**
 * Formats the timetable data for rendering.
 * @param {SubjectTableResponse} timetableData - The raw timetable data.
 * @returns {string[][]} - A 2D array representing the formatted timetable.
 */
export function formatTimeTable(timetableData: SubjectTableResponse): string[][] {
    // Create a 2D array with empty strings
    const formattedTable: string[][] = Array.from({ length: 12 }, () => Array(7).fill(""));

    timetableData.forEach(subject => {
        const dayIndex = subject.hari;
        const timeIndex = Math.floor((subject.masa - 700) / 100); // Convert 24-hour time to table row index

        if (timeIndex >= 0 && timeIndex < 12 && dayIndex >= 0 && dayIndex < 7) {
            formattedTable[timeIndex][dayIndex] = subject.kod_subjek;
        }
    });

    return formattedTable;
}
