import { redirect } from "@tanstack/react-router";

const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=pensyarah&session_id=???&sesi=yyyy/yyyy&semester=[1|2]
//sessionid=438055248431195
//adminsesiid=566831540934075

//can be accessed as an admin only
const response = [
    {
        bil_subjek: 2,
        bil_seksyen: 3,
        no_pekerja: 30744,
        bil_pelajar: 79,
        nama: "ADILA FIRDAUS BINTI ARBAIN"
    },
    {
        bil_subjek: 2,
        bil_seksyen: 3,
        no_pekerja: 15136,
        nama: "AHMAD FARIZ BIN ALI",
        bil_pelajar: 78
    },
    {
        no_pekerja: 33326,
        bil_pelajar: 132,
        nama: "AHMAD NAJMI BIN AMERHAIDER NUAR",
        bil_subjek: 2,
        bil_seksyen: 4
    },
    {
        no_pekerja: 17980,
        nama: "AIDA BT. ALI",
        bil_pelajar: 93,
        bil_subjek: 1,
        bil_seksyen: 3
    },
    {
        bil_subjek: 1,
        bil_seksyen: 2,
        no_pekerja: 22516,
        bil_pelajar: 55,
        nama: "AJUNE WANIS BINTI ISMAIL"
    },
    {
        bil_pelajar: 100,
        nama: "ALIF RIDZUAN BIN KHAIRUDDIN",
        no_pekerja: 33368,
        bil_seksyen: 3,
        bil_subjek: 2
    },
    {
        bil_pelajar: 66,
        nama: "ANAZIDA BT. ZAINAL",
        no_pekerja: 15364,
        bil_seksyen: 2,
        bil_subjek: 1
    },
    {
        bil_seksyen: 2,
        bil_subjek: 2,
        nama: "ARAFAT MOHAMMED RASHAD",
        bil_pelajar: 44,
        no_pekerja: 30676
    },
]

export type LecturerResponse = Lecturer[]

export interface Lecturer {
    bil_subjek: number
    bil_seksyen: number
    no_pekerja: number
    bil_pelajar: number
    nama: string
}

/**
 * Fetches the list of lecturers.
 * @param {string} session_id - The session ID.
 * @param {string} sesi - The session.
 * @param {number} semester - The semester.
 * @returns {Promise<LecturerResponse | undefined>} - A promise that resolves with the lecturer response data.
 */
export async function getLecturers(session_id: string, sesi: string, semester: number) {
    const lecturerParams = { 'entity': 'pensyarah', 'session_id': session_id, 'sesi': sesi, 'semester': semester.toString() };
    const lecturerQuery = new URLSearchParams(lecturerParams).toString();

    try {
        const response = await fetch(`${baseURL}?${lecturerQuery}`);
        const data = await response.json() as LecturerResponse;
        console.log(data);
        return data;
    } catch (error) {
        redirect({
            to: "/login",
        })
        console.error("Error fetching lecturers:", error);
    }
}