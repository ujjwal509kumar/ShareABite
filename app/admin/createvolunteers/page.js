"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateVolunteer() {
    const router = useRouter();
    const [adminEmail, setAdminEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        gender: "",
        area: "",
        address: "",
        pincode: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/signin/admin");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/admin/addvolunteers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create volunteer");
            }

            router.push("/admin/volunteerslist");
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                <title>Create Volunteer - Admin Dashboard</title>
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
                                    className="block py-2 px-4 bg-indigo-100 dark:bg-gray-700 text-gray-800 dark:text-indigo-200 rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                                Create New Volunteer
                            </h1>

                            {error && (
                                <div className="mb-4 p-4 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2" htmlFor="fullname">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                        placeholder="Enter volunteer's full name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="mobile">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            name="mobile"
                                            required
                                            pattern="[0-9]{10}"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                            placeholder="9876543210"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="gender">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            required
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="pincode">
                                            Pincode
                                        </label>
                                        <input
                                            type="number"
                                            id="pincode"
                                            name="pincode"
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                            placeholder="Enter area pincode"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" htmlFor="area">
                                        Area/Locality
                                    </label>
                                    <input
                                        type="text"
                                        id="area"
                                        name="area"
                                        required
                                        value={formData.area}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                        placeholder="Enter locality/area name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" htmlFor="address">
                                        Full Address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                                        rows="4"
                                        placeholder="Enter complete address with landmarks"
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Creating Volunteer...' : 'Create Volunteer'}
                                </Button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}