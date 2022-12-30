import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex w-full  items-end justify-end'>
            <div className='text-center bg-gray-800 text-white py-12 mt-20 w-full relative bottom-0 left-0'>
                <p>&copy; All Rights Reserve by {''}
                    <Link className='underline underline-offset-8 decoration-2 decoration-orange-500 bg-white text-gray-700 px-8 py-2 text-lg rounded-xl ml-4' href={'https://alamin-hossain.vercel.app/'}>Alamin</Link>
                </p>
            </div>
        </div>
    )
}

export default Footer