import React, { useEffect, useState } from 'react';
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getStudents, Student } from '../services/pelajar';
import { isAuthenticated } from "@/lib/utils";
import { useQuery } from '@tanstack/react-query';

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const session_id = "your_session_id"; // Replace with actual session ID
  const sesi = "your_sesi"; // Replace with actual sesi
  const semester = 1; // Replace with actual semester
  const limit = 100; // Replace with actual limit
  const offset = 0; // Replace with actual offset

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents(session_id, sesi, semester, limit, offset);
      if (data) {
        setStudents(data);
      }
    };

    fetchStudents();
  }, [session_id, sesi, semester, limit, offset]);

  return (
    <div>
      <h1>List of Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.no_matrik}>{student.nama}</li>
        ))}
      </ul>
    </div>
  );
};

export const Route = createFileRoute('/students')({
  component: Students,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
});

export default Students;
