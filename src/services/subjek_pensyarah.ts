const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=subjek_pensyarah&kod_subjek=???[&sesi=yyyy/yyyy&semester=[1|2]&seksyen=???

const response: SubjectLecturerResponse = [
    {
        sesi: "2023/2024",
        semester: 2,
        nama: "ADILA FIRDAUS BINTI ARBAIN",
        seksyen: 3
    }
]

export interface SubjectLecturer {
    sesi: string
    semester: number
    nama: string
    seksyen: number
}

export type SubjectLecturerResponse = SubjectLecturer[];

/**
 * Retrieves the subject lecturer information based on the provided parameters.
 * @param kod_subjek - The subject code.
 * @param sesi - The session.
 * @param semester - The semester.
 * @param seksyen - The section.
 * @returns A Promise that resolves to the subject lecturer information.
 * @throws If there is an error fetching the subject lecturer information.
 */
export async function getSubjectLecturer(kod_subjek: string, sesi: string, semester: number, seksyen: number) {
    try {
        const subjekPensyarahParams = { 'entity': 'subjek_pensyarah', 'kod_subjek': kod_subjek, 'sesi': sesi, 'semester': semester.toString(), 'seksyen': seksyen.toString() }
        const subjekPensyarahGetData = new URLSearchParams(subjekPensyarahParams).toString()

        const response = await fetch(baseURL + '?' + subjekPensyarahGetData)
        const data = await response.json()
        const subjekPensyarah = data as SubjectLecturerResponse
        return subjekPensyarah
    } catch (error) {
        console.error("Error fetching subject lecturer:", error)
        throw error
    }
}