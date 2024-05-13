/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mTGKyF9bRgj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { isAuthenticated } from "@/lib/utils"
import { logout } from "@/services/auth"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"

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

    

    return (
        <div className="grid min-h-screen gap-4 p-4 lg:grid-cols-2 lg:gap-0">
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Button className="lg:hidden" variant="outline">
                        <ChevronLeftIcon className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <div className="space-y-2">
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Name</div>
                        <div className="font-medium">Sadman Yasar Sayem</div>
                    </div>
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Matric Number</div>
                        <div className="font-medium">A21EC3052</div>
                    </div>
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Session</div>
                        <div className="font-medium">2023/2024</div>
                    </div>
                    <div className="grid gap-0.5">
                        <div className="text-sm font-medium text-gray-500">Year of Study</div>
                        <div className="font-medium">3rd Year</div>
                    </div>
                </div>
            </div>
            <div className="border-t flex items-center justify-center p-6 lg:border-t-0 lg:p-10">
                <img
                    alt="Profile picture"
                    className="rounded-full"
                    height="150"
                    src="https://avatars.githubusercontent.com/u/67522140?v=4"
                    style={{
                        aspectRatio: "150/150",
                        objectFit: "cover",
                    }}
                    width="150"
                />
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

function ChevronLeftIcon(props) {
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
