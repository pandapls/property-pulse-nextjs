import MessageCard from '@/components/MessageCard';
import Message, { MessageType } from '@/models/Message';
import { convertToSerializableObject } from '@/utils/converToObject';
import { getSessionUser } from '@/utils/getSessionUser';

const MessagePage = async () => {
    const sessionUser = await getSessionUser();
    const id = sessionUser?.user.id;
    const readMessages = await await Message.find({ recipient: id, read: true })
        .sort({ createAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()

    const unreadMessages = await await Message.find({ recipient: id, read: false })
        .sort({ createAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = convertToSerializableObject(messageDoc);
        message.sender = convertToSerializableObject(messageDoc.sender);
        message.property = convertToSerializableObject(messageDoc.property);
        return message;
    }) as unknown as MessageType[];
    return <section className='bg-blue-50'>
        <div className="container m-auto py-24 max-w-6xl">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h1 className="text-3xl font-bold bd-4 mb-5">
                    Your Messages
                </h1>
                <div className="space-y-4">
                    {messages.length === 0 ? <p>You have no message</p> : messages.map((message, index) => (
                        <MessageCard message={message} key={index} />
                    ))}
                </div>
            </div>
        </div>
    </section>;
};

export default MessagePage;
