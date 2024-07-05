import React from 'react';
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getLecturers, Lecturer } from '../services/pensyarah';
import { isAuthenticated, getSessionDetails } from "@/lib/utils";
import { useQuery } from '@tanstack/react-query';
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute('/lecturers')({
  component: Component,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Component() {
  const sessionDetails = getSessionDetails();
  if (!sessionDetails) {
    return <div>Error: Unable to retrieve session details. Please log in again.</div>;
  }

  const { session_id, admin_session_id } = sessionDetails;
  const semester = 1; // Replace with actual semester logic

  const { data: lecturers, isLoading, error } = useQuery({
    queryKey: ['lecturers'],
    queryFn: () => getLecturers(semester),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!lecturers) {
    return <div>No lecturers found.</div>;
  }

  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-2xl font-bold tracking-tighter">List of Lecturers</h1>
      <div className="overflow-auto border rounded-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">No. Pekerja</th>
              <th className="py-2">Nama</th>
              <th className="py-2">Bil Subjek</th>
              <th className="py-2">Bil Seksyen</th>
              <th className="py-2">Bil Pelajar</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer) => (
              <tr key={lecturer.no_pekerja}>
                <td className="border px-4 py-2">{lecturer.no_pekerja}</td>
                <td className="border px-4 py-2">{lecturer.nama}</td>
                <td className="border px-4 py-2">{lecturer.bil_subjek}</td>
                <td className="border px-4 py-2">{lecturer.bil_seksyen}</td>
                <td className="border px-4 py-2">{lecturer.bil_pelajar}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/lecturer_timetable/${lecturer.no_pekerja}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Timetable
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Component;
