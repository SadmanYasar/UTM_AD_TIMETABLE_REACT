import { isAuthenticated } from '@/lib/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
    beforeLoad: async ({ location }) => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/login',
                search: {
                    // Use the current location to power a redirect after login
                    redirect: location.href,
                },
            })
        } else {
            throw redirect({
                to: '/profile',
            })
        }
    },
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
        </div>
    )
}