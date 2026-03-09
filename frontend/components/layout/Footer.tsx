'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MapPin, Mail, Phone, Globe } from 'lucide-react';
import { IconInstagram, IconLinkedIn } from './Icon'

export default function Footer() {
    const [isHovered, setIsHovered] = useState(false)

    const developers = [
        {
            name: "Akbar Zaidan Rohman",
            role: "Full Stack Developer",
            position: "FILE Manager | BNCC KMG 36",
            image: "/images/footer/photo-akbar.webp",
            linkedin: "https://www.linkedin.com/in/akbarzaidanr/",
            instagram: "https://instagram.com/akbrzr"
        }, {
            name: "Tasya Pandya Latifa",
            role: "UI/UX Designer",
            position: "PR Manager | BNCC KMG 36",
            image: "/images/footer/photo-tasya.webp",
            linkedin: "https://id.linkedin.com/in/tasyapandya",
            instagram: "https://instagram.com/tasyapndya"
        }
    ]

    return (
        <div className="px-8 sm:px-16 text-[#0054A5] bg-[#F2F5F9] py-8 shadow-22">
            <div className='flex flex-col lg:flex-row gap-2 lg:gap-8 lg:gap-0 items-center lg:items-start text-center lg:text-left'>
                <div className='hidden lg:flex lg:w-1/3 flex-col pr-10'>
                    <img src="/logo-bnccin2.svg" width={200} alt="BNCC Logo" />
                </div>

                <div className='lg:hidden mb-6'>
                    <img src="/logo-bnccin2.svg" width={150} className="w-36 sm:w-44" alt="BNCC Logo" />
                </div>

                <div className='lg:w-1/3'>
                    <div className='mb-5'>
                        <h1 className='font-bold text-lg lg:mb-2 text-center lg:text-left'>
                            About Us
                        </h1>
                        <h2 className='font-medium text-xs sm:text-sm lg:text-justify lg:max-w-150'>
                            Established in 1989, Bina Nusantara Computer Club is the oldest computer-based organization at BINUS University. We are a close-knit family of exceptional individuals who are passionately into technology and a commitment to professionalism.
                        </h2>
                    </div>

                    <div className='lg:mb-0 flex flex-col'>
                        <h1 className='font-bold text-lg lg:mb-2'>Legal</h1>
                        <Link href="/terms-of-service" className='font-medium text-xs sm:text-sm hover:underline'>Terms of Service</Link>
                        <Link href="/privacy-policy" className='font-medium text-xs sm:text-sm hover:underline'>Privacy Policy</Link>
                    </div>
                </div>

                <div className='hidden lg:block lg:w-1/3 lg:pl-15 xl:pl-40'>
                    <div className='mb-8 lg:mb-10'>
                        <h1 className='font-bold text-lg mb-2'>Contact Information</h1>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-start gap-3'>
                                <MapPin className='mt-1 w-5 flex-shrink-0' />
                                <Link
                                    href="https://maps.app.goo.gl/NBkrqkRB4n34YSzt5"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <h2 className='font-medium text-sm hover:underline'>Jalan Rawa Belong No.51A,<br />Kec. Palmerah, Kota Jakarta Barat.</h2>
                                </Link>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Mail className='w-5 flex-shrink-0' />
                                <Link href="mailto:pr@bncc.net">
                                    <h2 className="font-medium text-sm hover:underline">pr@bncc.net</h2>
                                </Link>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Phone className='w-5 flex-shrink-0' />
                                <Link
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <h2 className="font-medium text-sm hover:underline">+62 822 9946 1218 <span>(Arie)</span></h2>
                                </Link>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Globe className='w-5 flex-shrink-0' />
                                <Link
                                    href="https://www.bncc.net"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <h2 className='font-medium text-sm hover:underline'>www.bncc.net</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row lg:justify-between mt-8 lg:mt-10 gap-6 lg:items-end relative'>
                <div className='flex gap-6 sm:gap-8 justify-center lg:justify-end order-2 lg:order-3 lg:mb-4'>
                    <Link href="https://instagram.com/bnccbinus" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src="/images/footer/icon-ig.svg" width={30} className='cursor-pointer w-6 sm:w-7 lg:w-[26px]' alt="Instagram" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/bnccbinus" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <img src="/images/footer/icon-linkedin.svg" width={30} className='cursor-pointer w-6 sm:w-7 lg:w-[25px]' alt="LinkedIn" />
                    </Link>
                    <Link href="https://www.facebook.com/bina.nusantara.computer.club" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <img src="/images/footer/icon-fb.svg" width={30} className='cursor-pointer w-6 sm:w-7 lg:w-[26px]' alt="Facebook" />
                    </Link>
                    <Link href="https://x.com/BNCC_Binus" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                        <img src="/images/footer/icon-x.svg" width={30} className='cursor-pointer w-6 sm:w-7 lg:w-[25px]' alt="X" />
                    </Link>
                    <Link href="https://www.tiktok.com/@bnccbinus" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <img src="/images/footer/icon-tiktok.svg" width={27} className='cursor-pointer w-5 sm:w-6 lg:w-[22px]' alt="TikTok" />
                    </Link>
                </div>

                <div className="hidden lg:block relative order-1 lg:order-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <button className='bg-gradient-to-r from-[#0054A5] to-[#003d7a] text-white flex items-center gap-2 px-5 py-2 rounded-t-2xl cursor-pointer transition-all hover:bg-[#003d7a]'>
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? '' : 'rotate-180'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className='font-medium text-sm'>Created by</span>
                    </button>

                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-0 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`} style={{ width: '500px' }}>
                        <div className="p-4">
                            <div className="flex gap-6 items-end justify-end">
                                {developers.map((dev, idx) => (
                                    <div key={idx} className="flex-1">
                                        <h3 className="text-[#0054A5] font-semibold text-sm mb-3">{dev.role}</h3>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                                                <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                                            </div>

                                            <h4 className="text-[#0054A5] font-bold text-center text-sm mb-1">{dev.name}</h4>
                                            <p className="text-[#0054A5] text-xs text-center font-medium mb-3">{dev.position}</p>

                                            <div className="flex justify-center gap-3">
                                                <Link
                                                    href={dev.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#0054A5] to-[#0066CC] hover:shadow-sm hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                                                >
                                                    <IconLinkedIn className="w-5 h-5 text-white relative z-10" />
                                                </Link>

                                                <Link
                                                    href={dev.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 hover:shadow-sm hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
                                                >
                                                    <IconInstagram className="w-5 h-5 text-white relative z-10" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='font-medium text-xs sm:text-sm text-center lg:text-left order-3 lg:order-1 lg:mb-4'>
                    Copyright 2025 bncc.in | All Rights Reserved
                </div>
            </div>

            <hr className='hidden lg:block lg:mb-2 bg-[#0054A5]' />
        </div>
    )
}