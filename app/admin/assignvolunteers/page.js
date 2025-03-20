"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AssignVolunteers() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foodListings, setFoodListings] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
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
          const [listingsRes, volunteersRes] = await Promise.all([
            fetch("/api/admin/getfooddonation?status=REQUESTED"),
            fetch("/api/admin/getactivevolunteer?isActive=true")
          ]);

          if (!listingsRes.ok) throw new Error("Failed to load food listings");
          if (!volunteersRes.ok) throw new Error("Failed to load volunteers");

          const listingsData = await listingsRes.json();
          const volunteersData = await volunteersRes.json();

          setFoodListings(listingsData);
          setVolunteers(volunteersData);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [isLoading]);

  const assignVolunteer = async (listingId, volunteer) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/assignvolunteer/${listingId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          volunteerId: volunteer.id,
          adminEmail,
        }),
      });

      if (!res.ok) throw new Error("Assignment failed");

      setFoodListings(prev =>
        prev.map(l =>
          l.id === listingId
            ? { ...l, status: "ASSIGNED" }
            : l
        )
      );
      setSelectedListing(null);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        <title>Assign Volunteers</title>
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
                <Link href="/admin/assignvolunteers" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500">
                  Assign Volunteers
                </Link>
                <Link href="/admin/changefoodstatus"
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
                <Link href="/admin/trackdonations" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                  Track Donations
                </Link>
              </nav>
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/signin/admin");
                }}
                className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
              >
                Log Out
              </Button>
            </aside>

            {/* Main Content */}
            <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-6">Food Listing Requests</h1>
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
                        <span className={`text-sm ${listing.status === 'REQUESTED'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-green-600 dark:text-green-400'
                          }`}>
                          Status: {listing.status}
                        </span>
                      </div>
                      <Button
                        onClick={() => setSelectedListing(
                          selectedListing === listing.id ? null : listing.id
                        )}
                        disabled={listing.status !== "REQUESTED"}
                      >
                        {listing.status === "REQUESTED" ? "Assign Volunteer" : "Assigned"}
                      </Button>
                    </div>

                    {selectedListing === listing.id && (
                      <div className="mt-4 p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4">Available Volunteers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {volunteers.map(volunteer => (
                            <div
                              key={volunteer.id}
                              className="p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500"
                            >
                              <p className="font-medium">{volunteer.fullName}</p>
                              <p className="text-sm">{volunteer.email}</p>
                              <p className="text-sm">{volunteer.mobile}</p>
                              <Button
                                size="sm"
                                className="mt-2"
                                onClick={() => assignVolunteer(listing.id, volunteer)}
                                disabled={loading}
                              >
                                {loading ? "Assigning..." : "Assign"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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