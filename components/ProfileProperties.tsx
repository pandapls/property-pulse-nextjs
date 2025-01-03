'use client';

import deleteProperty from "@/app/actions/deleteProperty";
import { PropertyType } from "@/models/Property";
import { Types } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from 'react-toastify'

const ProfileProperties = ({ properties: initialProperties }: { properties: PropertyType[] }) => {
    const [properties, setPriority] = useState(initialProperties);
    const handleDeleteProperty = async (id: Types.ObjectId) => {
        const confirmed = window.confirm('Are you sure you want to delete this property?');
        if (!confirmed) {
            return;
        }
        console.log(id, 'id')
        await deleteProperty(id as unknown as string);

        const updatedProperties = properties.filter(property => property._id !== id);

        setPriority(updatedProperties);
        toast.success('Property deleted successfully');
    }
    return (
        properties.map((property, index) => (
            <div className="mb-10" key={index}>
                <Link href={`/properties/${property._id}`}>
                    <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt="Property 1"
                        width={1000}
                        height={200}
                        unoptimized
                    />
                </Link>
                <div className="mt-2">
                    <p className="text-lg font-semibold">{property.name}</p>
                    <p className="text-gray-600">Address: {property.location.street}, {property.location.city}, {property.location.state}, {property.location.zipCode}</p>
                </div>
                <div className="mt-2">
                    <a
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    >
                        Edit
                    </a>
                    <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleDeleteProperty(property._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))
    )
}

export default ProfileProperties
