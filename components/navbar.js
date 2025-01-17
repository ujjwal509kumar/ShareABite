'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from './dark-mode';

const Navbar = () => {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Blogs', href: '/blog' },
        { label: 'FoodMap', href: '/foodmap' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="bg-background border-b border-border fixed w-full top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-foreground">
                            ShareABite
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {session ? (
                                <Button
                                    variant="default"
                                    className="px-4"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <Button variant="default" asChild>
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                            )}
                            <ModeToggle />
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <ModeToggle />
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-4 mt-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    {session ? (
                                        <Button
                                            variant="default"
                                            className="w-full"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </Button>
                                    ) : (
                                        <Button variant="default" className="w-full" asChild>
                                            <Link href="/signin">Sign In</Link>
                                        </Button>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;