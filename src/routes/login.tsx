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
                        className="mb-4"
                        height="120"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "120/120",
                            objectFit: "cover",
                        }}
                        width="120"
                    />
                    <h1 className="text-2xl font-semibold text-gray-700">Fakulti Komputeran Universiti Teknologi Malaysia</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mt-2">E-Learning FK</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        <div className="border-r border-gray-200">
                            <h3 className="text-lg font-semibold text-center mb-4">STAF/PELAJAR</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="login">
                                        Login:
                                    </label>
                                    <Input id="login" placeholder="Your login" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                        Password:
                                    </label>
                                    <Input id="password" placeholder="Your password" type="password" />
                                </div>
                                <Button className="w-full">Submit</Button>
                            </form>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-lg font-semibold mb-4">PELAWAT</h3>
                            <p className="text-sm text-center mb-4">Capaian kandungan terhad kepada paparan maklumat sahaja.</p>
                            <Button className="w-full" variant="outline">
                                Masuk
                            </Button>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-center text-gray-600 mt-6">
                    Jika anda mempunyai sebarang komen atau pertanyaan mengenai halaman web ini sila hubungi webmaster di:
                    <a className="text-blue-600 hover:underline" href="#">
                        tims@fc.utm.my
                    </a>
                </p>
                <p className="text-xs text-center text-gray-600 mt-2">
                    Hakcipta Terpelihara © 2002-2024, Fakulti Komputeran, UTM
                </p>
            </div>
        </div>
    )
}

