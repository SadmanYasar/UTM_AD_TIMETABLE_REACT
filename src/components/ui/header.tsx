import { useState, useEffect } from "react"
import { Dialog, DialogPanel, Disclosure, DisclosureButton, Popover, PopoverButton, PopoverGroup } from "@headlessui/react"
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline"
import { motion, useScroll } from 'framer-motion';
import { Link } from "@tanstack/react-router";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll();

    /** this onUpdate function will be called in the `scrollY.onChange` callback **/
    function update() {
        const previousY = scrollY.getPrevious()
        if (previousY) {
            if (scrollY?.get() < previousY) {
                setHidden(false);
            } else if (scrollY?.get() > 100 && scrollY?.get() > previousY) {
                setHidden(true);
            }
        }
    }

    /** add this useEffect hook to return events everytime the scrollY changes **/
    useEffect(() => {
        return scrollY.on('change', update);
    });

    const variants = {
        /** this is the "visible" key and it's respective style object **/
        visible: { opacity: 1, y: 0 },
        /** this is the "hidden" key and it's respective style object **/
        hidden: { opacity: 0, y: -25 }
    };

    return (
        <motion.header
            className={`sticky top-0 ${mobileMenuOpen ? 'z-10' : 'z-[100]'} w-full backdrop-filter backdrop-blur-lg bg-opacity-30`}
            variants={variants}
            animate={hidden ? "hidden" : "visible"}
            transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
        >
            <nav
                className="flex items-center justify-between p-4 mx-auto max-w-7xl lg:px-8"
                aria-label="Global">
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link onClick={() => setMobileMenuOpen(false)} to="/profile"
                    >
                        Profile
                    </Link>{' '}
                    <Link onClick={() => setMobileMenuOpen(false)} to="/session_semester"
                    >
                        Session/Semester
                    </Link>{' '}
                    <Link onClick={() => setMobileMenuOpen(false)} to="/timetable"
                    >
                        Timetable
                    </Link>{' '}
                    <Link onClick={() => setMobileMenuOpen(false)} to="/subjects"
                    >
                        Subjects
                    </Link>{' '}
                </PopoverGroup>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-primary-black bg-black sm:max-w-sm sm:ring-1">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flow-root mt-6">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6 space-y-2">
                                <Link onClick={() => setMobileMenuOpen(false)} to="/profile" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-slate-800"
                                >
                                    Profile
                                </Link>{' '}
                                <Link onClick={() => setMobileMenuOpen(false)} to="/session_semester" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-slate-800"
                                >
                                    Session/Semester
                                </Link>{' '}
                                <Link onClick={() => setMobileMenuOpen(false)} to="/timetable" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-slate-800"
                                >
                                    Timetable
                                </Link>{' '}
                                <Link onClick={() => setMobileMenuOpen(false)} to="/subjects" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-slate-800"
                                >
                                    Subjects
                                </Link>{' '}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </motion.header>
    )
}