"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle, ImagePlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFoodPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Form states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        landmark: ''
    });

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

            // Address data
            formData.append('street', address.street);
            formData.append('city', address.city);
            formData.append('state', address.state);
            formData.append('postalCode', address.postalCode);
            formData.append('landmark', address.landmark);

            const res = await fetch('/api/addfood', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                toast.success(
                    <div className="flex items-center gap-2">
                        Listing added successfully!
                    </div>,
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                );
                setTimeout(() => router.push('/dashboard/mylisting'), 2000);
            } else {
                throw new Error('Failed to add listing');
            }
        } catch (error) {
            toast.error(error.message || 'Error adding food listing', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
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
                            <h2 className="text-xl font-bold dark:text-gray-200">{session.user?.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {session.user?.email}
                            </p>
                        </div>
                        <nav className="space-y-4">
                            <Link
                                href="/dashboard"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/addfood"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center border-2 border-indigo-500"
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
                                href="/dashboard/mytrackings"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
                            >
                                Track Progress
                            </Link>
                            <Link
                                href="/dashboard/donate"
                                className="block py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
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
                                    Food Photo
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
                                                <ImagePlus className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto" />
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Drag and drop or{" "}
                                                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                                            browse picture
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

                            {/* Address Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Street Address
                                    </label>
                                    <Input
                                        placeholder="Street Address"
                                        value={address.street}
                                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        City
                                    </label>
                                    <Input
                                        placeholder="City"
                                        value={address.city}
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        State
                                    </label>
                                    <Input
                                        placeholder="State/Province"
                                        value={address.state}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Pin code
                                    </label>
                                    <Input
                                        placeholder="Postal Code"
                                        value={address.postalCode}
                                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Landmark
                                    </label>
                                    <Input
                                        placeholder="Landmark (e.g., near Central Park)"
                                        value={address.landmark}
                                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Food Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Food Item Name
                                    </label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Rice, Sambar, Curd, Milk etc"
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
                                </div>
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
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Expected Expiry Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="dark:bg-gray-700 dark:text-gray-100"
                                        required
                                    />
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
                                    placeholder="Description about food"
                                    className="h-32 dark:bg-gray-700 dark:text-gray-100"
                                    maxLength={500}
                                    required
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
                                    {description.length}/500 characters
                                </p>
                            </div>

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
                    <ToastContainer />
                </div>
            </div>
        </div>

    );
};

export default AddFoodPage;