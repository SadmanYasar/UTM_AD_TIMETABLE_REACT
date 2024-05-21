/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TimetableImport } from './routes/timetable'
import { Route as SubjectsImport } from './routes/subjects'
import { Route as SessionsemesterImport } from './routes/session_semester'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'
import { Route as AnalysisImport } from './routes/analysis'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TimetableRoute = TimetableImport.update({
  path: '/timetable',
  getParentRoute: () => rootRoute,
} as any)

const SubjectsRoute = SubjectsImport.update({
  path: '/subjects',
  getParentRoute: () => rootRoute,
} as any)

const SessionsemesterRoute = SessionsemesterImport.update({
  path: '/session_semester',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AnalysisRoute = AnalysisImport.update({
  path: '/analysis',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/analysis': {
      preLoaderRoute: typeof AnalysisImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/session_semester': {
      preLoaderRoute: typeof SessionsemesterImport
      parentRoute: typeof rootRoute
    }
    '/subjects': {
      preLoaderRoute: typeof SubjectsImport
      parentRoute: typeof rootRoute
    }
    '/timetable': {
      preLoaderRoute: typeof TimetableImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AnalysisRoute,
  LoginRoute,
  ProfileRoute,
  SessionsemesterRoute,
  SubjectsRoute,
  TimetableRoute,
])

/* prettier-ignore-end */
