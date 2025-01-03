'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
const PropertyImages = ({ images }: { images: string[] }) => {
    return (
        <Gallery>
            <section className='bg-blue-50 p-4'>
                <div className='container mx-auto'>
                    {images.length === 1 ? (
                        <Item original={images[0]} thumbnail={images[0]} width={1000} height={600}>
                            {({ ref, open }) => (
                                <Image
                                    src={images[0]}
                                    ref={ref}
                                    onClick={open}
                                    className='object-cover h-[400px] mx-auto rounded-xl'
                                    alt='Property Image'
                                    width={1800}
                                    height={400}
                                    priority
                                    unoptimized
                                />
                            )}
                        </Item>
                    ) : (
                        <div className='grid grid-cols-2 gap-4'>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${images.length === 3 && index === 2
                                        ? 'col-span-2'
                                        : 'col-span-1'
                                        }`}
                                >
                                    <Item original={image} thumbnail={image} width={1000} height={600}>
                                        {({ ref, open }) => (
                                            <Image
                                                src={image}
                                                ref={ref}
                                                onClick={open}
                                                className='object-cover h-[400px] mx-auto rounded-xl'
                                                alt='Property Image'
                                                width={1800}
                                                height={400}
                                                priority
                                                unoptimized
                                            />
                                        )}
                                    </Item>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Gallery>

    );
};

export default PropertyImages;
