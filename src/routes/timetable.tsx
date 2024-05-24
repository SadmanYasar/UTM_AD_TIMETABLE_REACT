import { createFileRoute, redirect } from "@tanstack/react-router"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/atoms/table"
import { getUser, isAuthenticated } from "@/lib/utils"
import { Subject, SubjectResponse, getSubjects } from "@/services/subjects"
import { useQuery } from "@tanstack/react-query"
import { SubjectTable, SubjectTableResponse, getTimeTable } from "@/services/timetable"
import filter from "@mcabreradev/filter"

type Hours = {
    [key: string]: { start: string, end: string }
}
const hours: Hours = {
    1: { start: "8am", end: "9am" },
    2: { start: "9am", end: "10am" },
    3: { start: "10am", end: "11am" },
    4: { start: "10am", end: "11am" },
    5: { start: "11am", end: "12pm" },
    6: { start: "12pm", end: "1pm" },
    7: { start: "1pm", end: "2pm" },
    8: { start: "2pm", end: "3pm" },
    9: { start: "3pm", end: "4pm" },
    10: { start: "4pm", end: "5pm" },
}

type Days = {
    [key: string]: string
}
const days: Days = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
}

export const Route = createFileRoute('/timetable')({
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
    const { data: subjects } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjects(getUser()?.user_auth?.login_name),
    })

    const { data: times, error, isLoading } = useQuery({
        queryKey: ['timetable'],
        queryFn: async () => {
            //given the sesi is in format YYYY/YYYY, eg 2023/2024, find the latest sesi from subjects and also the latest semester of that sesi given that the semester is either 1 or 2
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

            //filter the subjects by the latest sesi and semester
            const courses = subjects ? filter(subjects, { sesi, semester: largestSemesterForTheLatestSesi }) : []

            //for each course, find the timetable and append it to array
            const timetables = await Promise.all(courses.map(async (course) => {
                return await getTimeTable(course.sesi, course.semester.toString(), course.kod_subjek, course.seksyen.toString())
            }))

            console.log(timetables)

            return timetables
        },
        enabled: !!subjects,

    })

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return (
            <div>An error occurred</div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center gap-2">
                <div className="grid grid-rows-2 items-center gap-1">
                    <h1 className="text-2xl font-bold tracking-tighter">Timetable</h1>
                </div>
            </div>
            {/* 
            For each array inside the array times, display a timetable with the days and the cell. 
            Need to interprate them as follows:
            "hari":2 => Monday
            "masa":4 => 10am - 11am
            venue => MPK3

            "hari":2 => Monday
            "masa":5 => 11am - 12pm
            venue => MPK3

            Final display: SCSJ4383 (Monday, MPK3, 10am-12pm) 
            */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Day</TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    {times?.map((timetable) => (
                        <TableBody>
                            {timetable?.map((timetable, index) => (
                                <TableRow key={index}>
                                    <TableCell>{timetable.kod_subjek}</TableCell>
                                    <TableCell>{days[timetable.hari as keyof Days]}</TableCell>
                                    <TableCell>{timetable.ruang.nama_ruang_singkatan}</TableCell>
                                    {/* <TableCell>{hours[timetable.masa.toString()]}</TableCell> */}
                                    <TableCell>{hours[timetable.masa.toString()]?.start} - {hours[timetable.masa.toString()]?.end}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ))}
                </Table>
            </div>
        </div>
    )
}





