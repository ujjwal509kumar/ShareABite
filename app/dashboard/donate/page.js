"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeartHandshake, Gift, Coins, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

const DonationPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const presetAmounts = [100, 500, 1000, 2500, 5000];

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/signin');
    }, [status, router]);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount < 1) return toast.error('Please enter a valid amount');
    
        setIsSubmitting(true);
    
        try {
            const orderResponse = await fetch('/api/createorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: Number(amount) })
            });
    
            if (!orderResponse.ok) throw new Error('Failed to create payment order');
            const orderData = await orderResponse.json();
    
            // Load Razorpay
            if (!(await loadRazorpay())) throw new Error('Razorpay SDK failed to load');
    
            // Initialize payment
            const rzp = new window.Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "ShareABite",
                description: "Community Donation",
                order_id: orderData.id,
                handler: async (response) => {
                    const verificationResponse = await fetch('/api/verifypayment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                    });
    
                    const result = await verificationResponse.json();
                    if (result.success) {
                        toast.success('Donation successful! Thank you!');
                        router.push('/dashboard/thankyou');
                    } else {
                        toast.error(result.error || 'Payment verification failed');
                    }
                },
                prefill: {
                    name: session.user?.name || '',
                    email: session.user?.email || ''
                },
                theme: { color: '#6366f1' },
                modal: {
                    ondismiss: () => {
                        toast.error('Payment cancelled');
                        setIsSubmitting(false);
                    }
                }
            });
    
            rzp.open();
    
        } catch (error) {
            toast.error(error.message || 'Payment processing failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                            <h2 className="text-xl font-bold">{session.user?.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {session.user?.email}
                            </p>
                        </div>
                        <nav className="space-y-4">
                            {/* Dashboard Button */}
                            <Link
                                href="/dashboard"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Dashboard
                            </Link>
                            {/* Add Food Listing Button with Active Border */}
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
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                        {/* Log Out Button */}
                        <Button
                            onClick={() => signOut({ callbackUrl: '/signin' })}
                            className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                        >
                            Log Out
                        </Button>
                    </aside>

                    {/* Main Content */}
                    <div className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8">
                                <HeartHandshake className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                    Support Our Mission
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Your contribution helps fight food waste and feed communities
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {presetAmounts.map((amt) => (
                                        <Button
                                            key={amt}
                                            type="button"
                                            variant={amount === amt.toString() ? 'default' : 'outline'}
                                            className="h-14 text-lg font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            onClick={() => setAmount(amt.toString())}
                                        >
                                            ₹{amt.toLocaleString()}
                                        </Button>
                                    ))}
                                </div>

                                <div className="relative group">
                                    <Coins className="h-6 w-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter custom amount"
                                        className="pl-12 h-14 text-lg bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500"
                                        min="1"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 text-lg bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                    disabled={isSubmitting}
                                >
                                    <Gift className="mr-2 h-5 w-5" />
                                    {isSubmitting ? 'Processing...' : 'Donate Now'}
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
                                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                                    Payments protected by Razorpay
                                </div>
                            </form>

                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                {[
                                    { value: '25k+', label: 'Meals Provided' },
                                    { value: '150+', label: 'Communities Reached' },
                                    { value: '95%', label: 'Direct Impact' },
                                ].map((stat, index) => (
                                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-indigo-500 mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;