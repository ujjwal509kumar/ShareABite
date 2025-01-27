"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Loader2, Printer } from 'lucide-react';

const ThankYouPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchLatestDonation();
        }
    }, [status]);

    const fetchLatestDonation = async () => {
        try {
            const response = await fetch('/api/latestdonation');
            if (!response.ok) throw new Error('No donation found');
            const data = await response.json();
            setDonation(data);
        } catch (error) {
            router.push('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const formatIndianDateTime = (timestamp) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Date(timestamp).toLocaleString('en-IN', options);
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!session || !donation) {
        router.push("/dashboard");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Card className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800">
                    <div className="text-center">
                        <div className="relative h-48 w-full mb-6">
                            <Image
                                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3ZxbGhjZ3hpcnhrbmhrbjN0eHF5MmNnZmNjandvbGJ5ZW83b29rayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qa98eSMXpmBH4qgMMB/giphy.gif"
                                alt="Thank You"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>

                        <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                            Thank You, {session.user?.name}!
                        </h1>

                        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                            Your donation of ₹{donation.amount} was successfully processed.
                        </p>

                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Transaction ID: {donation.paymentId}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Date: {formatIndianDateTime(donation.createdAt)}
                            </p>
                        </div>

                        <div className="mb-8 text-left space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                🌱 Your support helps us rescue surplus food and distribute it to 
                                communities in need.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                🤝 Together, we&apos;re reducing food waste and fighting hunger.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => window.print()} className="gap-2">
                                <Printer className="h-4 w-4" />
                                Print Receipt
                            </Button>
                            <Link href="/dashboard">
                                <Button variant="outline">
                                    Return to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ThankYouPage;