"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpdateFoodStatus() {
    const router = useRouter();
    const [adminEmail, setAdminEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [foodListings, setFoodListings] = useState([]);
    const [loading, setLoading] = useState(false);
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
                setIsLoading(false);
            } catch (error) {
                console.error("Authentication error:", error);
                localStorage.removeItem("token");
                router.push("/signin/admin");
            }
        };

        checkAuth();
    }, [router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading) {
                try {
                    const res = await fetch("/api/admin/getfooddonation?status=ASSIGNED");
                    if (!res.ok) throw new Error("Failed to load food listings");
                    const listingsData = await res.json();
                    setFoodListings(listingsData);
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchData();
    }, [isLoading]);

    const markAsDelivered = async (listingId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/changefoodstatus/${listingId}/deliver`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ adminEmail }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to update status");
            }

            setFoodListings(prev =>
                prev.filter(listing => listing.id !== listingId)
            );
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                <title>Update Food Status</title>
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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                            <h1 className="text-3xl font-bold mb-6">Assigned Food Listings</h1>
                            {error && <p className="text-red-500 mb-4">{error}</p>}

                            <div className="space-y-4">
                                {foodListings.map(listing => (
                                    <div
                                        key={listing.id}
                                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-xl font-semibold">{listing.name}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {listing.quantity} units · Expires: {new Date(listing.expirationDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                                    Assigned to: {listing.volunteerEmail}
                                                </p>
                                                <span className="text-sm text-yellow-600 dark:text-yellow-400">
                                                    Status: {listing.status}
                                                </span>
                                            </div>
                                            <Button
                                                onClick={() => markAsDelivered(listing.id)}
                                                disabled={loading}
                                            >
                                                {loading ? "Updating..." : "Mark as Delivered"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}