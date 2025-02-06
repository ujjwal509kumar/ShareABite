'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            try {
                const response = await fetch(
                    `${window.location.origin}/api/getsingleblog/${slug}`,
                    { cache: 'no-store' }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch blog');
                }

                const data = await response.json();
                setBlog(data);
                setError(null);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
                <div className="text-center max-w-lg">
                    <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
                        Error 404
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        &quot;The blog post you&apos;re looking for couldn&apos;t be found. It might have been removed or doesn&apos;t exist.&quot;
                    </p>
                    <a href="/blog">
                        <button className="px-6 py-3 text-white bg-blue-600 dark:bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-200">
                            Back to Blog Page
                        </button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <main className=" mt-6 w-full bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">

                    {/* "Back to Blogs" button at the end */}
                    <div className="max-w-4xl mx-auto px-4 mt-6">
                        <div className="mb-4">
                            <p className="text-base md:text-sm text-green-500 dark:text-green-400 font-bold">
                                &lt;{' '}
                                <a
                                    href="/blog"
                                    className="text-base md:text-sm text-green-500 dark:text-green-400 font-bold no-underline hover:underline"
                                >
                                    BACK TO BLOGS
                                </a>
                            </p>
                        </div>
                    </div>
                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <header className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {blog.title}
                            </h1>
                            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                                <span>Published on {new Date(blog.date).toLocaleDateString()}</span>
                                {blog.gener && (
                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {blog.gener}
                                    </span>
                                )}
                            </div>
                        </header>

                        <div className="p-6">
                            {blog.para1 && (
                                <div
                                    className="prose max-w-none mb-6 dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: blog.para1 }}
                                />
                            )}
                            {blog.para2 && (
                                <div
                                    className="prose max-w-none mb-6 dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: blog.para2 }}
                                />
                            )}
                            {blog.para3 && (
                                <div
                                    className="prose max-w-none mb-6 dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: blog.para3 }}
                                />
                            )}
                            {blog.para4 && (
                                <div
                                    className="prose max-w-none mb-6 dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: blog.para4 }}
                                />
                            )}
                            {blog.quote && (
                                <blockquote className="border-l-4 border-blue-600 dark:border-blue-400 bg-gray-50 dark:bg-gray-700 px-4 py-2 my-6 italic">
                                    <div dangerouslySetInnerHTML={{ __html: blog.quote }} />
                                </blockquote>
                            )}
                        </div>
                    </article>
                </div>
            </main>


        </>
    );
};

export default BlogPost;
