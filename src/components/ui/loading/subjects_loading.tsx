import { BentoGrid } from "@/components/ui/atoms/bentoGrid"

export default function LoadingSubjects() {
    return (
        <>
            <BentoGrid className="container mx-auto px-8">
                {Array.from({ length: 10 }).map((_, index) => (
                    <LoadingCard key={index} />
                ))}
            </BentoGrid>
        </>
    )
}


const LoadingCard = () => {
    return (
        <>
            <div className="w-full relative">
                <div className="absolute inset-0 h-full w-full border transform scale-[0.80]rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )
}




