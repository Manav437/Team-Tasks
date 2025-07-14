import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                <div className="text-5xl mb-2 select-none" aria-label="shrug emoji">
                    ¯\_(ツ)_/¯
                </div>
                <h1 className="text-5xl font-extrabold text-blue-700 mb-2">404</h1>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
                <p className="text-slate-600 mb-8 text-center">
                    Oops! This page took a wrong turn at <a className='text-indigo-500 underline' target='_blank' href="https://en.wikipedia.org/wiki/Breaking_Bad">Albuquerque.</a> <br />
                    (Or maybe it just doesn&apos;t exist.)<br />
                    Either way, let&apos;s get you back on track!
                </p>
                <Link
                    href="/"
                    className="bg-gradient-to-r from-blue-500 via-indigo-500 to-green-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-600 hover:via-indigo-600 hover:to-green-500 transition"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
}
