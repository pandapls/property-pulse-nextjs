import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import connectDB from '@/config/database';
import Property, { PropertyType } from '@/models/Property';
import { convertToSerializableObject } from '@/utils/converToObject';
import Link from 'next/link';
import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa';

type SearchParams = {
    location?: string;
    propertyType?: string;
};

type Props = {
    searchParams: Promise<SearchParams>;
};
interface PropertyQuery {
    $or: Array<{
        name?: RegExp;
        description?: RegExp;
        'location.street'?: RegExp;
        'location.city'?: RegExp;
        'location.state'?: RegExp;
        'location.zipCode'?: RegExp;
    }>;
    type?: RegExp;  // 添加 type 字段
}
const SearchResultPage = async ({ searchParams }: Props) => {
    await connectDB();

    const { location, propertyType } = await Promise.resolve(await searchParams)
    const locationPattern = new RegExp(location || '', 'i');
    console.log(locationPattern, 'locationPattern')
    const query: PropertyQuery = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipCode': locationPattern },
        ]
    }
    if (propertyType && propertyType !== 'All') {
        const typePatten = new RegExp(propertyType, 'i');
        query.type = typePatten
    }

    const propertiesQueryResults = await Property.find(query).lean() as unknown as PropertyType[];
    const properties = propertiesQueryResults.map(property => convertToSerializableObject(property));

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sn:px-6">
                    <PropertySearchForm />
                </div>
            </section>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href='/properties' className="flex items-center text-blue-500 hover:underline mb-3">
                        <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To properties
                    </Link>
                    <h1 className='text-2xl mb-4'>Search Results: </h1>
                    {properties.length !== 0 ? <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {properties.map(property => <PropertyCard key={property._id.toString()} property={property} />)}
                    </div> : <p>Not Data</p>}
                </div>
            </section>
        </>
    )
}

export default SearchResultPage
