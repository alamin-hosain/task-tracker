
import MangeDb from '../../util/MangeDb'

const GetCompleted = async (req, res) => {
    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('completed');
        const email = req.query.email;
        const query = { email: email };

        const result = await TaskCollection.find(query).toArray();
        res.json({ result })

    }
    finally {
    }


}

export default GetCompleted