import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../table";

export default function SessionSemesterLoadingTable() {
    return (
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
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? 'animate-pulse bg-gray-100' : ''} >
                            <TableCell>
                                <div className="h-4 rounded w-2/4" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded w-1/4" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded w-1/4" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded w-1/4" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded w-1/4" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </>
    )
}