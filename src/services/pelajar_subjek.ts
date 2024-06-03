const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"

export type StudentSubjectResponse = StudentSubject[]

export interface StudentSubject {
    nama_subjek: string
    sesi: string
    kod_kursus: string
    status: string
    kod_subjek: string
    semester: number
    tahun_kursus: number
    seksyen: number
}

/**
 * Retrieves the subjects for a student based on their matric number.
 * @param no_matrik - The matric number of the student.
 * @returns A promise that resolves to the subjects of the student.
 * @throws An error if no_matrik is not provided.
 */
export async function getSubjectsByStudentMatric(no_matrik?: string) {
    try {
        if (!no_matrik) {
            throw new Error("No matric number")
        }

        const subjectParams = { 'entity': 'pelajar_subjek', 'no_matrik': no_matrik }
        const subjectGetData = new URLSearchParams(subjectParams).toString()
        const response = await fetch(baseURL + '?' + subjectGetData)
        const data = await response.json()
        console.log(data)
        const subjects = data as StudentSubjectResponse
        return subjects
    } catch (error) {
        console.error("An error occured.")
    }
}