import React, { Suspense } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isAuthenticated } from '../lib/utils'

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        )

/* Will show navbar only if authenticated */
export const Route = createRootRoute({
    component: () => {
        if (!isAuthenticated()) {
            return (
                <>
                    <Outlet />
                </>
            )
        } else {
            return (
                <>
                    <div className="p-2 flex gap-2">
                        <Link to="/profile" className="[&.active]:font-bold">
                            Profile
                        </Link>{' '}
                        <Link to="/routine" className="[&.active]:font-bold">
                            Timetable
                        </Link>{' '}
                        <Link to="/analysis" className="[&.active]:font-bold">
                            Course
                        </Link>{' '}
                    </div>
                    <hr />
                    <Outlet />
                    {/* 
                    <Suspense>
                    <TanStackRouterDevtools position="bottom-right" />
                    </Suspense>
                    <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" /> 
                    */}
                </>
            )
        }
    },
})