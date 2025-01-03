'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
export default async function deleteProperty(propertyId: string) {
	await connectDB();
	const session = await getSessionUser();
	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;

	const property = await Property.findById(propertyId);

	if (!property) {
		throw new Error('Property Not Found');
	}

	if (property.owner.toString() !== userId) {
		throw new Error('Unauthorized');
	}

	const publicIds = property.images.map((imageUrl: string) => {
		const parts = imageUrl.split('/');
		return parts.at(-1)?.split('.').at(0);
	});

	if (publicIds.length > 0) {
		for (const publicId of publicIds) {
			await cloudinary.uploader.destroy('propertypulse/' + publicId);
		}
	}

	await property.deleteOne();

	revalidatePath('/', 'layout');
}
