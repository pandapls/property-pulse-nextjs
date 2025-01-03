import PropertyCard from '@/components/PropertyCard';
import { PropertyType } from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import React from 'react'

const SavePropertiesPage = async () => {
    const session = await getSessionUser();
    const userId = session?.user.id;

    const { bookmarks } = await User.findById(userId).populate('bookmarks');
    return (
        <section className='px-4 py-6'>
            <div className='container lg:container m-auto px-4 py-6'>
                <h1 className='text-2xl mb-4'>
                    Saved Properties
                </h1>
                {bookmarks.length !== 0 ? <div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {bookmarks.map((property: PropertyType) => (
                            <PropertyCard key={property._id.toString()} property={property} />
                        ))}
                    </div>
                </div> : <p>No saved Properties</p>}
            </div>
        </section>
    )
}

export default SavePropertiesPage
