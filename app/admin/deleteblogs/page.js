"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeleteBlogs() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [adminEmail, setAdminEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

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

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/getallblogs");
                const data = await response.json();
                
                if (response.ok) {
                    const receivedBlogs = Array.isArray(data) ? data : [];
                    setBlogs(receivedBlogs);
                } else {
                    throw new Error(data.error || "Failed to fetch blogs");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                alert("Error fetching blogs: " + error.message);
                setBlogs([]);
            }
        };
        if (!isLoading) fetchBlogs();
    }, [isLoading]);

    const handleDelete = async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/admin/deleteblog/${blogId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setBlogs(prev => prev.filter(blog => blog.id !== blogId));
            alert("Blog deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting blog: " + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/signin/admin");
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
    );

    return (
        <>
            <Head>
                <title>Delete Blogs</title>
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
                                <Link href="/admin/dashboard" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Dashboard
                                </Link>
                                <Link href="/admin/createvolunteers" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Create Volunteers
                                </Link>
                                <Link href="/admin/volunteerslist" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Volunteers List
                                </Link>
                                <Link href="/admin/assignvolunteers" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Assign Volunteers
                                </Link>
                                <Link href="/admin/changefoodstatus" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Change Food Status
                                </Link>
                                <Link href="/admin/addfoodlisting" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Add Food Listing
                                </Link>
                                <Link href="/admin/addblogs" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Add Blogs
                                </Link>
                                <Link href="/admin/deleteblogs" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500">
                                    Delete Blogs
                                </Link>
                                <Link href="/admin/trackdonations" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                    Track Donations
                                </Link>
                            </nav>

                            <Button onClick={logout} className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                                Log Out
                            </Button>
                        </aside>

                        {/* Main Content */}
                        <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
                            
                            {blogs.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                                        No blogs found
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {blogs.map((blog) => (
                                        <div key={blog.id} className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                    Slug: {blog.slug}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Date: {new Date(blog.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Button 
                                                onClick={() => handleDelete(blog.id)}
                                                className="bg-red-600 hover:bg-red-700 min-w-[100px]"
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}