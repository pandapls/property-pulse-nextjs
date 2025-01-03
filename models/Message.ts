import { Document, Schema, Types, model, models } from 'mongoose';
import { PropertyType } from './Property';
const MessageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		recipient: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		property: {
			type: Schema.Types.ObjectId,
			ref: 'Property',
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		phone: String,
		body: String,
		read: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Message = models?.Message || model('Message', MessageSchema);
export interface MessageType extends Document {
	_id: Types.ObjectId;
	sender: Types.ObjectId;
	recipient: Types.ObjectId;
	property: PropertyType;
	name: string;
	email: string;
	phone: string;
	body: string;
	read: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
export default Message;
