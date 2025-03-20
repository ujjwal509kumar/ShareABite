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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
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
                            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to Admin Dashboard</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Use the links on the left to manage volunteers, add Volunteers, or assign Volunteers some task.
                            </p>

                            {/* Highlighted Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                                        Add Volunteers
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                                        Register Volunteers who are eger to help to society
                                    </p>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                                        Assign Volunteers
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                                        Assign Volunteers some tasks
                                    </p>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                                        Track donations
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                                        Track all the donations
                                    </p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}