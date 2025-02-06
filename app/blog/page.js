'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/getallblogs')
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            });
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-10">
            <div className="container mx-auto px-6 py-12">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    Explore Our Latest Blogs
                </h1>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700 h-[420px] w-full" />
                        ))
                    ) : (
                        blogs.map((blog) => (
                            <Card
                                key={blog.slug}
                                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-800"
                            >
                                <Link href={`/blogpost/${blog.slug}`} className="flex h-full flex-col">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                                        <Image
                                            src={blog.link || '/placeholder.jpg'}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        {blog.gener && (
                                            <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-md">
                                                {blog.gener}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col p-5 text-justify">
                                        <time className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {new Date(blog.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </time>
                                        <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            {blog.title}
                                        </h3>

                                        {blog.description && (
                                            <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                                                {blog.description}
                                            </p>
                                        )}

                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Read More
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Button>
                                    </div>
                                </Link>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
