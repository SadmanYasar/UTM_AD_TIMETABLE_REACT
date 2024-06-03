const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=kurikulum_subjek&id_kurikulum=???

const response = [
    {
        tahun_ambil: 1,
        mod_elektif: null,
        id_kurikulum_subjek: 1319,
        semester_ambil: 1,
        nama_subjek: "Teknik Pengaturcaraan I",
        kredit: 3,
        kod_subjek: "SECJ1013",
        nama_elektif: null
    },
    {
        pilihan_elektif: "2",
        id_kurikulum_subjek: 1320,
        semester_ambil: 1,
        mod_elektif: 1,
        tahun_ambil: 1,
        kod_subjek: "UHAX1xx2",
        kredit: 2,
        nama_elektif: "Elektif UHAX1xx2",
        nama_subjek: "Elektif UHAX1xx2"
    }
]

export interface CurriculumSubject {
    tahun_ambil: number,
    mod_elektif: number | null,
    id_kurikulum_subjek: number,
    semester_ambil: number,
    nama_subjek: string,
    kredit: number,
    kod_subjek: string,
    nama_elektif: string | null
}

export type CurriculumSubjectResponse = CurriculumSubject[];

/**
 * Retrieves the curriculum subject information based on the provided parameters.
 * @param id_kurikulum - The curriculum ID.
 * @returns A Promise that resolves to the curriculum subject information.
 * @throws If there is an error fetching the curriculum subject information.
 */
export async function getCurriculumSubjects(id_kurikulum: number): Promise<CurriculumSubjectResponse> {
    try {
        const kurikulumSubjekParams = { 'entity': 'kurikulum_subjek', 'id_kurikulum': id_kurikulum.toString() }
        const kurikulumSubjekGetData = new URLSearchParams(kurikulumSubjekParams).toString()

        const response = await fetch(baseURL + '?' + kurikulumSubjekGetData)
        const data = await response.json()
        const kurikulumSubjek = data as CurriculumSubjectResponse
        return kurikulumSubjek
    } catch (error) {
        console.error("Error fetching curriculum subjects:", error)
        throw error
    }
}