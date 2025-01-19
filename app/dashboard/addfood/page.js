"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import Image from 'next/image';

const AddFoodPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [session, status, router]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('expirationDate', expirationDate);
        formData.append('image', image);

        const res = await fetch('/api/add-food', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            alert('Error adding food listing');
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/signin');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-10">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
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
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
                            >
                                Add Food Listing
                            </Link>
                            <Link
                                href="/my-listings"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                My Listings
                            </Link>
                            <Link
                                href="/contact-team"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Contact Team
                            </Link>
                        </nav>
                        {/* Log Out Button */}
                        <Button
                            onClick={() => signOut({ callbackUrl: '/signin' })}
                            className="mt-6 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                        >
                            Log Out
                        </Button>
                    </aside>

                    {/* Main Content */}
                    <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add Food Listing</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 mb-2">
                                    Food Name
                                </label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 dark:text-gray-200 mb-2">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-200 mb-2">
                                    Quantity
                                </label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="expirationDate" className="block text-gray-700 dark:text-gray-200 mb-2">
                                    Expiration Date
                                </label>
                                <Input
                                    id="expirationDate"
                                    type="date"
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 dark:text-gray-200 mb-2">
                                    Image
                                </label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    accept="image/*"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                                Submit
                            </Button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AddFoodPage;