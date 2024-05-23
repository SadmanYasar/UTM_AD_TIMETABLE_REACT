import { Button } from "@/components/ui/atoms/button"
import SessionSemesterLoadingTable from "@/components/ui/loading/session_semester_loading"
import { isAuthenticated } from "@/lib/utils"
import { SesiSemester, fetchSesiSemester } from "@/services/session_semester"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { DataTable } from "../components/ui/molecules/dataTable"
import { ArrowUpDown } from "lucide-react"
import {
    ColumnDef,
} from "@tanstack/react-table";

export const columns: ColumnDef<SesiSemester>[] = [
    {
        header: 'Semester',
        accessorKey: 'semester',
    },
    {
        accessorKey: 'sesi_semester_id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        header: 'Start Date',
        accessorKey: 'tarikh_mula',
    },
    {
        header: 'End Date',
        accessorKey: 'tarikh_tamat',
    },

    {
        header: 'Session',
        accessorKey: 'sesi',
    },
]

export const Route = createFileRoute('/session_semester')({
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
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['session_semester'],
        queryFn: fetchSesiSemester,
    })

    if (isLoading) {
        return (
            <SessionSemesterLoadingTable />
        )
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
            <div className="container mx-auto py-10">
                <div className="flex items-center gap-2">
                    <div className="grid grid-rows-2 items-center gap-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Session Semester</h1>
                    </div>
                </div>
                <DataTable columns={columns} data={data ? data : []} />
            </div>
        </> // Add a closing tag for the return statement
    )
}