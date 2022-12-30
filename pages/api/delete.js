import { ObjectId } from 'mongodb';
import MangeDb from '../../util/MangeDb';

const DeleteTask = async (req, res) => {
    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('task');
        const id = req.query.id;

        const query1 = { _id: id };
        const query = { _id: ObjectId(id) };

        await TaskCollection.deleteOne(query);
        await TaskCollection.deleteOne(query1);

        res.json({ message: 'Deleted Successfully' })

    }

    finally {
        await client.close();
    }
}

export default DeleteTask