import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import SingleCompleted from '../../components/SingleCompleted/SingleCompleted';
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../../util/Loader';


const CompletedTask = () => {
    const { user } = useContext(AuthContext);

    const { data: completedTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completedtask'],
        queryFn: async () => {
            const res = await fetch(`/api/getcompleted?email=${user?.email}`)
            const data = await res.json();
            return data.result;
        }
    })



    const handleDelete = (id) => {
        fetch(`/api/deletecompleted?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            if (data.message !== '') {
                refetch()
                swal('Deleted Succesfully', { icon: "success", })
            }
        })
    }


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="md:w-3/5 flex flex-col mx-auto px-4 h-screen mt-64">
            <div className='md:w-3/5 flex '>
                <h2 className="text-center text-2xl font-semibold mb-12 underline underline-offset-8">Task You Have Finished</h2>
            </div>
            <div className="w-full mx-auto">
                <div className="flex flex-col">
                    <div className="overflow-x-auto md:overflow-visible shadow-md sm:rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className=" ">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Task
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Task description
                                            </th>

                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Media
                                            </th>

                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Action
                                            </th>

                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Not Completed
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Comment
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-700">
                                        {
                                            completedTasks?.map(task => <SingleCompleted
                                                refetch={refetch}
                                                task={task} key={task._id} handleDelete={handleDelete} />)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default CompletedTask