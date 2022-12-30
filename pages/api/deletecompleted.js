import MangeDb from '../../util/MangeDb';

const DeleteCompleted = async (req, res) => {
    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('completed');
        const id = req.query.id;
        const query = { _id: id };

        await TaskCollection.deleteOne(query);
        res.json({ message: 'Deleted Successfully' })

    }

    finally {
        await client.close();
    }
}

export default DeleteCompleted;