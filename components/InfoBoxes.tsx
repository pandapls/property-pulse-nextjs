
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox heading={'For Renters'} buttonInfo={{
                        text: 'Browse Properties',
                        href: '/properties',
                        backgroundColor: 'bg-black',
                        textColor: 'text-white',
                    }}>
                        Find your dream rental property. Bookmark properties and contact
                        owners.
                    </InfoBox>
                    <InfoBox
                        heading={'For Property Owners'}
                        backgroundColor={'bg-blue-100'}
                        textColor={'text-blue-800'}
                        buttonInfo={{
                            text: 'Add Property',
                            href: '/properties/add',
                            backgroundColor: 'bg-blue-500',
                            textColor: 'text-white',
                        }}
                    >
                        List your properties and reach potential tenants. Rent as an
                        airbnb or long term.
                    </InfoBox>

                </div>
            </div>
        </section>
    )
}

export default InfoBoxes;