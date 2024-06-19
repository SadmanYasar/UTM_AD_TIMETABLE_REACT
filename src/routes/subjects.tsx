import { BentoGrid } from "@/components/ui/atoms/bentoGrid"
import { Button } from "@/components/ui/atoms/button"
import LoadingSubjects from "@/components/ui/loading/subjects_loading"
import { SubjectCard } from "@/components/ui/molecules/subjectCard"
import { getUser, isAuthenticated, isFilterEmpty, newfilterQuery } from "@/lib/utils"
import { StudentSubjectResponse, getSubjectsByStudentMatric } from "@/services/pelajar_subjek"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import filter from '@mcabreradev/filter';
import Dropdowns from "@/components/ui/molecules/dropdowns"
import { LecturerSubjectResponse, getSubjectsByLecturer } from "@/services/pensyarah_subjek"

export interface Filter {
    sesi?: string;
    semester?: number;
    kod_kursus?: string;
    kod_subjek?: string;
    nama_subjek?: string;
    seksyen?: number;
}

export type FilterKeys = keyof Filter;

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
        queryFn: async () => {
            const user = getUser();

            if (user?.user_auth.role === 'Lecturer' && user?.user_auth.no_pekerja) {
                const lecturerSubjects = await getSubjectsByLecturer(user?.user_auth.no_pekerja);
                return lecturerSubjects as LecturerSubjectResponse;
            }

            const studentSubjects = await getSubjectsByStudentMatric(user?.user_auth.login_name);
            return studentSubjects as StudentSubjectResponse;
        },
    })

    const [filterQuery, setFilter] = useState<Filter>({
    })

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (!isFilterEmpty(filterQuery)) {
            const filtered = data ? filter(data, newfilterQuery(filterQuery)) : [];
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
                <Button onClick={() => redirect({ to: '/login' })}>Login</Button>
            </>
        )
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="flex items-center gap-2">
                    <div className="grid items-center grid-rows-2 gap-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Subjects</h1>
                    </div>
                </div>
            </div>
            <Dropdowns data={data} filterQuery={filterQuery} setFilter={setFilter} />
            <div className="py-4 font-bold text-center dark:text-gray-300">
                Total Subjects Found: {filteredData?.length}
            </div>
            <BentoGrid>
                {filteredData?.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                ))}
            </BentoGrid>
        </>
    )
}