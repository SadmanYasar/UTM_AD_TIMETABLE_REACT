import { createFileRoute, redirect } from "@tanstack/react-router"
import { TableHead, TableRow, TableHeader, TableCell, Table, TableBody } from "@/components/ui/atoms/table"
import { getUser, isAuthenticated } from "@/lib/utils"
import { StudentSubject, getSubjectsByStudentMatric } from "@/services/pelajar_subjek"
import { useQuery } from "@tanstack/react-query"
import { getTimeTable } from "@/services/timetable"
import filter from "@mcabreradev/filter"
import { useState, useEffect } from "react"

const hours = [
    "07:00 AM - 07:50 AM", "08:00 AM - 08:50 AM", "09:00 AM - 09:50 AM", "10:00 AM - 10:50 AM",
    "11:00 AM - 11:50 AM", "12:00 PM - 12:50 PM", "01:00 PM - 01:50 PM", "02:00 PM - 02:50 PM",
    "03:00 PM - 03:50 PM", "04:00 PM - 04:50 PM",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

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
    //use event listener to detect mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data: subjects } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjectsByStudentMatric(getUser()?.user_auth?.login_name),
    })

    const { data: times, error, isLoading } = useQuery({
        queryKey: ['timetable'],
        queryFn: async () => {
            let largestSemesterForTheLatestSesi = 0;
            const sesi = subjects?.reduce((acc: StudentSubject | undefined, curr: StudentSubject) => {
                const [_, end] = curr.sesi.split('/')
                const [__, accEnd] = acc?.sesi.split('/') ?? ['0', '0']
                if (parseInt(end) > parseInt(accEnd)) {
                    return curr
                }
                return acc
            }, undefined)?.sesi

            if (sesi) {
                largestSemesterForTheLatestSesi = subjects?.reduce((acc: number, curr: StudentSubject) => {
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

    const timetableMatrix = Array.from({ length: 10 }, () => Array(7).fill(''));

    times?.forEach((timetable) => {
        timetable?.forEach((entry) => {
            const dayIndex = entry.hari - 1;
            const timeIndex = entry.masa - 1;
            if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < 16) {
                timetableMatrix[timeIndex][dayIndex] = `${entry.kod_subjek} - ${entry.seksyen}\n${entry.ruang.nama_ruang_singkatan ? entry.ruang.nama_ruang_singkatan : '???'}`;
            }
        });
    });

    if (isMobile) {
        return (
            <div className="container py-10 mx-auto">
                <div className="flex items-center gap-2">
                    <div className="grid items-center grid-rows-2 gap-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Timetable 📅</h1>
                    </div>
                </div>
                <div className="overflow-auto border rounded-md">
                    {days.map((day, dayIndex) => (
                        <div key={dayIndex} className="p-2">
                            <h2 className="text-lg font-bold">{day}</h2>
                            {times?.map((timetable, timetableIndex) => {
                                const entry = timetable?.find((entry) => entry.hari === dayIndex + 1);
                                if (entry) {
                                    const { kod_subjek, masa, hari, ruang } = entry;
                                    //retrieve the first 8 characters
                                    const startTime = hours[masa - 1].slice(0, 8);
                                    //retrieve the last 8 characters
                                    const endTime = hours[masa].slice(11, 19);
                                    return (
                                        <>
                                            <div key={timetableIndex} className="grid grid-cols-2 gap-2 pb-2">
                                                <div className="flex items-center">
                                                    <span>{kod_subjek}</span>
                                                    <span className="ml-2">{ruang.nama_ruang_singkatan ? ruang.nama_ruang_singkatan : '???'}</span>
                                                </div>
                                                <div className="text-black dark:text-gray-300 text-md">
                                                    {startTime} - {endTime}
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-10 mx-auto">
            <div className="flex items-center gap-2">
                <div className="grid items-center grid-rows-2 gap-1">
                    <h1 className="text-2xl font-bold tracking-tighter">Timetable</h1>
                </div>
            </div>
            <div className="overflow-auto border rounded-md">
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
                                    <TableCell key={cellIndex} className="whitespace-pre-wrap">{cell ? cell : ''}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
