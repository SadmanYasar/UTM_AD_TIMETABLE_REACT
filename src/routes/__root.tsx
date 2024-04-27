import React, { Suspense } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        )

export const Route = createRootRoute({
    component: () => (
        <>
            {/* <div className="p-2 flex gap-2">
                <Link to="/login" className="[&.active]:font-bold">
                    login
                </Link>{' '}
            </div>
            <hr /> */}
            <Outlet />
            {/* <Suspense>
                <TanStackRouterDevtools position="bottom-right" />
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" /> */}
        </>
    ),
})