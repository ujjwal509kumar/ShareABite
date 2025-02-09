'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PrivacyPolicy = () => {

    const router = useRouter();

    const sections = [
        {
            id: 1,
            title: 'Introduction',
            content:
                'We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your data while using our services.',
        },
        {
            id: 2,
            title: 'Data Collection',
            content:
                'We may collect various types of information including your name, email address, and browsing behavior. This data helps us improve your experience and tailor our services to your needs.',
        },
        {
            id: 3,
            title: 'Use of Data',
            content:
                'Your information is used solely to enhance your experience, deliver personalized content, and improve our overall service quality. We never sell your data to third parties.',
        },
        {
            id: 4,
            title: 'Cookies and Tracking',
            content:
                'Our website uses cookies and similar tracking technologies to monitor activity and improve our service. You can disable cookies in your browser settings if you prefer.',
        },
        {
            id: 5,
            title: 'Third-Party Sharing',
            content:
                'In some cases, we may share your information with trusted partners who assist us with our operations. All such partners are obligated to protect your data and use it only for the purposes we specify.',
        },
        {
            id: 6,
            title: 'Your Rights',
            content:
                'You have the right to access, modify, or delete your personal data. If you wish to exercise these rights or have any concerns about your privacy, please contact us using the information provided below.',
        },
        {
            id: 7,
            title: 'Contact Information',
            content:
                'If you have any questions or concerns about this Privacy Policy, please contact us at ujjwal509kumar@gmail.com. We are here to help and ensure your privacy is respected.',
        },
    ];

    const [openSections, setOpenSections] = useState({});

    const toggleSection = (id) =>
        setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="mt-10 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
                <p className="text-lg text-center mb-8">
                    Your privacy is important to us. Below you will find details about
                    how we collect, use, and protect your information.
                </p>

                {/* Accordion Sections */}
                <div className="space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex justify-between items-center px-4 py-3 focus:outline-none focus-visible:ring focus-visible:ring-green-500"
                            >
                                <span className="text-xl font-medium">{section.title}</span>
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 ${openSections[section.id] ? 'rotate-180' : 'rotate-0'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`px-4 overflow-hidden transition-all duration-300 ${openSections[section.id]
                                    ? 'max-h-96 py-2 opacity-100'
                                    : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <p className="text-base leading-relaxed">{section.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back to Home Link */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-green-500 dark:bg-green-400 text-white rounded-lg shadow hover:bg-green-600 dark:hover:bg-green-500 font-bold transition-colors duration-200"
                    >
                        HOME
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
