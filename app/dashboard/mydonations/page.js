"use client";

import { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MyDonationsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDonations();
    }
  }, [status]);

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/getmydonations', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch donations');
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
      </div>
    );
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={70}
                  height={70}
                  className="rounded-full mx-auto mb-4 border-2 border-indigo-500 dark:border-indigo-400"
                />
              )}
              <h2 className="text-xl font-bold dark:text-gray-100">{session.user?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session.user?.email}
              </p>
            </div>

            <nav className="space-y-4">
              <Link href="/dashboard" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                Dashboard
              </Link>
              <Link href="/dashboard/addfood" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                Add Food Listing
              </Link>
              <Link href="/dashboard/mylisting" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                My Listings
              </Link>
              <Link href="/dashboard/mytrackings" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                Track Progress
              </Link>
              <Link href="/dashboard/donate" className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center">
                Donate Us
              </Link>
              <Link href="/dashboard/mydonations" className="block py-2 px-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg transition-all text-center border-2 border-indigo-500 dark:border-indigo-400">
                My Donations
              </Link>
            </nav>

            <Button
              onClick={() => signOut({ callbackUrl: '/signin' })}
              className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Log Out
            </Button>
          </aside>

          {/* Main Content */}
          <div className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Donation History</h1>

              <Card className="p-6 bg-transparent dark:bg-gray-900/20 border dark:border-gray-700">
                {donations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                      No donations found. Your generosity could make a difference!
                    </p>
                  </div>
                ) : (
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">No.</TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">Amount</TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">Payment ID</TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">Date</TableHead>
                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donations
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((donation, index) => (
                          <TableRow
                            key={donation.id}
                            className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                          >
                            <TableCell className="font-medium dark:text-gray-100">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium dark:text-gray-100">
                              ₹{new Intl.NumberFormat('en-IN').format(donation.amount)}
                            </TableCell>
                            <TableCell className="text-muted-foreground dark:text-gray-400 font-mono text-sm">
                              {donation.paymentId}
                            </TableCell>
                            <TableCell className="dark:text-gray-300">
                              {format(new Date(donation.createdAt), 'dd MMM yyyy, hh:mm a')}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${donation.status === 'captured'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                {donation.status === 'captured' ? 'Success' : 'Pending'}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationsPage;