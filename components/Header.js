import React, { useContext, useState } from 'react'
import Button from './Button'
import { Bars3BottomRightIcon, BeakerIcon, CheckIcon, ClipboardDocumentCheckIcon, ClipboardDocumentIcon, ClipboardDocumentListIcon, MoonIcon, PlusCircleIcon, PlusIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthProvider'
import { useRouter } from 'next/router'

const Header = () => {
    const { logOut, user } = useContext(AuthContext);
    const router = useRouter();

    const handleLogOut = () => {
        logOut().then(res => { router.push('/signin') }).catch(error => console.error(error));
    }

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }



    return (
        <div className='w-max-6xl px-10 mx-auto py-4  flex justify-between items-center border-b  border-gray-400 shadow-md'>
            <h1 className='text-3xl font-bold flex-1 flex items-center'> <Link href='/'><span className='text-orange-500'>Task</span>-Again</Link>
            </h1>



            <ul className='space-x-8 hidden lg:flex'>
                <Link href={user ? '/addtask' : '/signin'} className=' hover:underline decoration-2 decoration-orange-500 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out flex'>
                    <PlusCircleIcon className='w-6 h-6 mr-2' />
                    Add Task
                </Link>
                <Link href={user ? '/mytask' : '/signin'} className='hover:underline decoration-2 decoration-orange-500 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out flex'>
                    <ClipboardDocumentListIcon className='w-6 h-6 mr-2' />
                    My Task
                </Link>
                <Link href={user ? '/completedtask' : '/signin'} className='hover:underline decoration-2 decoration-orange-500 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out flex'>
                    <ClipboardDocumentCheckIcon className='w-6 h-6 mr-2' />
                    Completed Tasks
                </Link>
            </ul>

            <div className='space-x-2 ml-6 hidden lg:block'>
                {
                    user ? <div className='flex items-center'> <Link href='/signup' onClick={handleLogOut}> <Button>Log Out</Button></Link>
                        <div class="bg-orange-500 px-8 py-3 ml-4 text-xl rounded-md text-white ring ring-green-100">{user?.displayName} </div>
                    </div> :

                        <> <Link href='/signin' className='px-8 py-1 rounded-md hover:scale-110 transition-transform duration-300 ease-out '>Sign In</Link>
                            <Link href='/signup'> <Button>Sing Up</Button></Link>
                        </>
                }
            </div>

            <div className='lg:hidden' onClick={handleNav}>
                <Bars3BottomRightIcon className='h-8 w-8 cursor-pointer' />
            </div>

            <div className={nav ? 'fixed left-0 top-0 w-full h-screen bg-black/70 lg:hidden' : ''} onClick={handleNav}>
                <div className={nav ? 'fixed left-0 top-0 w-[75%] sm:w-[45%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500' : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'}>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-3xl font-bold text-orange-500'>Task Again</h1>
                        <div className='rounded-full shadow-lg shadow-gray-400 cursor-pointer p-3 hover:scale-105 ease-in duration-300' onClick={handleNav}>
                            <XMarkIcon className='w-6 h-6 ' />
                        </div>
                    </div>
                    <div className='border-b border-gray-300 my-4'>
                        <p className='w-[85%] md:w-[90%] py-4'>Task Management made easy</p>
                    </div>

                    <div className='mt-20'>
                        <ul className='space-y-8 flex flex-col'>
                            <Link href={user ? '/addtask' : '/signin'} className=' hover:underline decoration-2 decoration-orange-500 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out flex'>
                                <PlusCircleIcon className='w-6 h-6 mr-2' />
                                Add Task
                            </Link>
                            <Link href={user ? '/mytask' : '/signin'} className='hover:underline decoration-2 decoration-orange-500 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out flex'>
                                <ClipboardDocumentListIcon className='w-6 h-6 mr-2' />
                                My Task
                            </Link>
                            <Link href={user ? '/completedtask' : '/signin'} className='hover:underline decoration-2 decoration-orange-500 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out flex'>
                                <ClipboardDocumentCheckIcon className='w-6 h-6 mr-2' />
                                Completed Tasks
                            </Link>
                        </ul>
                        <div className='space-y-4 flex flex-col mt-20'>
                            {
                                user ?
                                    <div className='flex flex-col space-y-4'> <Link href='/signup' onClick={handleLogOut}> <Button>Log Out</Button></Link>
                                        <div class="bg-orange-500 px-8 py-3 text-xl rounded-md text-white ring ring-green-100">{user?.displayName} </div>
                                    </div> :

                                    <> <Link href='/signin' className=' rounded-md hover:scale-105 transition-transform duration-300 ease-in'>Sign In</Link>
                                        <Link href='/signup'> <Button>Sing Up</Button></Link>
                                    </>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>



    )
}

export default Header