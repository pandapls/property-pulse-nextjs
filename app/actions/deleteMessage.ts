'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
export default async function deleteMessage(messageId: string) {
	await connectDB();
	const session = await getSessionUser();
	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;

	const message = await Message.findById(messageId);

	if (message.recipient.toString !== userId) {
		throw new Error('Unauthorized');
	}

	await message.deleteOne();

	revalidatePath('/', 'layout');
}
