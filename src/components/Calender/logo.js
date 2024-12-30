import Image from 'next/image'
import React from 'react'

function Logo() {
    return (
        <div className="flex justify-center space-x-4">
            <Image
                className="rounded-full w-10 h-10 lg:w-14 lg:h-14"
                src="https://i.ibb.co/tp71NhB/Whats-App-Image-2024-12-23-at-20-46-27-a8aab388.jpg"
                alt="Logo 1"
                width={50}
                height={50}
            />
            <Image
                className="rounded-full w-10 h-10 lg:w-14 lg:h-14"
                src="https://i.ibb.co/FhMdHJy/Whats-App-Image-2024-12-23-at-20-46-29-7df89220.jpg"
                alt="Logo 2"
                width={50}
                height={50}
            />
            <Image
                className="rounded-full w-10 h-10 lg:w-14 lg:h-14"
                src="https://i.ibb.co/3MDKQ2B/Whats-App-Image-2024-12-23-at-20-46-29-7d0573d1.jpg"
                alt="Logo 3"
                width={50}
                height={50}
            />
        </div>
    )
}

export default Logo