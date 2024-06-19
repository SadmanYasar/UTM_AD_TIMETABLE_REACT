import { getUser } from "@/lib/utils";
import { getStudentsOfCourse, StudentOfCourse } from "@/services/subjek_pelajar";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import SessionSemesterLoadingTable from "../loading/session_semester_loading";
import { DataTable } from "./dataTable";

interface StudentOfCourseTableProps {
    sesi: string;
    semester: number;
    kod_subjek: string;
    seksyen: number;
}
export default function StudentOfCourseTable({
    sesi,
    semester,
    kod_subjek,
    seksyen,
}: StudentOfCourseTableProps) {
    const { data, isLoading, error, refetch, isRefetching, isFetching } = useQuery({
        queryKey: ['students_of_course'],
        queryFn: async () => {
            const sessionId = getUser()?.user_auth.admin_session_id

            if (sessionId) {
                const data = await getStudentsOfCourse(sessionId, sesi, semester, kod_subjek, seksyen.toString())
                return data
            }

            return []
        },
    })

    if (isLoading || isFetching || isRefetching) {
        return <SessionSemesterLoadingTable />
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
            <div className="">
                <div className="flex items-center gap-2">
                    <div className="grid items-center grid-rows-2 gap-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Students registered to {kod_subjek}</h1>
                    </div>
                </div>
                <DataTable columns={columns} data={data ? data : []} />
            </div>
        </>
    )

}

const columns: ColumnDef<StudentOfCourse>[] = [
    {
        header: 'Name',
        accessorKey: 'nama',
    },
    {
        accessorKey: 'no_kp',
        header: ({ column }) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
    },
    {
        header: 'Course Code',
        accessorKey: 'kod_kursus',
    },
    {
        header: 'Course Year',
        accessorKey: 'tahun_kursus',
    },
]