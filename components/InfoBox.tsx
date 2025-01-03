import Link from "next/link";
type InfoBoxProps = {
    heading: string;
    backgroundColor?: string;
    textColor?: string;
    children: React.ReactNode;
    buttonInfo?: {
        text: string;
        href: string;
        backgroundColor: string;
        textColor: string;
    }
}
const InfoBox = ({ heading, backgroundColor = 'bg-gray-100', textColor = 'text-gray-800', children, buttonInfo }: InfoBoxProps) => {
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {children}
            </p>
            {
                buttonInfo && (
                    <Link
                        href={buttonInfo?.href}
                        className={`${buttonInfo?.backgroundColor} ${buttonInfo?.textColor} inline-block rounded-lg px-4 py-2 hover:bg-gray-700`}

                    >
                        {buttonInfo?.text}
                    </Link>
                )
            }

        </div>
    )
}

export default InfoBox;
