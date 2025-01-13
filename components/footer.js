import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">ShareABite</h1>
            <p className="text-sm mt-2">
              Making a difference by sharing food. Join us in the fight against hunger.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/about" className="hover:text-primary dark:hover:text-primary-light">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary dark:hover:text-primary-light">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-primary dark:hover:text-primary-light">
              Privacy Policy
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <Link href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-primary">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.437 9.879v-6.987H7.898v-2.892h2.539V9.804c0-2.513 1.493-3.904 3.777-3.904 1.094 0 2.237.195 2.237.195v2.456h-1.26c-1.244 0-1.632.775-1.632 1.566v1.687h2.773l-.443 2.892h-2.33V21.88C18.344 21.128 22 16.99 22 12z" />
              </svg>
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer" className="hover:text-primary">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19.633 7.581c.013.18.013.36.013.54 0 5.507-4.193 11.865-11.865 11.865-2.362 0-4.556-.69-6.408-1.885.33.039.648.052.99.052a8.372 8.372 0 0 0 5.195-1.793 4.174 4.174 0 0 1-3.896-2.896c.253.04.506.065.768.065.369 0 .73-.05 1.072-.144a4.17 4.17 0 0 1-3.34-4.089v-.052a4.145 4.145 0 0 0 1.884.524 4.17 4.17 0 0 1-1.867-3.472c0-.769.207-1.49.57-2.109a11.819 11.819 0 0 0 8.564 4.347 4.695 4.695 0 0 1-.104-.957 4.17 4.17 0 0 1 4.17-4.171c1.203 0 2.288.506 3.05 1.317a8.313 8.313 0 0 0 2.646-1.01 4.17 4.17 0 0 1-1.832 2.296 8.31 8.31 0 0 0 2.402-.65 8.46 8.46 0 0 1-2.084 2.151z" />
              </svg>
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:text-primary">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm6.224 7.59a1.365 1.365 0 1 1-2.73 0 1.365 1.365 0 0 1 2.73 0zM12 6.543c-2.905 0-5.256 2.351-5.256 5.256 0 2.906 2.351 5.257 5.256 5.257 2.906 0 5.257-2.351 5.257-5.257 0-2.905-2.351-5.256-5.257-5.256zm0 8.716c-1.91 0-3.46-1.55-3.46-3.46s1.55-3.46 3.46-3.46 3.46 1.55 3.46 3.46-1.55 3.46-3.46 3.46z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ShareABite. All rights reserved.
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <span className="text-gray-500">
              Crafted with &#10084; and <code>&lt;/Code&gt;</code>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
