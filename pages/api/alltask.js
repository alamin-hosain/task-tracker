import MangeDb from '../../util/MangeDb';

const AllTask = async (req, res) => {

    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('task');


        const email = req.query.email;
        const query = { email: email };

        const allTask = await TaskCollection.find(query).toArray();

        res.json({ message: 'found all task', allTask });
    }

    finally { }

}

export default AllTask;