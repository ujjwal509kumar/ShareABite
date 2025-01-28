"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaUsers, FaBox, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();
    const [adminEmail, setAdminEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            } catch (error) {
                console.error("Authentication error:", error);
                localStorage.removeItem("token");
                router.push("/signin/admin");
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
                <title>Admin Dashboard</title>
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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
                                >
                                    <FaChartLine className="inline-block mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    <FaUsers className="inline-block mr-2" />
                                    Manage Users
                                </Link>
                                <Link
                                    href="/admin/listings"
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                                >
                                    <FaBox className="inline-block mr-2" />
                                    Food Listings
                                </Link>
                            </nav>

                            <Button
                                onClick={logout}
                                className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                <FaSignOutAlt className="inline-block mr-2" />
                                Log Out
                            </Button>
                        </aside>

                        {/* Main Content */}
                        <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <header className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
                            </header>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <div className="flex items-center gap-4">
                                        <FaUsers className="w-8 h-8 text-blue-500" />
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-300">Total Users</p>
                                            <p className="text-2xl font-bold">1,234</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <div className="flex items-center gap-4">
                                        <FaBox className="w-8 h-8 text-green-500" />
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-300">Total Listings</p>
                                            <p className="text-2xl font-bold">567</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <div className="flex items-center gap-4">
                                        <FaChartLine className="w-8 h-8 text-purple-500" />
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-300">Monthly Donations</p>
                                            <p className="text-2xl font-bold">$12,345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recent Activity</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
                                        <span className="text-gray-600 dark:text-gray-300">New user registration</span>
                                        <span className="text-gray-500 dark:text-gray-400">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
                                        <span className="text-gray-600 dark:text-gray-300">Food listing update</span>
                                        <span className="text-gray-500 dark:text-gray-400">4 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}