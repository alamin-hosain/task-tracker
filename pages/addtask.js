import React, { useContext, useState } from 'react'
import Button from '../components/Button';
import swal from 'sweetalert';
import { AuthContext } from '../contexts/AuthProvider';


const AddTask = () => {
    const imgbbkey = process.env.NEXT_PUBLIC_IMGBB_KEY;

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [error, setError] = useState('');

    const { user } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (task === '') {
            return setError('Task Field can not be empty')
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        if (selectedFile !== '') {
            fetch(`https://api.imgbb.com/1/upload?key=${imgbbkey}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json()).then(data => {
                    const media = data.data.url;
                    const taskInfo = {
                        task, description, media,
                        email: user.email,
                    }


                    fetch('/api/task', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(taskInfo)
                    }).then(res => res.json()).then(data => {
                        setSelectedFile('')
                        if (data) {
                            swal("Good job!", 'Task Added Successfully');
                        }

                    })

                })
        }

        else {
            const taskInfo = {
                task, description,
                email: user.email
            }
            fetch('/api/task', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(taskInfo)
            }).then(res => res.json()).then(data => {
                setSelectedFile('')
                if (data) {
                    swal("Good job!", 'Task Added Successfully', { icon: 'success' });
                }

            })
        }

        setTask('')
        setDescription('')
        event.target.reset();

    }


    return (
        <form className='w-4/5 lg:w-3/5 lg:px-0 flex flex-col mx-auto h-screen mt-64' onSubmit={handleSubmit}>
            <h2 className='text-center text-3xl font-semibold mb-4 underline underline-offset-4 '>Create a Task</h2>
            <div className='flex flex-col space-y-3'>
                <label htmlFor="task" className='text-sm font-medium'>Task Name:</label>

                <input
                    className='rounded-lg py-2 px-6 bg-gray-100 border border-gray-400'
                    type="text"
                    id="task"
                    value={task}
                    onChange={(e) => { setTask(e.target.value), setError('') }}
                />
            </div>

            {
                error && <p className='text-red-600 mt-2 text-sm font-medium'>{error}</p>
            }

            <div className='flex flex-col mt-4 space-y-3'>
                <label htmlFor="description" className='text-sm font-medium'>Task Description:</label>
                <textarea
                    className='rounded-lg py-2 px-6 bg-gray-100 border border-gray-400'
                    value={description}
                    name="description" rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className='mt-4'>
                <label className="block mb-3 text-sm font-medium" htmlFor="file_input">Upload file</label>

                <input className="block w-1/3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " name='image' id="file_input" type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
            </div>
            <div className='w-full flex justify-end items-end mt-6'>
                <Button type='submit'>Create</Button>
            </div>
        </form>
    )
}

export default AddTask