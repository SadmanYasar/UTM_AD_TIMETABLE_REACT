import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { Spinner } from './components/ui/spinner';

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPendingComponent: () => (
        <div className={`p-2 text-2xl`}>
            <Spinner />
        </div>
    ),
    defaultErrorComponent: ({ error }: { error: any }) => <ErrorComponent error={error} />,
    context: {
        auth: undefined!, // We'll inject this when we render
        queryClient,
    },
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} defaultPreload="intent" />
            </QueryClientProvider>
        </StrictMode>,
    )
}