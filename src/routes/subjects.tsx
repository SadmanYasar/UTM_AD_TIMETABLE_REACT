import { BentoGrid } from "@/components/ui/atoms/bentoGrid"
import { Button } from "@/components/ui/atoms/button"
import LoadingSubjects from "@/components/ui/loading/subjects_loading"
import { SubjectCard } from "@/components/ui/molecules/subjectCard"
import { getUser, isAuthenticated, isFilterEmpty, newfilterQuery } from "@/lib/utils"
import { getSubjects } from "@/services/subjects"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import filter from '@mcabreradev/filter';
import Dropdowns from "@/components/ui/molecules/dropdowns"

export interface Filter {
    sesi?: string;
    semester?: number;
    tahun_kursus?: number;
    kod_kursus?: string;
    kod_subjek?: string;
    nama_subjek?: string;
    status?: string;
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
        queryFn: () => getSubjects(getUser()?.user_auth?.login_name),
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
                <Button onClick={() => refetch()}>Retry</Button>
            </>
        )
    }

    return (
        <>
            {/* Mobile Header */}
            <h1 className="text-2xl font-bold my-4 block md:hidden">Subjects</h1>

            <Dropdowns data={data} filterQuery={filterQuery} setFilter={setFilter} />
            <BentoGrid>
                {filteredData?.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                ))}
                {filteredData?.length === 0 && (
                    <div className="col-span-6 text-center dark:text-gray-300 font-bold">
                        No subjects found
                    </div>
                )}
            </BentoGrid>
        </>
    )
}
