import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import swal from 'sweetalert';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../contexts/AuthProvider';


export default function MyModal({ closeModal, refetch, isOpen, selectedTask }) {
    const [updatedTask, setUpdatedTask] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(AuthContext);

    const handleUpdate = (task) => {
        let updateTask;

        if (updatedTask !== '') {
            updateTask = {
                id: task._id,
                updatedTask,
                description,


            };
        } else {
            updateTask = {
                id: task._id,
                updatedTask,
                description: task.description,


            };
        }


        fetch(`/api/update?task=${task.task}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        }).then(res => res.json()).then(data => {
            swal('Updated Successfully')
            refetch();
        })

        closeModal()

    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {selectedTask?.task}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className='flex flex-col space-y-3'>
                                            <label htmlFor="task" className='text-sm font-medium'>Task Name:</label>

                                            <input
                                                className='rounded-lg py-2 px-6 bg-gray-100 border border-gray-400'
                                                type="text"
                                                id="task"
                                                defaultValue={selectedTask?.task}
                                                onChange={(e) => setUpdatedTask(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col mt-4 space-y-3'>
                                            <label htmlFor="description" className='text-sm font-medium'>Task Description:</label>
                                            <textarea
                                                defaultValue={selectedTask?.description}
                                                className='rounded-lg py-2 px-6 bg-gray-100 border border-gray-400'
                                                name="description" rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleUpdate(selectedTask)}
                                        >
                                            Update Task
                                        </button>

                                        <button className=' shadow-xl rounded-full w-6 h-6 hover:scale-125 transition-transform duration-200 ease-out hover:bg-orange-500' onClick={closeModal}>
                                            <XMarkIcon className='text-black w-6 h-6' />
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
