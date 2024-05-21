const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"

export type SubjectResponse = Subject[]

export interface Subject {
    nama_subjek: string
    sesi: string
    kod_kursus: string
    status: string
    kod_subjek: string
    semester: number
    tahun_kursus: number
    seksyen: number
}

export async function getSubjects(no_matrik?: string) {
    try {
        if (!no_matrik) {
            throw new Error("No matric number")
        }

        const subjectParams = { 'entity': 'pelajar_subjek', 'no_matrik': no_matrik }
        const subjectGetData = new URLSearchParams(subjectParams).toString()
        const response = await fetch(baseURL + '?' + subjectGetData)
        const data = await response.json()
        console.log(data)
        const subjects = data as SubjectResponse
        return subjects
    } catch (error) {
        console.error("An error occured.")
    }
}