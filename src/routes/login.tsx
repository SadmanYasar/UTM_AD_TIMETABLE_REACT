import { Input } from "@/components/ui/atoms/input"
import { Button } from "@/components/ui/atoms/button"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { adminLogin, login } from "@/services/auth"
import { Router } from "@tanstack/react-router"
import { RadioGroup, RadioGroupItem } from "@/components/ui/atoms/radio-group"
import { Label } from "@/components/ui/atoms/label"

export const Route = createFileRoute('/login')({
    component: Component,
})

export default function Component() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await login(username, password)
            //navigate to "/profile" route
            navigate({
                to: '/profile'
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <img
                        alt="University Logo"
                        className="object-cover w-48 mb-4"
                        src="utm_logo.png"
                    // width={96}
                    // height={96}
                    />
                    <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Faculty of Computing, Universiti Teknologi Malaysia</h1>
                    <h2 className="mt-2 text-xl font-semibold text-gray-700 dark:text-white">E-Learning FK</h2>
                </div>
                <div className="overflow-hidden bg-white rounded-lg shadow-md">
                    <div className="grid grid-cols-1 gap-4 p-4">
                        {/* <div className="border-r border-gray-200"> */}
                        <h3 className="mb-4 text-lg font-semibold text-center dark:text-black">STAFF/STUDENT</h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="login">
                                    Login:
                                </label>
                                <Input id="login" placeholder="Your login" className="dark:text-black" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password:
                                </label>
                                <Input id="password" placeholder="Your password" className="dark:text-black" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                            </div>
                            <Button type="submit" className="w-full dark:text-white dark:bg-navBg">Submit</Button>
                        </form>
                    </div>
                </div>
                <p className="mt-6 text-xs text-center text-gray-600">
                    If you have any comments or questions about this web page, please contact the webmaster at:
                    <a className="text-blue-600 hover:underline" href="#">
                        tims@fc.utm.my
                    </a>
                </p>
                <p className="mt-2 text-xs text-center text-gray-600">
                    Copyright © 2002-2024, Faculty of Computer Science, UTM
                </p>
            </div>
        </div>
    )
}

