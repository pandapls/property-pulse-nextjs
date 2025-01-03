'use client';

import { PropertyType } from "@/models/Property"
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, EmailIcon } from 'react-share';
const ShareButton = ({ property }: { property: PropertyType }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">
                Share This Property:
                <div className="flex gap-3 justify-center pb-5">
                    <FacebookShareButton url={shareUrl} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`#${property.type.replace(/\s/g, '')}ForRent`]}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl} title={property.name} separator='::'>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property listing: ${shareUrl}`}>
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                </div>
            </h3>
        </>
    )
}

export default ShareButton
