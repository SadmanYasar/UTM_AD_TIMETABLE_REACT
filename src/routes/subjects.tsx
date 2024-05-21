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
import { motion } from "framer-motion"

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

    const [filterQuery, setFilter] = useState<Filter>({
        sesi: '2023/2024',
    })

    const [filteredData, setFilteredData] = useState(data);
    const [mobileOpen, setmobileOpen] = useState(false);

    useEffect(() => {
        const isFilterEmpty = Object.values(filterQuery).every(value => value === "");
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
            {Dropdowns()}
            <BentoGrid className="max-w-5xl mx-auto px-8">
                {filteredData?.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                ))}
            </BentoGrid>
        </>
    )

    function Dropdowns() {
        const dropdowns = [
            { key: 'sesi', label: 'Session' },
            { key: 'semester', label: 'Semester' },
            { key: 'tahun_kursus', label: 'Course Year' },
            { key: 'kod_kursus', label: 'Course Code' },
            { key: 'kod_subjek', label: 'Subject Code' },
            { key: 'nama_subjek', label: 'Subject Name' },
            { key: 'status', label: 'Status' },
            { key: 'seksyen', label: 'Section' },
        ];

        return (
            <>
                {/* A button to open filter */}
                <div className="flex justify-center">
                    <Button
                        onClick={() => setmobileOpen(!mobileOpen)}
                        className="w-48 mb-4"
                    >
                        {mobileOpen ? "Close" : "Filter"}
                    </Button>
                </div>
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: mobileOpen ? "auto" : 0 }}
                    className={`flex flex-wrap gap-4 justify-center my-4 max-w-5xl w-full mx-auto ${mobileOpen ? '' : 'hidden'}`}
                >
                    <div className="flex flex-wrap gap-4 justify-center">
                        {dropdowns.map((dropdown) => (
                            <select
                                key={dropdown.key}
                                className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterQuery[dropdown.key]}
                                onChange={(e) =>
                                    setFilter({ ...filterQuery, [dropdown.key]: e.target.value })
                                }
                            >
                                <option value="">Select {dropdown.label}</option>
                                {data &&
                                    Array.from(
                                        new Set(data.map((subject) => subject[dropdown.key]))
                                    ).map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                            </select>
                        ))}
                    </div>
                </motion.div>
            </>
        )
    }
}

