import { ObjectId } from 'mongodb';
import MangeDb from '../../util/MangeDb';

const UpdateTask = async (req, res) => {
    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('task');

        const updateTask = req.body;
        const id = updateTask.id;

        const filter = { _id: ObjectId(id) };
        const filter1 = { _id: id };

        const options = { upsert: true };

        const updateDoc = {
            $set: {
                task: updateTask.updatedTask,
                description: updateTask.description,

            }
        }


        if (filter) {
            await TaskCollection.updateOne(filter, updateDoc, options)
            return res.json({ message: 'Updated Successfully' })
        }

        if (filter1) {
            await TaskCollection.updateOne(filter1, updateDoc, options)
            return res.json({ message: 'Updated Successfully' })
        }

    }


    finally {
        await client.close();
    }
}

export default UpdateTask