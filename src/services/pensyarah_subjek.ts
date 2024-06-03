import { redirect } from "@tanstack/react-router";

const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=pensyarah_subjek&no_pekerja=???
//sessionid=422921549401511
//adminsesiid=566831540934075

//need admin access

const response = [
    {
        nama_subjek: "Software Quality Assurance",
        sesi: "2023/2024",
        bil_pelajar: 23,
        semester: 2,
        seksyen: 3,
        kod_subjek: "SECJ3343",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SECJ4383",
        semester: 2,
        seksyen: 1,
        nama_subjek: "Software Construction",
        sesi: "2023/2024",
        bil_pelajar: 35
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SECJ4383",
        seksyen: 5,
        semester: 2,
        bil_pelajar: 33,
        nama_subjek: "Software Construction",
        sesi: "2023/2024"
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        semester: 1,
        seksyen: 3,
        nama_subjek: "Software Design Architecture",
        sesi: "2023/2024",
        bil_pelajar: 39,
        kod_subjek: "SECJ3323"
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SECJ3323",
        semester: 1,
        seksyen: 1,
        sesi: "2023/2024",
        nama_subjek: "Software Design Architecture",
        bil_pelajar: 33
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        seksyen: 2,
        semester: 1,
        bil_pelajar: 34,
        sesi: "2023/2024",
        nama_subjek: "Applications Development",
        kod_subjek: "SECJ3104"
    },
    {
        seksyen: 12,
        semester: 2,
        bil_pelajar: 17,
        sesi: "2022/2023",
        nama_subjek: "Software Engineering",
        kod_subjek: "SECJ2203",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SECJ4383",
        bil_pelajar: 38,
        nama_subjek: "Software Construction",
        sesi: "2022/2023",
        seksyen: 1,
        semester: 2
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        nama_subjek: "Software Construction",
        sesi: "2022/2023",
        bil_pelajar: 24,
        semester: 2,
        seksyen: 4,
        kod_subjek: "SECJ4383"
    },
    {
        kod_subjek: "SECJ3323",
        semester: 1,
        seksyen: 3,
        sesi: "2022/2023",
        nama_subjek: "Software Design Architecture",
        bil_pelajar: 46,
        no_pekerja: 30744,
        kod_fakulti: "FSKSM"
    },
    {
        kod_subjek: "SECJ3323",
        nama_subjek: "Software Design Architecture",
        sesi: "2022/2023",
        bil_pelajar: 36,
        semester: 1,
        seksyen: 1,
        no_pekerja: 30744,
        kod_fakulti: "FSKSM"
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SECJ3104",
        sesi: "2022/2023",
        nama_subjek: "Applications Development",
        bil_pelajar: 30,
        semester: 1,
        seksyen: 4
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        semester: 2,
        seksyen: 2,
        nama_subjek: "Pembinaan Perisian",
        sesi: "2021/2022",
        bil_pelajar: 38,
        kod_subjek: "SCSJ4383"
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        bil_pelajar: 46,
        nama_subjek: "Pembinaan Perisian",
        sesi: "2021/2022",
        seksyen: 1,
        semester: 2,
        kod_subjek: "SCSJ4383"
    },
    {
        seksyen: 1,
        semester: 2,
        bil_pelajar: 39,
        nama_subjek: "Object-Oriented Programming",
        sesi: "2021/2022",
        kod_subjek: "SECJ2154",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        bil_pelajar: 48,
        sesi: "2021/2022",
        nama_subjek: "Software Design Architecture",
        seksyen: 3,
        semester: 1,
        kod_subjek: "SECJ3323",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        semester: 1,
        seksyen: 1,
        sesi: "2021/2022",
        nama_subjek: "Software Design Architecture",
        bil_pelajar: 38,
        kod_subjek: "SECJ3323",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        kod_subjek: "SECJ3104",
        nama_subjek: "Applications Development",
        sesi: "2021/2022",
        bil_pelajar: 44,
        semester: 1,
        seksyen: 1,
        no_pekerja: 30744,
        kod_fakulti: "FSKSM"
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SECJ2203",
        semester: 2,
        seksyen: 8,
        nama_subjek: "Software Engineering",
        sesi: "2020/2021",
        bil_pelajar: 38
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SCSJ4383",
        seksyen: 3,
        semester: 2,
        bil_pelajar: 37,
        sesi: "2020/2021",
        nama_subjek: "Pembinaan Perisian"
    },
    {
        kod_subjek: "SCSJ4383",
        semester: 2,
        seksyen: 2,
        nama_subjek: "Pembinaan Perisian",
        sesi: "2020/2021",
        bil_pelajar: 45,
        no_pekerja: 30744,
        kod_fakulti: "FSKSM"
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        sesi: "2020/2021",
        nama_subjek: "Teknik Pengaturcaraan I",
        bil_pelajar: 35,
        semester: 1,
        seksyen: 8,
        kod_subjek: "SECJ1013"
    },
    {
        sesi: "2020/2021",
        nama_subjek: "Rekabentuk & Senibina Perisian",
        bil_pelajar: 48,
        semester: 1,
        seksyen: 2,
        kod_subjek: "SCSJ3323",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        seksyen: 4,
        semester: 1,
        bil_pelajar: 33,
        sesi: "2020/2021",
        nama_subjek: "Rekabentuk & Senibina Perisian",
        kod_subjek: "SCSJ3323",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        no_pekerja: 30744,
        kod_fakulti: "FSKSM",
        kod_subjek: "SCSJ4383",
        seksyen: 2,
        semester: 2,
        bil_pelajar: 30,
        nama_subjek: "Pembinaan Perisian",
        sesi: "2019/2020"
    },
    {
        semester: 2,
        seksyen: 4,
        sesi: "2019/2020",
        nama_subjek: "Kejuruteraan Perisian",
        bil_pelajar: 39,
        kod_subjek: "SCSJ2203",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        semester: 2,
        seksyen: 1,
        sesi: "2019/2020",
        nama_subjek: "Kejuruteraan Perisian",
        bil_pelajar: 36,
        kod_subjek: "SCSJ2203",
        kod_fakulti: "FSKSM",
        no_pekerja: 30744
    },
    {
        kod_fakulti: "FSKSM",
        no_pekerja: 30744,
        bil_pelajar: 35,
        nama_subjek: "Teknik Pengaturcaraan I",
        sesi: "2019/2020",
        seksyen: 3,
        semester: 1,
        kod_subjek: "SECJ1013"
    }
]

export type LecturerSubjectResponse = LecturerSubject[]
export interface LecturerSubject {
    no_pekerja: number
    bil_subjek: number
    bil_seksyen: number
    nama_subjek: string
    sesi: string
    semester: number
    seksyen: number
    kod_subjek: string
    kod_fakulti: string
}

/**
 * Fetches the list of subjects for a lecturer.
 * @param {number} no_pekerja - The lecturer's staff ID.
 * @returns {Promise<LecturerSubjectResponse | undefined>} - A promise that resolves with the lecturer's subjects.
 */
export async function getSubjectsByLecturer(no_pekerja: number): Promise<LecturerSubjectResponse | undefined> {
    const subjectParams = { entity: 'pensyarah_subjek', no_pekerja: no_pekerja.toString() };
    const subjectQuery = new URLSearchParams(subjectParams).toString();

    try {
        const response = await fetch(`${baseURL}?${subjectQuery}`);
        const data = await response.json() as LecturerSubjectResponse;
        console.log(data);
        return data;
    } catch (error) {
        redirect({
            to: "/login",
        })
        console.error("Error fetching subjects:", error);
    }
}