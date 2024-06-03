const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";
//entity=subjek_seksyen&sesi=yyyy/yyyy&semester=[1|2]

const response: SubjectSectionResponse = [
    {
        kod_subjek: "MCSD1013",
        nama_subjek: "Business Intelligence and Analytics",
        bil_pensyarah: 1,
        bil_pelajar: 0,
        bil_seksyen: 1,
        seksyen_list: [
            {
                bil_pelajar: 0,
                pensyarah: "NOR ERNE NAZIRA BINTI BAZIN",
                seksyen: 1
            }
        ]
    },
    {
        bil_seksyen: 2,
        seksyen_list: [
            {
                seksyen: 1,
                bil_pelajar: 0,
                pensyarah: "ROLIANA BT. IBRAHIM"
            },
            {
                pensyarah: "HABIBOLLAH BIN HARON",
                bil_pelajar: 0,
                seksyen: 1
            }
        ],
        bil_pelajar: 0,
        bil_pensyarah: 2,
        nama_subjek: "Research Design and Analysis Data Science",
        kod_subjek: "MCSD1043"
    },
    {
        kod_subjek: "MCSD1053",
        nama_subjek: "Data Science Governance",
        bil_pensyarah: 1,
        bil_pelajar: 0,
        seksyen_list: [
            {
                pensyarah: "ROLIANA BT. IBRAHIM",
                bil_pelajar: 0,
                seksyen: 1
            }
        ],
        bil_seksyen: 1
    },
    {
        kod_subjek: "MCSD1113",
        bil_pensyarah: 1,
        nama_subjek: "Statistic for Data Science",
        bil_pelajar: 0,
        bil_seksyen: 1,
        seksyen_list: [
            {
                seksyen: 1,
                bil_pelajar: 0,
                pensyarah: "MOHAMAD SHUKOR BIN TALIB"
            }
        ]
    },
    {
        seksyen_list: [
            {
                bil_pelajar: 0,
                pensyarah: "MOHD SHAHIZAN BIN OTHMAN",
                seksyen: 1
            }
        ],
        bil_seksyen: 1,
        bil_pelajar: 0,
        bil_pensyarah: 1,
        nama_subjek: "Big Data Management",
        kod_subjek: "MCSD1123"
    },
    {
        kod_subjek: "MCSD1133",
        bil_pensyarah: 1,
        nama_subjek: "Operational Research and Optimization",
        bil_pelajar: 0,
        bil_seksyen: 1,
        seksyen_list: [
            {
                pensyarah: "NOR AZIZAH BT. ALI",
                bil_pelajar: 0,
                seksyen: 1
            }
        ]
    },
    {
        kod_subjek: "MCSD1143",
        nama_subjek: "Supply Chain Analytics",
        bil_pensyarah: 1,
        bil_pelajar: 0,
        seksyen_list: [
            {
                pensyarah: "NOORFA HASZLINNA BT. MUSTAFFA",
                bil_pelajar: 0,
                seksyen: 1
            }
        ],
        bil_seksyen: 1
    },
    {
        bil_pelajar: 0,
        bil_seksyen: 1,
        seksyen_list: [
            {
                bil_pelajar: 0,
                pensyarah: "SUHAILA BINTI MOHAMAD YUSOF",
                seksyen: 1
            }
        ],
        kod_subjek: "MCSD1163",
        nama_subjek: "Big Data Computing",
        bil_pensyarah: 1
    },
    {
        bil_pelajar: 0,
        bil_seksyen: 1,
        seksyen_list: [
            {
                seksyen: 1,
                bil_pelajar: 0,
                pensyarah: "CHAN WENG HOWE"
            }
        ],
        kod_subjek: "MCSD2123",
        bil_pensyarah: 1,
        nama_subjek: "Massive Data Mining and Streaming"
    },
    {
        bil_seksyen: 1,
        seksyen_list: [
            {
                pensyarah: "NOR HAIZAN BT. MOHAMED RADZI",
                bil_pelajar: 0,
                seksyen: 1
            }
        ],
        bil_pelajar: 0,
        bil_pensyarah: 1,
        nama_subjek: "Advanced Analytics for Data Science",
        kod_subjek: "MCSD2213"
    },
    {
        nama_subjek: "Research Methodology",
        bil_pensyarah: 1,
        kod_subjek: "MECR1013",
        bil_seksyen: 1,
        seksyen_list: [
            {
                seksyen: 1,
                bil_pelajar: 0,
                pensyarah: "NORAFIDA BT. ITHNIN"
            }
        ],
        bil_pelajar: 0
    },
    {
        bil_pelajar: 0,
        bil_seksyen: 1,
        seksyen_list: [
            {
                seksyen: 1,
                bil_pelajar: 0,
                pensyarah: "FUAD ABDULGALEEL ABDOH GHALEB"
            }
        ],
        kod_subjek: "MECR1033",
        bil_pensyarah: 1,
        nama_subjek: "Digital Forensics"
    },
    {
        seksyen_list: [
            {
                seksyen: 1,
                bil_pelajar: 0,
                pensyarah: "MOHD ZAMRI BIN OSMAN"
            }
        ],
        bil_seksyen: 1,
        bil_pelajar: 0,
        nama_subjek: "Cloud Computing Security",
        bil_pensyarah: 1,
        kod_subjek: "MECR1043"
    },
]

export type SubjectSectionResponse = SubjectSection[]

export interface SubjectSection {
    kod_subjek: string
    nama_subjek: string
    bil_pensyarah: number
    bil_pelajar: number
    bil_seksyen: number
    seksyen_list: Section[]
}

export interface Section {
    bil_pelajar: number
    pensyarah: string
    seksyen: number
}

/**
 * Fetches the subjects by sesi and semester.
 * @param {string} sesi - The session.
 * @param {number} semester - The semester.
 * @returns {Promise<SubjectSectionResponse | undefined>} - A promise that resolves with the subject response data.
 */
export async function getSubjectSectionsBySesiAndSemester(sesi: string, semester: number): Promise<SubjectSectionResponse | undefined> {
    const subjectParams = { entity: 'subjek_seksyen', sesi, semester: semester.toString() };
    const subjectQuery = new URLSearchParams(subjectParams).toString();

    try {
        const response = await fetch(`${baseURL}?${subjectQuery}`);
        const data = await response.json() as SubjectSectionResponse;
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}