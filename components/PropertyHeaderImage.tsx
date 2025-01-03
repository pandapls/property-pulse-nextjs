import Image from 'next/image';

type PropertyHeaderImageProps = {
    imageUrl: string
}
const PropertyHeaderImage = (props: PropertyHeaderImageProps) => {
    const { imageUrl } = props;
    return (
        <section>
            <div className='container-xl m-auto'>
                <div className='grid grid-cols-1'>
                    <Image src={imageUrl} className='object-cover h-[400px] w-full' alt='Property Header Image' width={0} height={0} sizes='100vw' unoptimized />
                </div>
            </div>
        </section>
    )
}

export default PropertyHeaderImage 