import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { isAuthenticated } from "@/lib/utils"
import { AppStorage, User, logout } from "@/services/auth"
import { SesiSemester, SesiSemesterResponse, fetchSesiSemester } from "@/services/session_semester"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

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
        return <div>Loading...</div>
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
            {/* Display the data in a table for desktop and as 1 column of rows on mobile. Use Shadcn */}
            <>
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12" />
                    <div className="grid grid-rows-2 items-center gap-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Session Semester</h1>
                        <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">List of session semester</p>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead align="center">Semester</TableHead>
                            <TableHead align="center">Semester ID</TableHead>
                            <TableHead align="center">Tarikh Tamat</TableHead>
                            <TableHead align="center">Tarikh Mula</TableHead>
                            <TableHead align="center">Session</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item: SesiSemester, index) => (
                            <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <TableCell>{item.semester}</TableCell>
                                <TableCell>{item.sesi_semester_id}</TableCell>
                                <TableCell>{item.tarikh_tamat}</TableCell>
                                <TableCell>{item.tarikh_mula}</TableCell>
                                <TableCell>{item.sesi}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        </> // Add a closing tag for the return statement
    )
}