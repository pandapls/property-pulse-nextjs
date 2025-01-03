import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property, { PropertyType } from '@/models/Property';
const HomeProperties = async () => {
    await connectDB()
    const recentProperties = (await Property.find({}).sort({ createdAt: -1 }).limit(3).lean()) as unknown as PropertyType[];
    return (
        <>
            <section className='px-4 py-6'>
                <div className='container-xl lg:container m-auto px-4 py-6'>
                    {
                        recentProperties.length === 0 ? <p>No properties found</p> : (
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {
                                    recentProperties.map((property) => (
                                        <PropertyCard key={property._id?.toString()} property={property} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </section>
            <section className='m-auto max-w-lg my-10 px-6'>
                <Link href='/properties' className='block bg-black text-center py-4 px-6 rounded-lg text-white'>View All Properties</Link>
            </section>
        </>
    )
}
export default HomeProperties;