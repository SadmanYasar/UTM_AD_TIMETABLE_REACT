const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=subjek&sesi=yyyy/yyyy&semester=[1|2]

const response = [
    {
        bil_pensyarah: 0,
        kod_subjek: "UHLB2122",
        bil_seksyen: 2,
        nama_subjek: "ACADEMIC COMMUNICATION SKILLS",
        bil_pelajar: 41
    },
    {
        bil_pensyarah: 1,
        bil_pelajar: 0,
        bil_seksyen: 1,
        nama_subjek: "Advanced Analytics for Data Science",
        kod_subjek: "MCSD2213"
    },
    {
        bil_pensyarah: 1,
        bil_pelajar: 0,
        kod_subjek: "MECS1033",
        bil_seksyen: 1,
        nama_subjek: "Advanced Artificial Intelligence"
    },
]

export type SubjectResponse = Subject[]

export interface Subject {
    bil_subjek: number
    bil_seksyen: number
    no_pekerja: number
    bil_pelajar: number
    nama: string
}

/**
 * Fetches the subjects by sesi and semester.
 * @param {string} sesi - The session.
 * @param {number} semester - The semester.
 * @returns {Promise<SubjectResponse | undefined>} - A promise that resolves with the subject response data.
 */
export async function getSubjectsBySesiAndSemester(sesi: string, semester: number): Promise<SubjectResponse | undefined> {
    const subjectParams = { entity: 'subjek', sesi, semester: semester.toString() };
    const subjectQuery = new URLSearchParams(subjectParams).toString();

    try {
        const response = await fetch(`${baseURL}?${subjectQuery}`);
        const data = await response.json() as SubjectResponse;
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}