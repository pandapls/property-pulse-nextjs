'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
// 定义表单状态类型
export interface AddMessageFormState {
	submitted: boolean;
	message?: string;
	error?: string;
}

const addMessage = async (
	prevState: AddMessageFormState,
	formData: FormData
): Promise<AddMessageFormState> => {
	await connectDB();
	const session = await getSessionUser();
	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;
	const recipient = formData.get('recipient');
	if (userId === recipient) {
		return {
			submitted: false,
			error: 'You can not send a message to yourself',
		};
	}
	const messageData = {
		sender: userId,
		recipient: recipient,
		property: formData.get('property'),
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
		body: formData.get('body'),
	};
	const newMessage = new Message(messageData);
	await newMessage.save();

	return { submitted: true };
};

export default addMessage;
