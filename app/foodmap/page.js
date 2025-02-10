'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {subtitle && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {subtitle}
            </p>
        )}
    </div>
);


const ActiveDonationCard = ({ donation }) => (
    <div className="p-6 border rounded-lg shadow bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center">
            <p className="font-bold text-lg">{donation.volunteerName}</p>
            <p className="font-light text-sm">Mobile : {donation.volunteerMobile}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {donation.donationCenter} - {donation.donationLocation}
            </p>
            <span className="mt-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                Active
            </span>
        </div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>Type: {donation.donationType}</p>
            <p>Active from: {new Date(donation.activeFrom).toLocaleString()}</p>
            <p>Active until: {new Date(donation.activeUntil).toLocaleString()}</p>
        </div>
    </div>
);

const FoodCenterCard = ({ center }) => (
    <div className="border rounded-lg bg-white dark:bg-gray-800 shadow overflow-hidden">
        <div className="relative h-48 w-full">
            <Image src={center.image} alt={center.alt} fill className="object-cover" />
        </div>
        <div className="p-4">
            <h3 className="font-bold text-xl">{center.name}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{center.description}</p>
            {center.extra && (
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                    {center.extra}
                </p>
            )}
        </div>
    </div>
);


const InitiativeCard = ({ initiative }) => (
    <div className="border rounded-lg bg-white dark:bg-gray-800 shadow overflow-hidden">
        <div className="relative h-48 w-full">
            <Image src={initiative.image} alt={initiative.alt} fill className="object-cover" />
        </div>
        <div className="p-4">
            <h3 className="font-bold text-xl">{initiative.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{initiative.description}</p>
            {initiative.extra && (
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                    {initiative.extra}
                </p>
            )}
        </div>
    </div>
);

const FoodMap = () => {
    const [activeDonations, setActiveDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonations() {
            try {
                const res = await fetch('/api/getactivecenter');
                const data = await res.json();
                setActiveDonations(data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);

    const foodCenters = [
        {
            name: 'Uttrahalli',
            image:
                'https://img.freepik.com/free-photo/group-people-volunteering-foodbank-poor-people_23-2149012196.jpg?t=st=1739119102~exp=1739122702~hmac=a1f41535630c80deaed40c7c9a664451aaee52dd8f1c37ba0bb376698a66cb3c&w=996',
            alt: 'Uttrahalli Food Center',
            description:
                'At Uttrahalli, our hardworking team transforms surplus food into a true lifeline for our people. Every day, we collect extra food from local vendors and swiftly share it with those in need, driven by our spirit of seva and heartfelt care.',

        },
        {
            name: 'Banshankri',
            image:
                'https://img.freepik.com/free-photo/close-up-volunteers-working-together_23-2149182025.jpg?t=st=1739119179~exp=1739122779~hmac=675b3db7f331acb6008324d4b5a9c228db2bf7c1183bb23992fa6a78f0a82fc3&w=996',
            alt: 'Banshankri Food Center',
            description:
                'At the Banshankri centre, community engagement is at our core. Our dedicated volunteers work hand-in-hand with local organisations to ensure every morsel of surplus food is put to good use, reflecting our deep commitment to humanity.',

        },
        {
            name: 'Kengeri',
            image:
                'https://img.freepik.com/free-photo/begging-bridge-with-person-who-handed-bread_1150-22948.jpg?t=st=1739119219~exp=1739122819~hmac=74d42bb9c15e8ccb1b42a40593d273533c75459255ab72745e9a624e1ed96c43&w=996',
            alt: 'Kengeri Food Center',
            description:
                'In Kengeri, we focus on reaching the most underserved areas. Our team works tirelessly to deliver fresh, nutritious food directly to remote communities, ensuring that no one is left behind in our journey towards a hunger-free India.',

        },
    ];


    const initiatives = [
        {
            title: 'School Meal Programs',
            image:
                'https://images.unsplash.com/photo-1556543365-e08680c86612?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'School Meal Programs',
            description:
                'Our school meal programs ensure that every child starts their day with a nutritious breakfast and a wholesome lunch. We work closely with schools to provide regular, balanced meals that support both learning and growth.',

        },
        {
            title: 'Local Food Banks',
            image:
                'https://images.unsplash.com/photo-1615897570582-285ffe259530?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Local Food Banks',
            description:
                'In partnership with local food banks, we redirect surplus food to community feeding programs. This collaboration ensures that no edible food is wasted and that every donation reaches someone in need.',

        },
        {
            title: 'Emergency Relief',
            image:
                'https://images.unsplash.com/photo-1599700403969-f77b3aa74837?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Emergency Relief',
            description:
                'During times of crisis, our emergency relief efforts provide immediate food support to communities in distress. We mobilize quickly to deliver critical resources when they are needed the most.',

        },
    ];

    return (
        <div className="mt-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-12">Food Map</h1>

            {/* Active Donations Section */}
            <section className="mb-16">
                <SectionTitle
                    title="Currently Active Food Donations"
                    subtitle="Every active donation event tells a story of compassion and community spirit. Our volunteers work tirelessly to ensure surplus food reaches those in need, transforming hope into action."
                />
                {loading ? (
                    <p className="text-center text-green-500 font-bold animate-pulse">Loading active donations...</p>
                ) : activeDonations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeDonations.map((donation) => (
                            <ActiveDonationCard key={donation.id} donation={donation} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center font-bold text-red-600 dark:text-red-600">
                        No active donations at the moment.
                    </p>
                )}
            </section>

            {/* Food Centers Section */}
            <section className="mb-16">
                <SectionTitle
                    title="Our Food Centers"
                    subtitle="Our food centres are the heart and soul of our mission. Located in the vibrant neighbourhoods of Uttrahalli, Banshankri, and Kengeri, these centres do more than just gather surplus food from local vendors they spread hope and care throughout our community. Every day, our dedicated team works with the spirit of ‘seva’  to ensure that every morsel of extra food is shared with those who need it most. In our food centres, we don’t just collect food, we nurture bonds, uplift lives, and create a strong sense of unity and compassion among all"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {foodCenters.map((center, index) => (
                        <FoodCenterCard key={index} center={center} />
                    ))}
                </div>
            </section>

            {/* Additional Initiatives Section */}
            <section className="mb-16">
                <SectionTitle
                    title="Additional Initiatives"
                    subtitle="Our commitment goes far beyond just our food centres. We believe in uplifting our communities through school meal programs that nourish our children, working closely with local food banks, and swiftly mobilizing for emergency relief when the need arises. Every effort we make is a heartfelt promise"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {initiatives.map((initiative, index) => (
                        <InitiativeCard key={index} initiative={initiative} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FoodMap;
