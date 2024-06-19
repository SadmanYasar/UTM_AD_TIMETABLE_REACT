import React, { Suspense } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isAuthenticated } from '../lib/utils'
import Header from '@/components/ui/molecules/header'

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
                    {/* 
                        <Suspense>
                        <TanStackRouterDevtools position="bottom-right" />
                        </Suspense>
                        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" /> 
                        */}
                </>
            )
        } else {
            return (
                <>
                    {/* <div className="flex justify-center gap-2 p-2 bg-opacity-50 border backdrop-filter backdrop-blur-lg">
                            <Link to="/profile" className="[&.active]:font-bold">
                                Profile
                            </Link>{' '}
                            <Link to="/session_semester" className="[&.active]:font-bold">
                                Session/Semester
                            </Link>{' '}
                            <Link to="/timetable" className="[&.active]:font-bold">
                                Timetable
                            </Link>{' '}
                            <Link to="/subjects" className="[&.active]:font-bold">
                                Subjects
                            </Link>{' '}
                        </div> */}
                    <Header />
                    <div className='pb-4'>
                        <Outlet />
                    </div>
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