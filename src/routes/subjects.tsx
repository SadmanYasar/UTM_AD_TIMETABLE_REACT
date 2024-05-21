import { BentoGrid } from "@/components/ui/bentoGrid"
import { Button } from "@/components/ui/button"
import LoadingSubjects from "@/components/ui/loading/subjects_loading"
import { SubjectCard } from "@/components/ui/subjectCard"
import { getUser, isAuthenticated } from "@/lib/utils"
import { getSubjects } from "@/services/subjects"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import filter from '@mcabreradev/filter';

type Filter = {
    nama_subjek?: string
    sesi?: string
    kod_kursus?: string
    status?: string
    kod_subjek?: string
    semester?: number
    tahun_kursus?: number
    seksyen?: number
}

export const Route = createFileRoute('/subjects')({
    component: Component,
    beforeLoad: async ({ location }) => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/login',
                search: {
                    // Use the current location to power a redirect after login
                    redirect: location.href,
                },
            })
        }
    },
})

export default function Component() {
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjects(getUser()?.user_auth?.login_name),
    })

    //create a filtering system based on the keys in the data object
    const [filterQuery, setFilter] = useState<Filter>({
        sesi: '2023/2024',
    })

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const isFilterEmpty = Object.values(filterQuery).every(value => value === "");
        //remove keys from filters with empty values or 0 values
        const newfilterQuery = Object.entries(filterQuery).reduce((acc, [key, value]) => {
            if (value !== "" && value !== 0) {
                acc[key] = value;
            }
            return acc;
        }, {});

        if (!isFilterEmpty) {
            const filtered = data ? filter(data, newfilterQuery) : [];
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [data, filterQuery]);

    if (isLoading) {
        return <LoadingSubjects />
    }

    if (error) {
        return (
            <>
                <div>An error occurred</div>
                <Button onClick={() => refetch()}>Retry</Button>
            </>
        )
    }

    return (
        <>
            {/* A filter section with eight dropdowns each containing the values from the data. Use sets to remove duplicate values */}
            {Dropdowns()}
            <BentoGrid className="max-w-5xl mx-auto px-8">
                {filteredData?.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                ))}
            </BentoGrid>
        </>
    )

    function Dropdowns() {
        return (
            <div className="flex flex-wrap gap-4 justify-center my-4 max-w-5xl w-full mx-auto">
                <div className="flex flex-wrap gap-4">
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.sesi}
                        onChange={(e) => setFilter({ ...filterQuery, sesi: e.target.value })}
                    >
                        <option value="">Select Session</option>
                        {data && Array.from(new Set(data.map((subject) => subject.sesi))).map((sesi, index) => (
                            <option key={index} value={sesi}>
                                {sesi}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.semester}
                        onChange={(e) => setFilter({ ...filterQuery, semester: +e.target.value })}
                    >
                        <option value="">Select Semester</option>
                        {data && Array.from(new Set(data.map((subject) => subject.semester))).map((semester, index) => (
                            <option key={index} value={semester}>
                                {semester}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.tahun_kursus}
                        onChange={(e) => setFilter({ ...filterQuery, tahun_kursus: +e.target.value })}
                    >
                        <option value="">Select Course Year</option>
                        {data && Array.from(new Set(data.map((subject) => subject.tahun_kursus))).map((tahun_kursus, index) => (
                            <option key={index} value={tahun_kursus}>
                                {tahun_kursus}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.kod_kursus}
                        onChange={(e) => setFilter({ ...filterQuery, kod_kursus: e.target.value })}
                    >
                        <option value="">Select Course Code</option>
                        {data && Array.from(new Set(data.map((subject) => subject.kod_kursus))).map((kod_kursus, index) => (
                            <option key={index} value={kod_kursus}>
                                {kod_kursus}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-wrap gap-4">
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.kod_subjek}
                        onChange={(e) => setFilter({ ...filterQuery, kod_subjek: e.target.value })}
                    >
                        <option value="">Select Subject Code</option>
                        {data && Array.from(new Set(data.map((subject) => subject.kod_subjek))).map((kod_subjek, index) => (
                            <option key={index} value={kod_subjek}>
                                {kod_subjek}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.nama_subjek}
                        onChange={(e) => setFilter({ ...filterQuery, nama_subjek: e.target.value })}
                    >
                        <option value="">Select Subject Name</option>
                        {data && Array.from(new Set(data.map((subject) => subject.nama_subjek))).map((nama_subjek, index) => (
                            <option key={index} value={nama_subjek}>
                                {nama_subjek}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.status}
                        onChange={(e) => setFilter({ ...filterQuery, status: e.target.value })}
                    >
                        <option value="">Select Status</option>
                        {data && Array.from(new Set(data.map((subject) => subject.status))).map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterQuery.seksyen}
                        onChange={(e) => setFilter({ ...filterQuery, seksyen: +e.target.value })}
                    >
                        <option value="">Select Section</option>
                        {data && Array.from(new Set(data.map((subject) => subject.seksyen))).map((seksyen, index) => (
                            <option key={index} value={seksyen}>
                                {seksyen}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

