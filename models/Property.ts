import { Document, Schema, Types, model, models } from 'mongoose';

const PropertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Owner is required'],
        },
        name: {
            type: String,
            required: [true, 'name is required'],
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        location: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
        },
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
        square_feet: {
            type: Number,
            required: true,
        },
        amenities: [
            {
                type: String,
            },
        ],
        rates: {
            weekly: Number,
            monthly: Number,
            nightly: Number,
        },
        seller_info: {
            name: String,
            email: String,
            phone: String,
        },
        images: [
            {
                type: String,
            },
        ],
        is_featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Property = models?.Property || model('Property', PropertySchema);
export interface PropertyType extends Document {
    _id: Types.ObjectId;
    owner: Types.ObjectId;
    name: string;
    type: string;
    description?: string;
    location: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
    beds: number;
    baths: number;
    square_feet: number;
    amenities: string[];
    rates: {
        weekly?: number;
        monthly?: number;
        nightly?: number;
    };
    seller_info: {
        name?: string;
        email?: string;
        phone?: string;
    };
    images: string[];
    is_featured: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export default Property;
