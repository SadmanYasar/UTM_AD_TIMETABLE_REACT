const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=kurikulum?cohort=yyyy/yyyy

const response2: CurriculumResponse = [
    {
        kod_kurikulum: "SECJ",
        sesi_masuk: "2020/2021",
        nama_kurikulum: "Bachelor of Computer Science (Software Engineering)",
        tahun_masuk: 1,
        id_kurikulum: 37,
        semester_masuk: 1
    }
]

const response1: CurriculumNoParamResponse = [
    {
        sesi_masuk: "2020/2021"
    },
    {
        sesi_masuk: "2017/2018"
    },
    {
        sesi_masuk: "2016/2017"
    },
    {
        sesi_masuk: "2015/2016"
    },
    {
        sesi_masuk: "2014/2015"
    },
    {
        sesi_masuk: "2010/2011"
    },
    {
        sesi_masuk: "2008/2009"
    },
    {
        sesi_masuk: "2007/2008"
    },
    {
        sesi_masuk: "2006/2007"
    },
    {
        sesi_masuk: "2005/2006"
    },
    {
        sesi_masuk: "2003/2004"
    },
    {
        sesi_masuk: "2002/2003"
    }
]

export interface CurriculumNoParam {
    sesi_masuk: string
}

export type CurriculumNoParamResponse = CurriculumNoParam[];

export interface Curriculum {
    kod_kurikulum: string
    sesi_masuk: string
    nama_kurikulum: string
    tahun_masuk: number
    id_kurikulum: number
    semester_masuk: number
}

export type CurriculumResponse = Curriculum[];

/**
 * Retrieves the curriculum information based on the provided parameters.
 * @param cohort - The cohort.
 * @returns A Promise that resolves to the curriculum information.
 * @throws If there is an error fetching the curriculum information.
 */
export async function getCurriculum(cohort?: string): Promise<CurriculumResponse | CurriculumNoParamResponse> {
    try {
        if (!cohort) {
            const response = await fetch(baseURL + '?entity=kurikulum')
            const data = await response.json()
            const kurikulum = data as CurriculumNoParamResponse
            return kurikulum
        }

        const kurikulumParams = { 'entity': 'kurikulum', 'cohort': cohort }
        const kurikulumGetData = new URLSearchParams(kurikulumParams).toString()

        const response = await fetch(baseURL + '?' + kurikulumGetData)
        const data = await response.json()
        const kurikulum = data as CurriculumResponse
        return kurikulum
    } catch (error) {
        console.error("Error fetching curriculum:", error)
        throw error
    }
}