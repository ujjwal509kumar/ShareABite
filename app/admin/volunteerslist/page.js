"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VolunteersList() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState("");

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/signin/admin");
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
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

  // Fetch volunteers
  useEffect(() => {
    if (!isLoading) {
      const fetchVolunteers = async () => {
        try {
          const response = await fetch("/api/admin/getvolunteers");
          if (!response.ok) {
            throw new Error("Failed to fetch volunteers");
          }
          const data = await response.json();
          setVolunteers(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchVolunteers();
    }
  }, [isLoading]);

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
        <title>Volunteers List - Admin Dashboard</title>
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
                  className="block py-2 px-4 bg-indigo-100 dark:bg-gray-700 text-gray-800 dark:text-indigo-200 rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                Volunteers List
              </h1>

              {error && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Mobile</th>
                      <th className="p-3">Area</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer) => (
                      <tr
                        key={volunteer.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3">{volunteer.fullName}</td>
                        <td className="p-3">{volunteer.email}</td>
                        <td className="p-3">{volunteer.mobile}</td>
                        <td className="p-3">{volunteer.area}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${volunteer.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                              }`}
                          >
                            {volunteer.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}