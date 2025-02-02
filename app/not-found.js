import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
            <h1 className="text-7xl font-extrabold mb-4 text-red-500 animate-bounce">404</h1>
            <p className="text-2xl font-bold mb-2">Oops! Where did you wander off to? 🤨</p>
            <p className="text-lg text-muted-foreground mb-6">
                This page? Gone. Vanished. Probably chilling somewhere with other missing pages.  
                Or maybe it just ghosted you. 👻
            </p>
            <p className="text-md text-muted-foreground mb-6">
                Let’s be honest, it’s probably not your fault. Unless you tried hacking the site.  
                Then, *bhai, tu toh gaya!* But hey, mistakes happen. Even developers mess up (shocking, I know).
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow-md hover:bg-primary/80 transition-all transform hover:scale-105"
            >
                Go Home, Think About Life Choices 🚀
            </Link>
            <p className="text-xs text-muted-foreground mt-4">
                P.S. If this keeps happening, just restart your WiFi. Classic jugaad, always works. 🙃
            </p>
        </div>
    );
};

export default NotFound;
