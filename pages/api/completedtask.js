
import MangeDb from '../../util/MangeDb'

const Completed = async (req, res) => {
    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('completed');
        const completedTask = req.body;
        await TaskCollection.insertOne(completedTask);
        res.json({ message: 'Completed Successfully' })
    }

    finally {

    }


}

export default Completed