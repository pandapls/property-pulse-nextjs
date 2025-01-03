'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId: string) {
	await connectDB();

	const session = await getSessionUser();

	console.log(session, 'userId');
	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;
	const user = await User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}
	user.id = userId;
	// 确保 bookmarks 是数组
	if (!Array.isArray(user.bookmarks)) {
		user.bookmarks = [];
	}

	let isBookmarked = (user.bookmarks as Array<string>).includes(propertyId);

	let message;
	if (isBookmarked) {
		user.bookmarks = user.bookmarks.filter(
			(id: string) => id.toString() !== propertyId
		);
		message = 'Property removed from bookmarks';
		isBookmarked = false;
	} else {
		user.bookmarks.push(propertyId);
		message = 'Bookmark Added';
		isBookmarked = true;
	}

	await user.save();
	revalidatePath('/properties/saved', 'page');

	return {
		message,
		isBookmarked,
	};
}

export default bookmarkProperty;
