const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=ruang&kod_fakulti=FSKSM&kod_ruang_like=N28-01-01

const response = [
    {
        kapasiti: 0,
        nama_ruang: "Kod khas untuk tempahan tarikh ujian",
        kod_jabatan: "-",
        nama_ruang_singkatan: "MIDTERM",
        kod_fakulti: "FSKSM",
        jenis: "-",
        kod_ruang: "N28-01-01"
    }
]

export interface Room {
    kapasiti: number,
    nama_ruang: string,
    kod_jabatan: string,
    nama_ruang_singkatan: string,
    kod_fakulti: string,
    jenis: string,
    kod_ruang: string
}

export type RoomResponse = Room[];

/**
 * Retrieves the room information based on the provided parameters.
 * @param kod_fakulti - The faculty code.
 * @param kod_ruang_like - The room code.
 * @returns A Promise that resolves to the room information.
 * @throws If there is an error fetching the room information.
 */
export async function getRoom(kod_fakulti: string, kod_ruang_like: string): Promise<RoomResponse> {
    try {
        const ruangParams = { 'entity': 'ruang', 'kod_fakulti': kod_fakulti, 'kod_ruang_like': kod_ruang_like }
        const ruangGetData = new URLSearchParams(ruangParams).toString()

        const response = await fetch(baseURL + '?' + ruangGetData)
        const data = await response.json()
        const ruang = data as RoomResponse
        return ruang
    } catch (error) {
        console.error("Error fetching room:", error)
        throw error
    }
}