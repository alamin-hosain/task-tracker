import React, { useRef } from 'react'
import { ArrowUturnLeftIcon, CheckIcon, ChevronRightIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import { useQuery } from '@tanstack/react-query';


const SingleCompleted = ({ task, handleDelete, refetch }) => {
    const { task: todo, description, media, comment } = task;
    const router = useRouter();
    const commentRef = useRef();



    const { data: updatedTasks = [], isLoading } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await fetch('/api/getcompleted');
            const data = await res.json();
            return data
        }
    })

    const notCompletedTask = (task) => {

        const newTask = {
            _id: task._id,
            task: task.task,
            description: task.description,
            media: task.media,
            email: task.email,
        }

        fetch('/api/task', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTask)

        }).then(res => res.json()).then(data => {

            fetch(`/api/deletecompleted?id=${task._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => res.json).then(data => {
                console.log(data)
                refetch();

                router.push('/mytask')
            })

        })




    }


    const handleComment = (id) => {
        const comment = commentRef.current.value;

        fetch(`/api/comment?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        }).then(res => res.json()).then(data => {
            swal('Added a Comment');
            refetch();
            commentRef.current.value = '';
        })
    }



    return (
        <>
            <tr >
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
                        <Link href='' className="text-red-500 hover:text-red-600 hover:scale-110 transition-transform duration-200 ease-out"><TrashIcon className="w-6 h-6" onClick={() => handleDelete(task._id)} /></Link>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap ">
                    <Link href='' className="text-blue-600 dark:text-blue-500 hover:text-blue-400 hover:scale-110 transition-transform duration-200 ease-out"><ArrowUturnLeftIcon className="w-6 h-6" onClick={() => notCompletedTask(task)} /></Link>
                </td>
                <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                    {
                        comment ?
                            <p className='text-white'>{comment}</p> :
                            <>
                                <div className='flex items-center'>
                                    <input ref={commentRef} type="text" className='rounded-md py-1 bg-gray-400 px-2' />
                                    <button onClick={() => handleComment(task._id)} className='hover:scale-105 duration-100 transition-transform ease-in'> <PlusIcon className='w-6 h-6 bg-orange-400 ml-2 rounded-full' />
                                    </button>
                                </div>
                            </>
                    }
                </td>

            </tr>
        </>
    )
}

export default SingleCompleted