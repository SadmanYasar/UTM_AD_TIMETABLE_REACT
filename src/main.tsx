import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { Spinner } from './components/ui/atoms/spinner';
import { ThemeProvider } from './components/ui/molecules/themeProvider';

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
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} defaultPreload="intent" />
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>,
    )
}