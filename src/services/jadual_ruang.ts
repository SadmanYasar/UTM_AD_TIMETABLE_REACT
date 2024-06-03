const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=jadual_ruang&sesi=2023/2024&semester=1&kod_ruang=N28-01-01

const response: JadualRuangResponse = [
    {
        subjek: {
            kod_subjek: "SECP1513",
            seksyen: 7
        },
        id_jws: "54991",
        kod_perkara: null,
        hari: 1,
        tarikh_tamat: "2024-01-20",
        masa: 8,
        tarikh_mula: "2023-10-08",
        catatan: null
    },
    {
        masa: 9,
        tarikh_mula: "2023-10-08",
        hari: 1,
        tarikh_tamat: "2024-01-20",
        catatan: null,
        subjek: {
            kod_subjek: "SECP1513",
            seksyen: 7
        },
        kod_perkara: null,
        id_jws: "54992"
    },
    {
        tarikh_mula: "2023-10-08",
        masa: 10,
        tarikh_tamat: "2024-01-20",
        hari: 1,
        catatan: null,
        subjek: {
            kod_subjek: "SECP1513",
            seksyen: 7
        },
        kod_perkara: null,
        id_jws: "54993"
    },
    {
        subjek: {
            seksyen: 2,
            kod_subjek: "SECR1213"
        },
        id_jws: "55131",
        kod_perkara: null,
        hari: 2,
        tarikh_tamat: "2024-01-20",
        masa: 2,
        tarikh_mula: "2023-10-08",
        catatan: null
    },
    {
        id_jws: "55132",
        kod_perkara: null,
        subjek: {
            kod_subjek: "SECR1213",
            seksyen: 2
        },
        catatan: null,
        tarikh_tamat: "2024-01-20",
        hari: 2,
        tarikh_mula: "2023-10-08",
        masa: 3
    },
    {
        kod_perkara: null,
        id_jws: "55183",
        subjek: {
            kod_subjek: "SECD2523",
            seksyen: 2
        },
        catatan: null,
        tarikh_mula: "2023-10-08",
        masa: 5,
        tarikh_tamat: "2024-01-20",
        hari: 2
    },
    {
        kod_perkara: null,
        id_jws: "55184",
        subjek: {
            seksyen: 2,
            kod_subjek: "SECD2523"
        },
        catatan: null,
        masa: 6,
        tarikh_mula: "2023-10-08",
        hari: 2,
        tarikh_tamat: "2024-01-20"
    },
    {
        catatan: null,
        hari: 2,
        tarikh_tamat: "2024-01-20",
        masa: 8,
        tarikh_mula: "2023-10-08",
        id_jws: "55010",
        kod_perkara: null,
        subjek: {
            kod_subjek: "SECR1013",
            seksyen: 5
        }
    },
    {
        tarikh_tamat: "2024-01-20",
        hari: 2,
        tarikh_mula: "2023-10-08",
        masa: 9,
        catatan: null,
        subjek: {
            kod_subjek: "SECR1013",
            seksyen: 5
        },
        id_jws: "55011",
        kod_perkara: null
    },
    {
        id_jws: "55147",
        kod_perkara: null,
        subjek: {
            kod_subjek: "SECR1213",
            seksyen: 6
        },
        catatan: null,
        tarikh_tamat: "2024-01-20",
        hari: 3,
        tarikh_mula: "2023-10-08",
        masa: 2
    },
    {
        id_jws: "55148",
        kod_perkara: null,
        subjek: {
            kod_subjek: "SECR1213",
            seksyen: 6
        },
        catatan: null,
        tarikh_tamat: "2024-01-20",
        hari: 3,
        tarikh_mula: "2023-10-08",
        masa: 3
    },
]

export interface JadualRuang {
    subjek: {
        kod_subjek: string
        seksyen: number
    }
    id_jws: string
    kod_perkara: string | null
    hari: number
    tarikh_tamat: string
    masa: number
    tarikh_mula: string
    catatan: string | null
}

export type JadualRuangResponse = JadualRuang[]

/**
 * Retrieves the jadual ruang (room schedule) based on the provided parameters.
 * @param sesi - The session.
 * @param semester - The semester.
 * @param kod_ruang - The room code.
 * @returns A Promise that resolves to a JadualRuangResponse object.
 */
export const getJadualRuang = async (sesi: string, semester: number, kod_ruang: string): Promise<JadualRuangResponse> => {
    try {
        const response = await fetch(`${baseURL}?entity=jadual_ruang&sesi=${sesi}&semester=${semester}&kod_ruang=${kod_ruang}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching jadual ruang:", error);
        throw error;
    }
}
