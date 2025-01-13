"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    if (!session) {
        router.push('/signin');
        return null;
    }

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/signin" });
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
                <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
                    <h1 className="text-3xl font-bold text-center mb-6">Welcome to your Dashboard</h1>
                    <div className="mb-4">
                        <p className="text-xl">User Information:</p>
                        <ul className="list-disc ml-5">
                            <li><strong>Name:</strong> {session.user?.name}</li>
                            <li><strong>Email:</strong> {session.user?.email}</li>
                            <li><strong>Image:</strong> {session.user?.image ? (
                                <Image
                                    src={session.user?.image}
                                    alt="Profile"
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                            ) : "No image available"}</li>
                        </ul>
                    </div>
                    <Button
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all dark:bg-red-500 dark:hover:bg-red-400"
                    >
                        Log Out
                    </Button>
                </div>
            </div>
        </>
    );
}
