"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyTrackings() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [foodListings, setFoodListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchFoodListings();
        }
    }, [session]);

    const fetchFoodListings = async () => {
        try {
            const res = await fetch(`/api/trackfood?userId=${session.user.id}`);
            if (res.ok) {
                const data = await res.json();
                setFoodListings(data);
            } else {
                throw new Error("Failed to fetch food listings");
            }
        } catch (error) {
            console.error("Error fetching food listings:", error);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    if (!session) {
        router.push("/signin");
        return null;
    }

    return (
        <>
            <Head>
                <title>My Trackings</title>
            </Head>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    My Listings
                                </Link>
                                <Link
                                    href="/dashboard/mytrackings"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                        <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Track Your Food Listings</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Here you can see the current status of your food listings and track their progress.
                            </p>

                            {/* Food Listings Table */}
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-600">
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                    Food Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                    Quantity
                                                </th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                    Expiration Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                            {foodListings.map((listing) => (
                                                <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">
                                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                                                        {listing.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                                                        {listing.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                                                        {new Date(listing.expirationDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                                                listing.status === "REQUESTED"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : listing.status === "ASSIGNED"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : listing.status === "DISTRIBUTED"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {listing.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}