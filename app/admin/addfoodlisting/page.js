"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaBox } from "react-icons/fa";
import Link from "next/link";

export default function AddFoodListing() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        volunteerName: "",
        volunteerMobile: "",
        donationCenter: "",
        donationLocation: "",
        donationType: "",
        activeFrom: "",
        activeUntil: "",
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/admin/addfoodlisting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Food listing added successfully!");
                router.push("/admin/dashboard");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form.");
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
                <title>Add Food Listing</title>
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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add Food Listing</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Volunteer Name</label>
                                        <input
                                            type="text"
                                            name="volunteerName"
                                            value={formData.volunteerName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Volunteer Mobile</label>
                                        <input
                                            type="text"
                                            name="volunteerMobile"
                                            value={formData.volunteerMobile}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Donation Center</label>
                                        <input
                                            type="text"
                                            name="donationCenter"
                                            value={formData.donationCenter}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Donation Location</label>
                                        <input
                                            type="text"
                                            name="donationLocation"
                                            value={formData.donationLocation}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Donation Type</label>
                                        <input
                                            type="text"
                                            name="donationType"
                                            value={formData.donationType}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Active From</label>
                                        <input
                                            type="datetime-local"
                                            name="activeFrom"
                                            value={formData.activeFrom}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Active Until</label>
                                        <input
                                            type="datetime-local"
                                            name="activeUntil"
                                            value={formData.activeUntil}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <Button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add Food Listing
                                    </Button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}