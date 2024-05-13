import { Button } from "@/components/ui/button"
import { isAuthenticated } from "@/lib/utils"
import { AppStorage, User, logout } from "@/services/auth"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute('/profile')({
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
    const navigate = useNavigate()
    const [data, setData] = useState<AppStorage | null>(null)

    useEffect(() => {
        //get from sessionStorage then set to data
        const user = sessionStorage.getItem('web_fc_utm_my_ttms')
        if (user) {
            setData(JSON.parse(user))
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen mx-auto max-w-2xl gap-4 p-4">
            <div className="border-t flex items-center justify-center p-6 lg:border-t-0">
                <img
                    alt="University Logo"
                    className="w-48 object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdExRbVfBQxzHmteLr1aZzLLmaKfv81HZJ4HMFEpH72Q&s"
                />
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <div className="space-y-2">
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Name</div>
                        <div className="font-medium">{data?.user_auth?.full_name}</div>
                    </div>
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Matric Number</div>
                        <div className="font-medium">{data?.user_auth.login_name}</div>
                    </div>
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Description</div>
                        <div className="font-medium">{data?.user_auth.description}</div>
                    </div>
                </div>
            </div>
            {/* A button that calls a function */}
            <Button onClick={() => {
                logout()
                navigate({
                    to: '/login'
                })
            }}>Logout</Button>
        </div>
    )
}

function ChevronLeftIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}
