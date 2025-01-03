'use client';

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ error }: { error: Error }) => {
    return (
        <section className='bg-blue-50 min-h-screen flex-grow'>
            <div className='container m-auto max-w-2xl py-24'>
                <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <div className="flex justify-center">
                        <FaExclamationTriangle className='text-yellow-500 text-8xl fa-5x' />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mt-4 mb-2">
                            Something went wrong
                        </h1>
                        <p className="text-gray-500 text-xl mb-10">
                            {error.message}
                        </p>
                        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage
