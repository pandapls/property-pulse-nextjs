'use server';

import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const addProperty = async (formData: FormData) => {
	await connectDB();
	const session = await getSessionUser();
	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;

	const amenities = formData.getAll('amenities');
	const images = (formData.getAll('images') as File[]).filter((image) => {
		return image.name !== '';
	});

	const propertyData = {
		owner: userId,
		type: formData.get('type'),
		name: formData.get('name'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zipcode: formData.get('location.zipcode'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet: formData.get('square_feet'),
		amenities,
		rates: {
			weekly: formData.get('rates.weekly'),
			monthly: formData.get('rates.monthly'),
			nightly: formData.get('rates.nightly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			phone: formData.get('seller_info.phone'),
		},
	};
	const imageUrls = [];
	for (const imageFile of images) {
		const imageBuffer = await imageFile.arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);
		const imageBufferString = imageData.toString('base64');
		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${imageBufferString}`,
			{
				folder: 'propertypulse',
			}
		);
		imageUrls.push(result.secure_url);
	}
	const propertyDataWithImages = {
		...propertyData,
		images: imageUrls,
	};

	const newProperty = new Property(propertyDataWithImages);
	await newProperty.save();

	revalidatePath('/', 'layout');
	redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
