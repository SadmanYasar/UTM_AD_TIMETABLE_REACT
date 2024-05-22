import { BentoGrid } from "@/components/ui/bentoGrid"
import { Button } from "@/components/ui/button"
import LoadingSubjects from "@/components/ui/loading/subjects_loading"
import { SubjectCard } from "@/components/ui/subjectCard"
import { getUser, isAuthenticated, isFilterEmpty, newfilterQuery } from "@/lib/utils"
import { SubjectResponse, getSubjects } from "@/services/subjects"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import filter from '@mcabreradev/filter';
import Dropdowns from "@/components/ui/Dropdowns"

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
            <Dropdowns data={data} filterQuery={filterQuery} setFilter={setFilter} />
            <BentoGrid className="max-w-5xl mx-auto px-8">
                {filteredData?.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                ))}
            </BentoGrid>
        </>
    )
}