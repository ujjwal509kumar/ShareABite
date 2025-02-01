"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

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

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/signin" });
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                                    href="dashboard/mytrackings"
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
                        <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to Your Dashboard</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Use the links on the left to manage your account, add food listings, or contact our team.
                                Thank you for helping us make a difference in the community!
                            </p>

                            {/* Highlighted Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                                        Add Food
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                                        Register food items to help others in need.
                                    </p>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                                        View Listings
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                                        Check your contributions and their status.
                                    </p>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center border border-gray-300 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                                        Track Progress
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                                        Track progress of the food how we are using it
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