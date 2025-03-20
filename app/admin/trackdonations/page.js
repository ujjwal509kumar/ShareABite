"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Link from "next/link";

export default function TrackDonations() {
    const router = useRouter();
    const [adminEmail, setAdminEmail] = useState("");
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/signin/admin");
                return;
            }

            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    throw new Error("Token expired");
                }

                setAdminEmail(decoded.email);
                fetchDonations();
            } catch (error) {
                console.error("Authentication error:", error);
                localStorage.removeItem("token");
                router.push("/signin/admin");
            }
        };

        const fetchDonations = async () => {
            try {
                const response = await fetch('/api/admin/fetchdonations');
                if (!response.ok) throw new Error('Failed to fetch donations');
                const data = await response.json();
                setDonations(data);
            } catch (err) {
                setError('Failed to load donations');
                console.error('Donations fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/signin/admin");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Track Donations - Admin Dashboard</title>
            </Head>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <aside className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4 border-2 border-indigo-500">
                                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                        {adminEmail[0]?.toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold">Admin</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {adminEmail}
                                </p>
                            </div>
                            <nav className="space-y-4">
                                <Link
                                    href="/admin/dashboard"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/createvolunteers"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Create Volunteers
                                </Link>
                                <Link
                                    href="/admin/volunteerslist"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Volunteers List
                                </Link>
                                <Link
                                    href="/admin/assignvolunteers"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Assign Volunteers
                                </Link>
                                <Link
                                    href="/admin/changefoodstatus"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Change Food Status
                                </Link>
                                <Link
                                    href="/admin/addfoodlisting"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Add Food Listing
                                </Link>
                                <Link
                                    href="/admin/addblogs"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    Add Blogs
                                </Link>
                                <Link href="/admin/deleteblogs" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Delete Blogs
                                </Link>
                                <Link
                                    href="/admin/trackdonations"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
                                >
                                    Track Donations
                                </Link>
                            </nav>

                            <Button
                                onClick={logout}
                                className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Log Out
                            </Button>
                        </aside>


                        {/* Main Content */}
                        <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                                <FaMoneyCheckAlt className="text-indigo-500" />
                                Donation Records
                            </h1>

                            {error ? (
                                <div className="text-red-500 p-4 text-center">{error}</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Name</th>
                                                <th className="px-4 py-3 text-left">Email</th>
                                                <th className="px-4 py-3 text-left">Amount</th>
                                                <th className="px-4 py-3 text-left">Payment ID</th>
                                                <th className="px-4 py-3 text-left">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {donations.map((donation) => (
                                                <tr
                                                    key={donation.id}
                                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    <td className="px-4 py-3">{donation.donorName}</td>
                                                    <td className="px-4 py-3">{donation.donorEmail}</td>
                                                    <td className="px-4 py-3">₹{donation.amount}</td>
                                                    <td className="px-4 py-3 font-mono text-sm">
                                                        {donation.paymentId}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {new Date(donation.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {donations.length === 0 && !isLoading && (
                                        <div className="text-center py-6 text-gray-500">
                                            No donations found
                                        </div>
                                    )}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}