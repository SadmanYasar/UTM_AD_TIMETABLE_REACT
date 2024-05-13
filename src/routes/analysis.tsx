/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3rPzaCO5PqW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/analysis')({
    component: Component,
})

export default function Component() {
    return (
        <div className="grid w-full min-h-screen gap-4 px-4 pb-4 md:px-6 md:gap-8">
            <div className="border-t border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-5xl grid gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-5">
                            Faculty of Computing
                        </div>
                        <div className="text-base font-semibold tracking-wide">Universiti Teknologi Malaysia</div>
                    </div>
                    <div className="grid gap-1.5">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">User information</div>
                        <div className="text-sm font-medium tracking-wide">SADMAN YASAR SAYEM-A21EC3052</div>
                        <div className="text-sm font-medium tracking-wide">E-Learning FC</div>
                        <div className="text-sm font-medium tracking-wide">2023/2024-2</div>
                    </div>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="border border-gray-200 bg-white shadow-sm rounded-md dark:border-gray-800 dark:bg-gray-950 dark:shadow-md">
                    <div className="overflow-auto">
                        <Tabs>
                            {/* <TabsList className="flex-1 grid w-full grid-cols-4">
                                <TabsTrigger index={0}>Time & Space</TabsTrigger>
                                <TabsTrigger index={1}>Subject</TabsTrigger>
                                <TabsTrigger index={2}>Student</TabsTrigger>
                                <TabsTrigger index={3}>Lecturer</TabsTrigger>
                            </TabsList> */}
                            {/* <div>
                                <div className="p-4">
                                    <div className="grid w-full gap-4 md:grid-cols-2">
                                        <div className="flex items-center gap-4">
                                            <Label className="flex-none w-20" htmlFor="day">
                                                Day
                                            </Label>
                                            <Select className="flex-1" id="day">
                                                <option>Monday</option>
                                                <option>Tuesday</option>
                                                <option>Wednesday</option>
                                                <option>Thursday</option>
                                                <option>Friday</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Label className="flex-none w-20" htmlFor="building">
                                                Building
                                            </Label>
                                            <Select className="flex-1" id="building">
                                                <option value="n28">N28</option>
                                                <option value="d07">D07</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="overflow-auto max-w-[calc(520px+-1rem)] border rounded-md border-gray-200 dark:border-gray-800">
                                        <table className="w-full text-sm border-collapse min-w-[520px]">
                                            <thead>
                                                <tr className="border-t border-gray-200 dark:border-gray-800">
                                                    <th className="p-2 bg-gray-100 first:rounded-tl-md dark:bg-gray-800">08:00-08:45</th>
                                                    <th className="p-2 bg-gray-100 dark:bg-gray-800">08:45-09:30</th>
                                                    <th className="p-2 bg-gray-100 dark:bg-gray-800">09:45-10:30</th>
                                                    <th className="p-2 bg-gray-100">10:30-11:15</th>
                                                    <th className="p-2 bg-gray-100">11:15-12:00</th>
                                                    <th className="p-2 bg-gray-100">12:00-12:45</th>
                                                    <th className="p-2 bg-gray-100">12:45-13:30</th>
                                                    <th className="p-2 bg-gray-100">13:30-14:15</th>
                                                    <th className="p-2 bg-gray-100">14:15-15:00</th>
                                                    <th className="p-2 bg-gray-100">15:00-15:45</th>
                                                    <th className="p-2 bg-gray-100">15:45-16:30</th>
                                                    <th className="p-2 bg-gray-100 last:rounded-br-md">16:30-17:15</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="p-2">1</td>
                                                    <td className="p-2">2</td>
                                                    <td className="p-2">3</td>
                                                    <td className="p-2">4</td>
                                                    <td className="p-2">5</td>
                                                    <td className="p-2">6</td>
                                                    <td className="p-2">7</td>
                                                    <td className="p-2">8</td>
                                                    <td className="p-2">9</td>
                                                    <td className="p-2">10</td>
                                                    <td className="p-2">11</td>
                                                    <td className="p-2">12</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> */}
                            <div>
                                <div className="p-4">Subject</div>
                            </div>
                            <div>
                                <div className="p-4">Student</div>
                            </div>
                            <div>
                                <div className="p-4">Lecturer</div>
                            </div>
                        </Tabs>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="text-sm font-medium">Date</div>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-4">
                            <div className="text-sm font-medium">Academic Week</div>
                            <div className="text-sm font-medium">Date Range</div>
                            <div className="text-sm font-medium">Current Week</div>
                            <div className="text-sm font-medium">Date Range</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm font-medium">Input Pengg</div>
                            <Input className="w-[200px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



