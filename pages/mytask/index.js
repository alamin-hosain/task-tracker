import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react"
import swal from "sweetalert";
import MyModal from "../../components/Modal";
import SingleTask from "../../components/SingleTask/SingleTask";
import { AuthContext } from "../../contexts/AuthProvider";
import Loader from "../../util/Loader";


const AllTask = () => {
    const { user, loading } = useContext(AuthContext);

    let [isOpen, setIsOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState();

    const { data: alltask = [], isLoading, refetch } = useQuery({
        queryKey: ['alltask'],
        queryFn: async () => {
            const res = await fetch(`/api/alltask?email=${user?.email}`);
            const data = await res.json();
            return data.allTask;
        }
    })



    const handleDelete = (id) => {
        fetch(`/api/delete?id=${id}`, {
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

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    if (isLoading && loading) {
        return <Loader />
    }


    return (

        <div className="md:w-3/5 flex flex-col mx-auto px-4 h-screen mt-64">
            <h2 className="text-center text-2xl font-semibold mb-12 underline underline-offset-8">Manage All Of Your Task Here</h2>

            <div className="w-full mx-auto">
                <div className="flex flex-col">
                    <div className="overflow-x-auto md:overflow-visible shadow-md sm:rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className=" ">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
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
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {
                                            alltask?.map(task => <SingleTask task={task} key={task._id} handleDelete={handleDelete} openModal={openModal} setSelectedTask={setSelectedTask} refetch={refetch} />)
                                        }
                                    </tbody>
                                </table>
                                <MyModal closeModal={closeModal} openModal={openModal} isOpen={isOpen} selectedTask={selectedTask} refetch={refetch} />
                            </div>

                        </div>

                    </div>

                </div>

            </div>





        </div>
    )



}

export default AllTask