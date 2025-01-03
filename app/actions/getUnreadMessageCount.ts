'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
	await connectDB();

	const session = await getSessionUser();

	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;

	const count = await Message.countDocuments({
		recipient: userId,
		read: false,
	});

	return { count };
}

export default getUnreadMessageCount;
