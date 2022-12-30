import MangeDb from '../../util/MangeDb';

const AddTaskToDb = async (req, res) => {

    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('task');
        const taskDetails = req.body;

        await TaskCollection.insertOne(taskDetails);
        res.status(200).json({ message: 'Task Added Successfully' });
    }

    finally { }

}

export default AddTaskToDb;