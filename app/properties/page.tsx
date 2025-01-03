
import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property, { PropertyType } from '@/models/Property';

type props = {
    searchParams: Promise<Params>;
}
type Params = {
    page?: number;
    pageSize?: number;
}
export default async function Properties({ searchParams }: props) {

    await connectDB()
    const { page = 1, pageSize = 10 } = await searchParams;
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});
    const properties = (await Property.find({}).skip(skip).limit(pageSize).lean()) as unknown as PropertyType[];

    console.log(properties, 'properties')
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {
                    properties.length === 0 ? <p>No properties found</p> : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {
                                properties.map((property: PropertyType) => (
                                    <PropertyCard key={property._id?.toString()} property={property} />
                                ))
                            }
                        </div>
                    )
                }
                <Pagination page={page} pageSize={pageSize} total={total} />
            </div>
        </section>
    )
}