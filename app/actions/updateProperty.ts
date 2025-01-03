'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const updateProperty = async (propertyId: string, formData: FormData) => {
	await connectDB();
	const session = await getSessionUser();
	if (!session?.user || !session?.user.id) {
		throw new Error('User ID is required');
	}
	const sessionUser = session.user;
	const userId = sessionUser.id;
	const existingProperty = await Property.findById(propertyId);
	console.log(existingProperty, 'existingProperty');
	if (existingProperty.owner.toString() !== userId) {
		throw new Error('Current user does not own this property');
	}

	const amenities = formData.getAll('amenities');

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

	const updateProperty = await Property.findByIdAndUpdate(
		propertyId,
		propertyData
	);

	revalidatePath('/', 'layout');
	redirect(`/properties/${updateProperty._id}`);
};

export default updateProperty;
