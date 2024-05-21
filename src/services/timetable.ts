const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"

export type SubjectTableResponse = SubjectTable[]

export interface SubjectTable {
    hari: number
    seksyen: number
    id_jws: string
    kod_subjek: string
    masa: number
    ruang: Ruang
}

export interface Ruang {
    kod_ruang: string
    nama_ruang_singkatan: string
    nama_ruang: string
}


export async function getTimeTable(sesi: string, semester: string, kod_subjek: string, seksyen: string) {
    const subjectParams = { 'entity': 'jadual_subjek', 'sesi': sesi, 'semester': semester, 'kod_subjek': kod_subjek, 'seksyen': seksyen }
    const subjectGetData = new URLSearchParams(subjectParams).toString()

    try {
        const response = await fetch(baseURL + '?' + subjectGetData)
        const data = await response.json()
        console.log(data)
        const subjectTable = data as SubjectTableResponse
        return subjectTable
    } catch (error) {
        console.error("AJAX error!")
    }
}