'use client';
import { PropertyType } from '@/models/Property'
import { useState, useEffect } from 'react';
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode'
import Spinner from './Spinner';
import Map, { Marker } from 'react-map-gl';
import pin from '@/assets/images/pin.svg';
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css';

const PropertyMap = ({ property }: { property: PropertyType }) => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px',
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || '',
        language: 'en',
        region: 'us',
        outputFormat: 'json' as OutputFormat,
    });

    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const address = `${property.location.street} ${property.location.city} ${property.location.zipCode}`;
                console.log(address, '----')
                const response = await fromAddress(address);

                console.log(response, 'response')
                if (response.results.length === 0) {
                    setGeocodeError(true);
                    setLoading(false);
                    return;
                }
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setViewport(prev => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                }));
            } catch (error) {
                console.log('error', error)
                setGeocodeError(true);
            } finally {
                console.log('finally')
                setLoading(false);
            }
        };
        getCoordinates();
    }, []);

    if (loading) return <Spinner />;
    if (geocodeError) return <div className='text-xxl'>Not Location data found</div>;
    return (
        <div>
            {!loading && !geocodeError && lat && lng && (
                <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    initialViewState={{
                        latitude: lat,
                        longitude: lng,
                        zoom: 12,
                    }}
                    style={{ width: '100%', height: 500 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Marker latitude={lat} longitude={lng} anchor="bottom">
                        <Image src={pin} alt="location" width={40} height={40} />
                    </Marker>
                </Map>
            )}
        </div>
    );
}

export default PropertyMap
