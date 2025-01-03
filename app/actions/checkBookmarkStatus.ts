'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId: string) {
	await connectDB();

	const session = await getSessionUser();

	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;
	const user = await User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}

	const isBookmarked = (user.bookmarks as Array<string>).includes(propertyId);

	return {
		isBookmarked,
	};
}

export default checkBookmarkStatus;
