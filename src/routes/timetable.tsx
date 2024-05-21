import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/timetable')({
    component: Component,
    
})

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function Component() {
    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-2">
                <div className="w-12 h-12" />
                <div className="grid items-center grid-rows-2 gap-1">
                    <h1 className="text-2xl font-bold tracking-tighter">Fall 2024</h1>
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">Class Schedule</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4 border-0" />
                            <TableHead>Sunday</TableHead>
                            <TableHead>Monday</TableHead>
                            <TableHead>Tuesday</TableHead>
                            <TableHead>Wednesday</TableHead>
                            <TableHead>Thursday</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">8:00 AM</TableCell>
                            <TableCell>
                                <div className="grid items-center grid-cols-2 gap-2">
                                    <div>SECJ2112</div>
                                </div>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">9:00 AM</TableCell>
                            <TableCell>SECJ2112</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">10:00 AM</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>SECJ3112</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">11:00 AM</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>SECJ2112</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">12:00 PM</TableCell>
                            <TableCell className="font-medium">Lunch</TableCell>
                            <TableCell className="font-medium">Lunch</TableCell>
                            <TableCell className="font-medium">Lunch</TableCell>
                            <TableCell className="font-medium">Lunch</TableCell>
                            <TableCell className="font-medium">Lunch</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">1:00 PM</TableCell>
                            <TableCell>UHIT2112</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">2:00 PM</TableCell>
                            <TableCell>UHIT2112</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">3:00 PM</TableCell>
                            <TableCell>Math</TableCell>
                            <TableCell>English</TableCell>
                            <TableCell>History</TableCell>
                            <TableCell>Science</TableCell>
                            <TableCell>Art</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">4:00 PM</TableCell>
                            <TableCell>Math</TableCell>
                            <TableCell>English</TableCell>
                            <TableCell>History</TableCell>
                            <TableCell>Science</TableCell>
                            <TableCell>Art</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">5:00 PM</TableCell>
                            <TableCell>Math</TableCell>
                            <TableCell>English</TableCell>
                            <TableCell>History</TableCell>
                            <TableCell>Science</TableCell>
                            <TableCell>Art</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}





