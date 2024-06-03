import { getUser } from "@/lib/utils";
import { redirect } from "@tanstack/react-router";

const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=pelajar&session_id=???&sesi=yyyy/yyyy&semester=[1|2]&limit=num_&offset=num
//sessionid=422921549401511
//adminsesiid=566831540934075

//need admin access

const response: StudentResponse = [
    {
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJH",
        tahun_kursus: 2,
        no_matrik: "B23CS0001",
        bil_subjek: 5,
        nama: "'AISYAH BINTI MOHAMAD SHIRAJUDDIN",
        no_kp: "-"
    },
    {
        kod_kursus: "SECJH",
        kod_fakulti: "FSKSM",
        no_kp: "-",
        no_matrik: "A20EC4061",
        bil_subjek: 6,
        tahun_kursus: 3,
        nama: "A K M SHAFIN ALAM"
    },
    {
        tahun_kursus: 2,
        no_matrik: "A22EC0129",
        bil_subjek: 6,
        nama: "A'ISYAH MAWADDAH BINTI MOHD RODUAN",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJH"
    },
    {
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJ",
        nama: "AARAF ISLAM",
        no_matrik: "A20EC4001",
        bil_subjek: 5,
        tahun_kursus: 4,
        no_kp: "-"
    },
    {
        no_kp: "-",
        nama: "AARON TAN",
        no_matrik: "A21EC0152",
        bil_subjek: 7,
        tahun_kursus: 3,
        kod_kursus: "SECJH",
        kod_fakulti: "FSKSM"
    },
    {
        kod_fakulti: "FSKSM",
        kod_kursus: "SECRH",
        no_matrik: "A23CS0203",
        nama: "AARON TAN YOONG THZEN",
        bil_subjek: 6,
        tahun_kursus: 1,
        no_kp: "-"
    },
    {
        no_matrik: "A23CS0029",
        bil_subjek: 6,
        tahun_kursus: 1,
        nama: "ABBENISHA ANN MICHAEL BENEDICT",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECVH"
    },
    {
        no_kp: "-",
        bil_subjek: 7,
        no_matrik: "A23CS3022",
        tahun_kursus: 1,
        nama: "ABDALLA ALI ABDALLA ALI",
        kod_kursus: "SECJH",
        kod_fakulti: "FSKSM"
    },
    {
        bil_subjek: 6,
        no_matrik: "A23CS0003",
        tahun_kursus: 1,
        nama: "ABDALLAH MOHAMED MAHMOUD MOHAMED MAHMOUD",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECRH"
    },
    {
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJH",
        nama: "ABDELRAHMAN ELFATIH ABDELRAHMAN AHMED",
        no_matrik: "A23CS4032",
        bil_subjek: 6,
        tahun_kursus: 1,
        no_kp: "-"
    },
    {
        no_matrik: "A20EC9118",
        bil_subjek: 5,
        tahun_kursus: 3,
        nama: "ABDELRAHMAN MOUSSA ELSAYED RASHED ELABBASI",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJ"
    },
    {
        nama: "ABDELRAHMAN OSAMA SAID ABDELMOBDY",
        no_matrik: "A23CS4001",
        bil_subjek: 6,
        tahun_kursus: 1,
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECRH"
    },
    {
        no_matrik: "A19EC4001",
        nama: "ABDELRAHMAN RASHAD ALI AHMED ELBARAKAWI",
        bil_subjek: 5,
        tahun_kursus: 3,
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJ"
    },
    {
        no_matrik: "A18CS0001",
        tahun_kursus: 4,
        bil_subjek: 1,
        nama: "ABDUL ALIM BIN MOHAMAD SUKRI",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SCSJ"
    },
    {
        bil_subjek: 7,
        no_matrik: "A21EC0001",
        tahun_kursus: 3,
        nama: "ABDUL AZIM BIN ANUAR VEERA",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECRH"
    },
    {
        kod_kursus: "SECJH",
        kod_fakulti: "FSKSM",
        no_kp: "-",
        bil_subjek: 6,
        no_matrik: "A22EC0130",
        tahun_kursus: 2,
        nama: "ABDUL AZIZ BIN MABENI"
    },
    {
        kod_kursus: "SECVH",
        kod_fakulti: "FSKSM",
        no_kp: "-",
        tahun_kursus: 4,
        no_matrik: "A20EC8024",
        bil_subjek: 5,
        nama: "ABDUL BARIK HABIBI BIN MOHD ISKANDA"
    },
    {
        bil_subjek: 7,
        no_matrik: "A20EC4003",
        tahun_kursus: 4,
        nama: "ABDUL HAKEEM BUNZAH USMAN",
        no_kp: "-",
        kod_fakulti: "FSKSM",
        kod_kursus: "SECJ"
    },
    {
        kod_fakulti: "FSKSM",
        kod_kursus: "SECRH",
        tahun_kursus: 2,
        no_matrik: "B23CS0002",
        bil_subjek: 7,
        nama: "ABDUL MATEEN BIN ABDUL SAMAD",
        no_kp: "-"
    },
    {
        kod_kursus: "SECPH",
        kod_fakulti: "FSKSM",
        no_kp: "-",
        no_matrik: "A21EC0002",
        nama: "ABDUL MUHAIMIN BIN ABDUL RAZAK",
        bil_subjek: 4,
        tahun_kursus: 3
    }
]

export type StudentResponse = Student[]
export interface Student {
    kod_fakulti: string
    kod_kursus: string
    tahun_kursus: number
    no_matrik: string
    bil_subjek: number
    nama: string
    no_kp: string
}

/**
 * Fetches the student data.
 * @param {string} session_id - The session ID.
 * @param {string} sesi - The session.
 * @param {number} semester - The semester.
 * @param {number} limit - The limit.
 * @param {number} offset - The offset.
 * @returns {Promise<StudentResponse | undefined>} - A promise that resolves with the student data.
 */
export async function getStudents(session_id: string, sesi: string, semester: number, limit: number, offset: number): Promise<StudentResponse | undefined> {
    const studentParams = { entity: 'pelajar', session_id, sesi, semester: semester.toString(), limit: limit.toString(), offset: offset.toString() };
    const studentQuery = new URLSearchParams(studentParams).toString();

    try {
        const response = await fetch(`${baseURL}?${studentQuery}`);
        const data = await response.json() as StudentResponse;
        console.log(data);
        return data;
    } catch (error) {
        redirect({
            to: "/login",
        })
        console.error("Error fetching students:", error);
    }
}