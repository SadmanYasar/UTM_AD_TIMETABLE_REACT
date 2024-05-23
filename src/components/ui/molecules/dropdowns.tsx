import { SubjectResponse } from "@/services/subjects";
import { motion } from "framer-motion";
import { useState } from "react";
import { Filter, FilterKeys } from "../../../routes/subjects";
import { Button } from "../atoms/button";

export type Dropdowns = {
    key: FilterKeys;
    label: string;
}[];

type DropdownsProps = {
    filterQuery: Filter;
    setFilter: (filter: Filter) => void;
    data: SubjectResponse | undefined;
};

const dropdowns: Dropdowns = [
    { key: 'sesi', label: 'Session' },
    { key: 'semester', label: 'Semester' },
    { key: 'tahun_kursus', label: 'Course Year' },
    { key: 'kod_kursus', label: 'Course Code' },
    { key: 'kod_subjek', label: 'Subject Code' },
    { key: 'nama_subjek', label: 'Subject Name' },
    { key: 'status', label: 'Status' },
    { key: 'seksyen', label: 'Section' },
];

export default function Dropdowns({ filterQuery, setFilter, data }: DropdownsProps) {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <>
            {/* A button to open filter */}
            <div className="flex justify-center">
                <Button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="w-48 mb-4"
                >
                    {filterOpen ? "Close" : "Filter"}
                </Button>
            </div>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: filterOpen ? "auto" : 0 }}
                className={`flex flex-wrap gap-4 justify-center my-4 max-w-5xl w-full mx-auto ${filterOpen ? '' : 'hidden'}`}
            >
                <div className="flex flex-wrap gap-4 justify-center">
                    {dropdowns.map((dropdown) => (
                        <select
                            key={dropdown.key}
                            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filterQuery[dropdown.key]}
                            onChange={(e) =>
                                setFilter({ ...filterQuery, [dropdown.key]: dropdown.key === 'seksyen' || dropdown.key === 'semester' || dropdown.key === 'tahun_kursus' ? parseInt(e.target.value) || 0 : e.target.value || "" })
                            }
                        >
                            <option value="">Select {dropdown.label}</option>
                            {data &&
                                Array.from(
                                    new Set(data.map((subject) => subject[dropdown.key]))
                                ).map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))}
                        </select>
                    ))}
                </div>
            </motion.div>
        </>
    )
}
