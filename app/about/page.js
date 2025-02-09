'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const AboutUs = () => {
    return (
        <div className="mt-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <main className="max-w-4xl mx-auto py-12 px-4">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Leveraging technology to combat hunger, <br />
                        transforming surplus food into nourishing meals, <br />
                        and building a more sustainable future.
                    </p>
                </header>

                {/* Founder Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-center mb-8">Meet the Founder</h2>
                    <div className="flex justify-center">
                        <Card className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-lg">
                            <CardHeader className="flex flex-col items-center p-6">
                                <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                                        alt="UJJWAL KUMAR"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold">UJJWAL KUMAR</h3>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">
                                    Founder &amp; Software Developer
                                </p>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 text-center">
                                <p className="text-base text-gray-700 dark:text-gray-300">
                                    I am a passionate software developer dedicated to using technology for social good.
                                    With this platform, I aim to collect surplus food and deliver it to those in need,
                                    ensuring that no edible meal goes to waste.
                                </p>
                            </CardContent>
                            <CardFooter className="px-6 pb-6 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                    &quot;Empowering communities, one meal at a time.&quot;
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-semibold mb-8">Our Mission</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                        This website is built with a simple yet powerful purpose—to bridge the gap between food surplus
                        and food scarcity. By collecting extra food and distributing it to those who need it most, I strive
                        to reduce waste and help alleviate hunger. Every donation, no matter how small, plays a crucial role
                        in building a more compassionate community.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;
