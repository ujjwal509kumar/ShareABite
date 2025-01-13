"use client"
import Head from "next/head";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Login with Google</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <div className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <div className="flex justify-center mb-8">
            <Image
              src="/googleimg.png"
              alt="Google image"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <Button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            <FaGoogle className="w-6 h-6" />
            Continue with Google
          </Button>
        </div>
      </div>
    </>
  );
}
