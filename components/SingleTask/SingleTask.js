import React from 'react'
import { CheckIcon, ChevronRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const SingleTask = ({ task, handleDelete, openModal, setSelectedTask, refetch }) => {
    const { task: todo, description, media, _id } = task;
    const router = useRouter();

    const completedTask = (task) => {

        fetch('/api/completedtask', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(res => res.json()).then(data => {

            const id = task._id;
            fetch(`/api/delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => res.json).then(data => {
                refetch();
                swal('Task Completed');
                router.push('/completedtask')
            })


        })

    }


    return (
        <>
            <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className='flex items-center'>
                        <ChevronRightIcon className='w-4 h-4 mr-2 text-orange-500' />
                        <p>  {todo}</p>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-rap dark:text-white">{description}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">

                    <img className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={media} alt="Bordered avatar" />

                </td>
                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap ">
                    <div className="flex justify-between items-center">
                        <Link href="#" className="text-blue-600 dark:text-blue-500 hover:text-blue-400 hover:scale-110 transition-transform duration-200 ease-out" onClick={openModal}><PencilSquareIcon className="w-6 h-6" onClick={() => setSelectedTask(task)} /></Link>

                        <Link href='' className="text-red-500 ml-4 hover:text-red-600 hover:scale-110 transition-transform duration-200 ease-out"><TrashIcon className="w-6 h-6" onClick={() => handleDelete(_id)} /></Link>

                        <Link href='' className="text-blue-600 dark:text-blue-500 hover:text-blue-400 hover:scale-110 transition-transform duration-200 ease-out"><CheckIcon className="w-6 h-6 ml-4" onClick={() => completedTask(task)} /></Link>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default SingleTask