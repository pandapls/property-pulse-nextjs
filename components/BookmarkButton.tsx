'use client';
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { PropertyType } from "@/models/Property"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa"
import { toast } from "react-toastify";

const BookmarkButton = ({ property }: { property: PropertyType }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLodaing] = useState(true);
    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) {
            setLodaing(false);
            return;
        }
        const setBookmarkStatus = async () => {
            const res = await checkBookmarkStatus(property._id.toString());
            setIsBookmarked(res.isBookmarked);
            setLodaing(false);
        }
        setBookmarkStatus();

    }, [property._id, userId]);
    const handleClick = async () => {
        if (!userId) {
            toast.error('Please login to bookmark property');
            return
        }
        try {
            const res = await bookmarkProperty(property._id.toString());
            setIsBookmarked(res.isBookmarked);
            toast.success(res.message);
        } catch (error) {
            toast.error(error as string);
        }
    }
    if (loading) {
        return <p className="text-center">Loading...</p>
    }
    return (
        isBookmarked ?
            (
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                    onClick={handleClick}
                >
                    <FaBookmark className="mr-2" /> Remove Bookmark Property
                </button>
            ) : <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                onClick={handleClick}
            >
                <FaBookmark className="mr-2" /> Bookmark Property
            </button>
    )
}

export default BookmarkButton
