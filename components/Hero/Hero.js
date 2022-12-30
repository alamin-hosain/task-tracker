import Image from 'next/image'
import React, { useContext } from 'react'
import Button from '../Button'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthProvider'

const Hero = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='w-full pt-52'>
            <div className='flex justify-center items-center flex-col'>
                <h1 className='text-4xl md:text-6xl font-bold'>Manage Your Daily Task.</h1>
                <p className='w-full px-2 lg:w-2/5 text-center my-6'>"Simplify your workload, streamline your productivity,and conquer your tasks with our task management app."</p>
                <div className='flex items-center justify-center bg-orange-500 px-4 py-1 rounded-md hover:scale-110 transition-transform duration-300 ease-out text-white cursor-pointer '>
                    <Link href={user ? '/addtask' : '/signin'}><Button>Get Started </Button></Link>
                    <span className='ml-4'><ArrowRightIcon className='w-6 h-6 hover:scale-110' /></span>

                </div>
            </div>
            <div className='w-full flex justify-center mt-20 px-4 lg:px-0'>
                <div className='shadow-xl rounded-xl hover:scale-110 transition-transform duration-300 ease-out cursor-pointer'>
                    <img className='rounded-xl' src='https://i.ibb.co/p4wD0kR/task1.jpg' width={700} height={700} alt="Picture of the author" />
                </div>
            </div>
        </div >
    )
}

export default Hero