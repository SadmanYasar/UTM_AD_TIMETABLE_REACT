import { Subject } from "@/services/subjects";
import { Meteors } from "../atoms/meteor";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function SubjectCard({
    kod_kursus,
    kod_subjek,
    nama_subjek,
    seksyen,
    semester,
    sesi,
    status,
    tahun_kursus
}: Subject) {
    let [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="w-full relative">
                <div className="absolute inset-0 h-full w-full transform scale-[0.80] rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                    {/* <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-2 w-2 text-gray-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                            />
                        </svg>
                    </div> */}

                    <h1 className="font-bold text-xl text-white mb-4 relative z-1">
                        {nama_subjek}
                    </h1>

                    <p className="font-normal text-base text-slate-500 mb-4 relative z-1">
                        {kod_subjek} - {seksyen}
                    </p>

                    <p className="font-normal text-base text-slate-500 mb-4 relative z-1">
                        {kod_kursus} - {sesi}
                    </p>

                    <p className="font-normal text-base text-slate-500 mb-4 relative z-1">
                        Semester {semester}
                    </p>

                    <button onClick={() => setIsOpen(true)} className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
                        Details
                    </button>

                    {/* Meaty part - Meteor effect */}
                    <Meteors number={5} />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30"
                        />
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-lg space-y-4 bg-white shadow-md p-12 rounded-md dark:bg-gray-900 dark:text-white"
                            >
                                <DialogTitle className="text-lg font-bold">{nama_subjek}</DialogTitle>
                                <Description>Course Code - {kod_kursus}</Description>
                                <Description>Section - {seksyen}</Description>
                                <Description>Semester - {semester}</Description>
                                <Description>Session - {sesi}</Description>
                                <Description>Course Year - {tahun_kursus}</Description>
                                <Description>Status - {status}</Description>
                                <div className="flex gap-4">
                                    <button onClick={() => setIsOpen(false)}>Close</button>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence >
        </>
    );
}
