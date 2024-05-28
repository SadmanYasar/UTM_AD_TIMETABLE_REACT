import { createFileRoute, redirect } from "@tanstack/react-router"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/atoms/table"
import { getUser, isAuthenticated } from "@/lib/utils"
import { Subject, getSubjects } from "@/services/subjects"
import { useQuery } from "@tanstack/react-query"
import { getTimeTable } from "@/services/timetable"
import filter from "@mcabreradev/filter"

const hours = [
    "07:00 AM - 07:50 AM", "08:00 AM - 08:50 AM", "09:00 AM - 09:50 AM", "10:00 AM - 10:50 AM",
    "11:00 AM - 11:50 AM", "12:00 PM - 12:50 PM", "01:00 PM - 01:50 PM", "02:00 PM - 02:50 PM",
    "03:00 PM - 03:50 PM", "04:00 PM - 04:50 PM", "05:00 PM - 05:50 PM", "06:00 PM - 06:50 PM",
    "07:00 PM - 07:50 PM", "08:00 PM - 08:50 PM", "09:00 PM - 09:50 PM", "10:00 PM - 10:50 PM"
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const Route = createFileRoute('/timetable')({
    component: Component,
    beforeLoad: async ({ location }) => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})

export default function Component() {
    const { data: subjects } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjects(getUser()?.user_auth?.login_name),
    })

    const { data: times, error, isLoading } = useQuery({
        queryKey: ['timetable'],
        queryFn: async () => {
            let largestSemesterForTheLatestSesi = 0;
            const sesi = subjects?.reduce((acc: Subject | undefined, curr: Subject) => {
                const [_, end] = curr.sesi.split('/')
                const [__, accEnd] = acc?.sesi.split('/') ?? ['0', '0']
                if (parseInt(end) > parseInt(accEnd)) {
                    return curr
                }
                return acc
            }, undefined)?.sesi

            if (sesi) {
                largestSemesterForTheLatestSesi = subjects?.reduce((acc: number, curr: Subject) => {
                    const [start, end] = curr.sesi.split('/')
                    if (curr.sesi === sesi && curr.semester > acc) {
                        return curr.semester
                    }
                    return acc
                }, 0)
            }

            const courses = subjects ? filter(subjects, { sesi, semester: largestSemesterForTheLatestSesi }) : []

            const timetables = await Promise.all(courses.map(async (course) => {
                return await getTimeTable(course.sesi, course.semester.toString(), course.kod_subjek, course.seksyen.toString())
            }))

            return timetables
        },
        enabled: !!subjects,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>An error occurred</div>
    }

    const timetableMatrix = Array.from({ length: 16 }, () => Array(7).fill(null));

    times?.forEach((timetable) => {
        timetable?.forEach((entry) => {
            const dayIndex = entry.hari;
            const timeIndex = entry.masa - 1;
            if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < 16) {
                timetableMatrix[timeIndex][dayIndex] = `${entry.kod_subjek} - ${entry.seksyen}\n${entry.ruang.nama_ruang_singkatan}`;
            }
        });
    });

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center gap-2">
                <div className="grid grid-rows-2 items-center gap-1">
                    <h1 className="text-2xl font-bold tracking-tighter">Timetable</h1>
                </div>
            </div>
            <div className="rounded-md border overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            {days.map((day, index) => (
                                <TableHead key={index}>{day}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timetableMatrix.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{hours[rowIndex]}</TableCell>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex} className="whitespace-pre-wrap">{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
