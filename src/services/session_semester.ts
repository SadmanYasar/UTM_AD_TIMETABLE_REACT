const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester"

export type SesiSemesterResponse = SesiSemester[]

export interface SesiSemester {
    tarikh_tamat: string
    semester: number
    sesi: string
    sesi_semester_id: string
    tarikh_mula: string
}

/**
 * Fetches the list of sesi semester.
 * @returns {Promise<SesiSemesterResponse>} - A promise that resolves with the sesi semester response data.
 */
export async function fetchSesiSemester(): Promise<SesiSemesterResponse> {
    try {
        const response = await fetch(baseURL)
        const data = await response.json() as SesiSemesterResponse
        console.log(data)
        return data
    } catch (error) {
        console.error("Error getting SesiSemester!")
    }
    return []
}
