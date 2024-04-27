/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Bbc1NzhKoqD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/login')({
    component: Component,
})

export default function Component() {
    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <img
                        alt="University Logo"
                        className="mb-4 w-48 object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdExRbVfBQxzHmteLr1aZzLLmaKfv81HZJ4HMFEpH72Q&s"
                    // width={96}
                    // height={96}
                    />
                    <h1 className="text-2xl font-semibold text-gray-700 text-center">Faculty of Computing, Universiti Teknologi Malaysia</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mt-2">E-Learning FK</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 gap-4 p-4">
                        {/* <div className="border-r border-gray-200"> */}
                        <h3 className="text-lg font-semibold text-center mb-4">STAFF/STUDENT</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="login">
                                    Login:
                                </label>
                                <Input id="login" placeholder="Your login" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password:
                                </label>
                                <Input id="password" placeholder="Your password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                        {/* </div> */}
                        {/* <div className="flex flex-col items-center justify-center">
                            <h3 className="text-lg font-semibold mb-4">VISITORS</h3>
                            <p className="text-sm text-center mb-4">Content access is limited to information display only.</p>
                            <Button className="w-full" variant="outline">
                                Sign in
                            </Button>
                        </div> */}
                    </div>
                </div>
                <p className="text-xs text-center text-gray-600 mt-6">
                    If you have any comments or questions about this web page, please contact the webmaster at:
                    <a className="text-blue-600 hover:underline" href="#">
                        tims@fc.utm.my
                    </a>
                </p>
                <p className="text-xs text-center text-gray-600 mt-2">
                    Copyright © 2002-2024, Faculty of Computer Science, UTM
                </p>
            </div>
        </div>
    )
}
