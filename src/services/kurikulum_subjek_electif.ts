const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=kurikulum_subjek_elektif&id_kurikulum_subjek=1320

const response: CurriculumSubjectElectiveResponse = [
    {
        "se.kod_subjek": "UHAK1022",
        "s.kredit": 2,
        "s.nama_subjek": "Malaysian Studies 3 (International Students)"
    },
    {
        "s.kredit": 2,
        "s.nama_subjek": "Dinamika Malaysia",
        "se.kod_subjek": "UHAS1172"
    }
]

export interface CurriculumSubjectElective {
    "se.kod_subjek": string,
    "s.kredit": number,
    "s.nama_subjek": string
}

export type CurriculumSubjectElectiveResponse = CurriculumSubjectElective[];

/**
 * Retrieves the curriculum subject elective information based on the provided parameters.
 * @param id_kurikulum_subjek - The curriculum subject ID.
 * @returns A Promise that resolves to the curriculum subject elective information.
 * @throws If there is an error fetching the curriculum subject elective information.
 */
export async function getCurriculumSubjectElectives(id_kurikulum_subjek: number): Promise<CurriculumSubjectElectiveResponse> {
    try {
        const kurikulumSubjekElektifParams = { 'entity': 'kurikulum_subjek_elektif', 'id_kurikulum_subjek': id_kurikulum_subjek.toString() }
        const kurikulumSubjekElektifGetData = new URLSearchParams(kurikulumSubjekElektifParams).toString()

        const response = await fetch(baseURL + '?' + kurikulumSubjekElektifGetData)
        const data = await response.json()
        const kurikulumSubjekElektif = data as CurriculumSubjectElectiveResponse
        return kurikulumSubjekElektif
    } catch (error) {
        console.error("Error fetching curriculum subject electives:", error)
        throw error
    }
}