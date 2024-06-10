import { Meteors } from "../atoms/meteor";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { Button } from "@/components/ui/atoms/button"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getUser } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./dataTable"
import { ArrowUpDown } from "lucide-react"
import { StudentOfCourse, getStudentsOfCourse } from "@/services/subjek_pelajar";
import { useQuery } from "@tanstack/react-query";
import SessionSemesterLoadingTable from "../loading/session_semester_loading";

interface SubjectCardProps {
    kod_kursus?: string;
    kod_subjek: string;
    nama_subjek: string;
    seksyen: number;
    semester: number;
    sesi: string;
    status?: string;
    tahun_kursus?: number;
    no_pekerja?: number;
    bil_pelajar?: number;
    kod_fakulti?: string;
}

export function SubjectCard({
    kod_kursus,
    kod_subjek,
    nama_subjek,
    seksyen,
    semester,
    sesi,
    status,
    tahun_kursus,
    bil_pelajar,
    kod_fakulti,
}: SubjectCardProps) {
    let [isOpen, setIsOpen] = useState(false)
    const role = getUser()?.user_auth.role

    return (
        <>
            <div className="relative w-full">
                <div className="absolute inset-0 h-full w-full transform scale-[0.80] rounded-full blur-3xl" />
                <div className="relative flex flex-col items-start justify-end h-full px-4 py-8 overflow-hidden bg-gray-900 border border-gray-800 shadow-xl rounded-2xl">
                    <h1 className="relative mb-4 text-xl font-bold text-white z-1">
                        {nama_subjek}
                    </h1>

                    {role === "Lecturer" && (
                        <>
                            <p className="relative mb-4 text-base font-normal text-slate-500 z-1">
                                {kod_subjek} Section {seksyen}
                            </p>

                            <p className="relative mb-4 text-base font-normal text-slate-500 z-1">
                                {kod_fakulti} - {sesi} - {bil_pelajar} Students
                            </p>

                            <p className="relative mb-4 text-base font-normal text-slate-500 z-1">
                                Semester {semester}
                            </p>
                        </>
                    )}

                    {role === "Student" && (
                        <>
                            <p className="relative mb-4 text-base font-normal text-slate-500 z-1">
                                {kod_subjek} Section {seksyen}
                            </p>

                            <p className="relative mb-4 text-base font-normal text-slate-500 z-1">
                                {kod_fakulti} - {sesi}
                            </p>

                            <p className="relative mb-4 text-base font-normal text-slate-500 z-1">
                                Semester {semester}
                            </p>
                        </>
                    )}

                    <Button onClick={() => setIsOpen(true)} className="px-4 py-1 text-gray-300 border border-gray-500 rounded-lg">
                        {role === "Student" ? "Details" : "View Students"}
                    </Button>

                    {/* Meaty part - Meteor effect */}
                    <Meteors number={5} />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && role === "Lecturer" && (
                    <>
                        <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[101]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/30"
                            />
                            <div className="fixed inset-0 w-screen p-4 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-full p-4">
                                    <DialogPanel
                                        as={motion.div}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="max-w-xl p-12 space-y-4 bg-white rounded-md shadow-md dark:bg-gray-900 dark:text-white"
                                    >
                                        <StudentOfCourseTable sesi={sesi} semester={semester} kod_subjek={kod_subjek} seksyen={seksyen} />
                                        <div className="flex gap-4">
                                            <Button onClick={() => setIsOpen(false)}>Close</Button>
                                        </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>
                    </>
                )}

                {isOpen && role === "Student" && (
                    <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30"
                        />
                        <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-lg p-12 space-y-4 bg-white rounded-md shadow-md dark:bg-gray-900 dark:text-white"
                            >
                                <DialogTitle className="text-lg font-bold">{nama_subjek}</DialogTitle>
                                <Description>Course Code - {kod_kursus}</Description>
                                <Description>Section - {seksyen}</Description>
                                <Description>Semester - {semester}</Description>
                                <Description>Session - {sesi}</Description>
                                <Description>Course Year - {tahun_kursus}</Description>
                                <Description>Status - {status}</Description>
                                <div className="flex gap-4">
                                    <button onClick={() => setIsOpen(false)}>Close</button>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence >
        </>
    );
}

interface StudentOfCourseTableProps {
    sesi: string;
    semester: number;
    kod_subjek: string;
    seksyen: number;
}
function StudentOfCourseTable({
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
                    variant="ghost"
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