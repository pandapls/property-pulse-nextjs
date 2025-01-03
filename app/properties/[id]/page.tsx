import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import connectDB from '@/config/database';
import Property, { PropertyType } from '@/models/Property';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyImages from '@/components/PropertyImages';
import { convertToSerializableObject } from '@/utils/converToObject';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import ShareButton from '@/components/ShareButton';
type PropertyPageProps = {
    params: Promise<PropertyPageParams>
}
type PropertyPageParams = {
    id: string
}
const PropertyPage = async ({ params }: PropertyPageProps) => {
    const { id } = await params;
    await connectDB();
    const propertyDoc = await Property.findById(id).lean() as unknown as PropertyType;
    if (!propertyDoc) {
        return <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
    }
    const property = convertToSerializableObject(propertyDoc);


    return (
        <>

            <PropertyHeaderImage imageUrl={property.images[0]} />
            <section>
                <div className='container m-auto py-6 px-6'>
                    <Link href='/properties' className='text-blue-500 hover:text-blue-600 flex items-center gap-2'>
                        <FaArrowLeft className='mr-2' />
                        Back to Properties
                    </Link>
                </div>
            </section>
            <section className='bg-blue-50'>

                <div className='container m-auto py-10 px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                        {/* {Property Info} */}
                        <PropertyDetails property={property} />
                        {/* {Contact} */}
                        <aside className='space-y-4 mt-4'>
                            <BookmarkButton property={property} />
                            <ShareButton property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>

                <PropertyImages images={property.images} />
            </section>
        </>
    )
}

export default PropertyPage
