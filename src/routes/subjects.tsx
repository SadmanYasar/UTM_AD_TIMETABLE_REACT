import { BentoGrid } from "@/components/ui/bentoGrid"
import { Button } from "@/components/ui/button"
import { SubjectCard } from "@/components/ui/subjectCard"
import { getUser, isAuthenticated } from "@/lib/utils"
import { getSubjects } from "@/services/subjects"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute('/subjects')({
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
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjects(getUser()?.user_auth?.login_name),
    })

    if (isLoading) {
        return <>Loading...</>
    }

    if (error) {
        return (
            <>
                <div>An error occurred</div>
                <Button onClick={() => refetch()}>Retry</Button>
            </>
        )
    }

    return (
        <>
            <BentoGrid className="max-w-5xl mx-auto px-8">
                {data && data.map((subject, index) => (
                    <SubjectCard {...subject} key={index} />
                ))}
            </BentoGrid>
        </>
    )
}





