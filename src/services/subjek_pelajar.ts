import { redirect } from "@tanstack/react-router";

const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=subjek_pelajar&session_id=???&sesi=yyyy/yyyy&semester=[1|2]&kod_subjek=???&seksyen=???

//need admin access
const response: StudentOfCourseResponse = [
    {
        kod_fakulti: "FSKSM",
        no_kp: "020918140540",
        nama: "'AISYAH BINTI MOHAMAD SHIRAJUDDIN",
        kod_kursus: "SECJH",
        status: "-",
        tahun_kursus: 2
    },
    {
        tahun_kursus: 2,
        no_kp: "202209M10204",
        kod_fakulti: "FSKSM",
        nama: "AFLAKH RASIKH IBADURRAHMAN",
        kod_kursus: "SECJH",
        status: "-"
    },
    {
        tahun_kursus: 2,
        nama: "AHMAD RAZAN ALKHAWARIZMI",
        kod_kursus: "SECJH",
        status: "-",
        no_kp: "202210M10490",
        kod_fakulti: "FSKSM"
    },
    {
        no_kp: "202203M10239",
        kod_fakulti: "FSKSM",
        nama: "AHMED MUSTAFA MOHAMED IBRAHIM",
        status: "-",
        kod_kursus: "SECJH",
        tahun_kursus: 2
    },
    {
        no_kp: "202210F10107",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJH",
        nama: "ALBATOUL WALEED MAHMOUD HASSAN YOUSSEF",
        status: "-",
        tahun_kursus: 2
    },
    {
        tahun_kursus: 2,
        kod_kursus: "SECJH",
        nama: "AQILLA NOORSHAUMY",
        status: "-",
        no_kp: "202210F10149",
        kod_fakulti: "FSKSM"
    },
    {
        tahun_kursus: 2,
        status: "-",
        nama: "ATHARALIKH BAIHAQI MUBARAK",
        kod_kursus: "SECJH",
        no_kp: "202210M10317",
        kod_fakulti: "FSKSM"
    },
    {
        no_kp: "202210F10152",
        kod_fakulti: "FSKSM",
        nama: "ESHA SHUBHERTHEE",
        status: "-",
        kod_kursus: "SECJH",
        tahun_kursus: 2
    },
]

export type StudentOfCourseResponse = StudentOfCourse[]

export interface StudentOfCourse {
    kod_fakulti: string
    no_kp: string
    nama: string
    kod_kursus: string
    status: string
    tahun_kursus: number
}

/**
 * Get the list of students for a course.
 * @param {string} sessionID - The session ID for the admin user.
 * @param {string} sesi - The session for the course.
 * @param {number} semester - The semester for the course.
 * @param {string} kod_subjek - The subject code for the course.
 * @param {string} seksyen - The section for the course.
 * @returns A Promise that resolves to the list of students for the course.
 */
export async function getStudentsOfCourse(sessionID: string, sesi: string, semester: number, kod_subjek: string, seksyen: string) {
    const subjekPelajar = { entity: 'subjek_pelajar', session_id: sessionID, sesi, semester: semester.toString(), kod_subjek, seksyen }

    const subjekPelajarGetData = new URLSearchParams(subjekPelajar).toString()
    try {
        const response = await fetch(baseURL + '?' + subjekPelajarGetData)
        const data = await response.json()
        console.log(data)
        const students = data as StudentOfCourseResponse
        return students
    } catch (error) {
        redirect({
            to: "/login",
        })
        console.error("Get students of course error!")
    }
}