"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

const MyListingsPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchListings();
        }
    }, [status]);

    const fetchListings = async () => {
        try {
            const response = await fetch('/api/getmylisting', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to fetch listings');
            const data = await response.json();
            // Sort listings by creation date (newest first)
            const sortedData = data.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setListings(sortedData);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!session) {
        router.push("/signin");
        return null;
    }

    // Function to format date in Indian format with time
    const formatIndianDateTime = (dateString) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('en-IN', options);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <aside className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="text-center mb-6">
                            {session.user?.image && (
                                <Image
                                    src={session.user.image}
                                    alt="Profile"
                                    width={70}
                                    height={70}
                                    className="rounded-full mx-auto mb-4 border-2 border-indigo-500"
                                />
                            )}
                            <h2 className="text-xl font-bold dark:text-gray-200">{session.user?.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {session.user?.email}
                            </p>
                        </div>
                        <nav className="space-y-4">
                            <Link
                                href="/dashboard"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/addfood"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Add Food Listing
                            </Link>
                            <Link
                                href="/dashboard/mylisting"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
                            >
                                My Listings
                            </Link>
                            <Link
                                href="/dashboard/mytrackings"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Track Progress
                            </Link>
                            <Link
                                href="/dashboard/donate"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Donate Us
                            </Link>
                            <Link
                                href="/dashboard/mydonations"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                My Donations
                            </Link>
                        </nav>
                        <Button
                            onClick={() => signOut({ callbackUrl: '/signin' })}
                            className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                        >
                            Log Out
                        </Button>
                    </aside>

                    {/* Main Content */}
                    <div className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">My Food Listings</h1>

                        <Card className="p-6">
                            {listings.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No listings found. Add your first food listing today!
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {listings.map((listing, index) => (
                                        <div key={listing.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                                            <div className="relative h-48 w-full mb-4">
                                                <Image
                                                    src={`/api/getfoodimage/${listing.id}`}
                                                    alt={listing.name}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                                {index + 1}. {listing.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                                Quantity: {listing.quantity} servings
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                                Expires: {new Date(listing.expirationDate).toLocaleDateString('en-IN', {
                                                    timeZone: 'Asia/Kolkata'
                                                })}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                {listing.description}
                                            </p>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Listed on: {formatIndianDateTime(listing.createdAt)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyListingsPage;