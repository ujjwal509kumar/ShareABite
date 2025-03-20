"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaBook } from "react-icons/fa";
import Link from "next/link";

export default function CreateBlog() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        para1: "",
        para2: "",
        para3: "",
        para4: "",
        gener: "",
        description: "",
        slug: "",
        link: "",
        quote: "",
        date: new Date().toISOString().split('T')[0]
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
                if (decoded.exp < currentTime) throw new Error("Token expired");
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/admin/createblog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Blog created successfully!");
            router.push("/admin/dashboard");
        } catch (error) {
            alert(error.message.includes("slug") ?
                "Slug already exists! Please use a unique slug." :
                "Error creating blog: " + error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/signin/admin");
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
    );

    return (
        <>
            <Head>
                <title>Create Blog</title>
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
                                    className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Create New Blog</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" required />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Slug</label>
                                        <input type="text" name="slug" value={formData.slug} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" required />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Date</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" required />
                                    </div>

                                    {[1, 2, 3, 4].map(num => (
                                        <div key={num} className="col-span-2">
                                            <label className="block text-sm font-medium mb-2">Paragraph {num}</label>
                                            <textarea name={`para${num}`} value={formData[`para${num}`]} onChange={handleChange}
                                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 h-32" />
                                        </div>
                                    ))}

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Genre</label>
                                        <input type="text" name="gener" value={formData.gener} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 h-32" />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">External Link</label>
                                        <input type="url" name="link" value={formData.link} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Quote</label>
                                        <textarea name="quote" value={formData.quote} onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 h-32" />
                                    </div>
                                </div>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md">
                                    Create Blog
                                </Button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}