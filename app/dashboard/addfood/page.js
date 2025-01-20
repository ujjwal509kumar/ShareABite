"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, ImagePlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

const AddFoodPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('expirationDate', expirationDate);
            formData.append('image', image);

            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            const res = await fetch('/api/add-food', {
                method: 'POST',
                body: formData,
            });

            clearInterval(interval);
            setUploadProgress(100);

            if (res.ok) {
                toast.success('Listing added successfully!', {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    style: {
                        background: '#f0fdf4',
                        color: '#166534',
                    },
                    duration: 2000,
                });
                setTimeout(() => router.push('/dashboard'), 2000);
            } else {
                throw new Error('Failed to add listing');
            }
        } catch (error) {
            toast.error(error.message || 'Error adding food listing', {
                style: {
                    background: '#fef2f2',
                    color: '#b91c1c',
                },
            });
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

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
                                href="/trackfood"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Track Progress
                            </Link>
                            <Link
                                href="/donate"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Donate Us
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

                    {/* Main Form */}
                    <main className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                            Add Food Listing
                            <span className="block text-sm font-normal mt-1 text-gray-500 dark:text-gray-400">
                                Help reduce food waste by sharing surplus meals
                            </span>
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Image Upload */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Food Photos
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-indigo-400 transition-colors">
                                    <label className="flex flex-col items-center justify-center p-8 cursor-pointer relative h-48 overflow-hidden">
                                        {previewImage ? (
                                            <Image
                                                src={previewImage}
                                                alt="Food preview"
                                                fill
                                                className="object-cover rounded-lg"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="text-center space-y-3">
                                                <ImagePlus className="h-8 w-8 text-gray-400 mx-auto" />
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Drag and drop or{" "}
                                                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                                            browse files
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Recommended size: 1200x800 pixels (5MB max)
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <Input
                                            type="file"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            accept="image/*"
                                            disabled={isSubmitting}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Food Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Food Item Name
                                    </label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Fresh Garden Salad"
                                        className="dark:bg-gray-700 focus:ring-2 focus:ring-indigo-400"
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Available Quantity
                                    </label>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="Number of servings"
                                        min="1"
                                        className="dark:bg-gray-700"
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                {/* Expiration Date */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Expiration Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="dark:bg-gray-700"
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                {/* Category (Optional) */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Food Category (optional)
                                    </label>
                                    <select
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select category</option>
                                        <option>Vegetarian</option>
                                        <option>Vegan</option>
                                        <option>Dairy</option>
                                        <option>Bakery</option>
                                        <option>Prepared Meals</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Detailed Description
                                </label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Include ingredients, dietary information, packaging details..."
                                    className="dark:bg-gray-700 h-32"
                                    maxLength={500}
                                    disabled={isSubmitting}
                                    required
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
                                    {description.length}/500 characters
                                </p>
                            </div>

                            {/* Progress Bar */}
                            {isSubmitting && (
                                <div className="space-y-4">
                                    <Progress value={uploadProgress} className="h-2 bg-gray-100 dark:bg-gray-700" />
                                    <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                                        Uploading your listing... {uploadProgress}% complete
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Publish Food Listing'
                                )}
                            </Button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AddFoodPage;