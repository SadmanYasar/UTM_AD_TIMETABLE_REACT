import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../atoms/table";

export default function SessionSemesterLoadingTable() {
    return (
        <div className="container py-10 mx-auto">
            <div className="flex items-center gap-2">
                <div className="grid items-center grid-rows-2 gap-1">
                    <h1 className="text-2xl font-bold tracking-tighter">Loading</h1>
                </div>
            </div>
            <Table className="border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead align="center">Semester</TableHead>
                        <TableHead align="center">ID</TableHead>
                        <TableHead align="center">Start Date</TableHead>
                        <TableHead align="center">End Date</TableHead>
                        <TableHead align="center">Session</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? 'animate-pulse bg-gray-800' : ''} >
                            <TableCell>
                                <div className="h-4 rounded " />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded " />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded " />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded " />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 rounded " />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </div>
    )
}