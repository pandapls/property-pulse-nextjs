'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId: string) {
	await connectDB();

	const session = await getSessionUser();

	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;

	const message = await Message.findById(messageId);
	if (!message) {
		throw new Error('Message not found');
	}

	if (message.recipient.toString() !== userId) {
		throw new Error('Uauthorized');
	}

	console.log(message.read, 'message.read ');
	message.read = !message.read;
	revalidatePath('/message', 'page');
	await message.save();
	return message.read;
}

export default markMessageAsRead;
